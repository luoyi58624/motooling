<template>
  <div class="layout">
    <div class="aside">
      <message-list ref="messageListRef" @add-user="createNewChatting"/>
    </div>
    <div class="chat-panel">
      <chat-panel ref="chatPanelRef" v-if="groupId!==null && resetChatPanel"
                  :invitedMembers="invitedMembers"
                  :invidedMembersInfo="invidedMembersInfo"
                  @add-user="addGroupMember"></chat-panel>
    </div>
    <UserSelect @confirm="confirm" @cancel="cancel"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getOpenSynergy, synergyAddMember, getNewsList, synergyGroupMember } from '@/api/synergy/synergy.js'
import UserSelect from '@/components/UserSelect'
import messageList from './messageList'
import chatPanel from './chatPanel.vue'
import { depUserList } from '@/api/instore/instore'

export default {
  components: {
    messageList,
    UserSelect,
    chatPanel
  },
  data () {
    return {
      isGroup: false,
      resetChatPanel: true,
      addedMembers: [],
      invitedMembers: '',
      initMembers: [],
      invidedMembersInfo: []
    }
  },
  computed: {
    ...mapState({
      groupId: state => state.groupId,
      userSelectedList: state => state.userSelectedList
    })
  },
  watch: {
    groupId (newValue, oldValue) {
      if (oldValue != null) {
        this.resetChatPanel = false
        this.$nextTick(() => {
          this.resetChatPanel = true
        })
      }
    }
  },
  methods: {
    // 创建新的聊天
    createNewChatting () {
      this.$store.state.showUserSelectPanel = true
      this.initMembers = JSON.parse(JSON.stringify(this.userSelectedList))
    },
    confirm () {
      this.$store.state.showUserSelectPanel = false
      // 在群聊中邀请其他用户
      if (this.isGroup) {
        this.isGroup = false
        let data = {
          groupId: this.groupId,
          inviterId: +localStorage.getItem('uid'),
          uList: this.userSelectedList.map(item => ({ uid: item.uid }))
        }
        synergyAddMember(data)
          .then(res => {
            this.invitedMembers = res.successList.map(item => item.username).join('、')
            // this.invidedMembersInfo = res.successList
            // 刷新群成员
            synergyGroupMember({groupId: this.groupId}).then(res=>{
              this.$refs.chatPanelRef.groupMember = []
              res.memberList.forEach(item=>{
                this.$refs.chatPanelRef.groupMember.push(item)
              })
            })
          })
          .catch(() => {
            this.$createToast({
              time: 2000,
              txt: '邀请失败，请重试',
              type: 'error'
            }).show()
            this.$store.dispatch('getNewGroupMember', this.initMembers)
          })
      } else {
        // 开启一个新的群聊
        let parameter = this.shiftParameter(this.userSelectedList)
        getOpenSynergy(
          parameter
        ).then(res1 => {

          getNewsList().then(res2 => {
            this.$store.dispatch('newsList', res2.newsList)

            this.$store.commit('currentConversation', {
              groupId: res1.synergyGroup.id,
              relationType: res1.synergyGroup.relationType
            })
          }).catch(err => {
            this.$createToast({
              time: 2000,
              txt: err.msg || '互动消息开启失败,请检查网络',
              type: 'error'
            }).show()
          })
        })
      }
    },
    cancel () {
      this.$store.state.showUserSelectPanel = false
      if (!this.isGroup) {
        this.$store.dispatch('getNewGroupMember', this.initMembers)
      }
      this.isGroup = false
    },
    shiftParameter (data) {
      let relationType = ''
      let relationId = ''
      let uList = []
      if (data.length === 1) {
        relationType = '66'
        relationId = data[0].uid
        return {
          relationId, relationType
        }
      } else {
        relationType = '666'
        uList = data.map(item => {
          return { uid: item.uid, userName: item.username }
        })
        return {
          relationType, uList
        }
      }
    },
    // 添加群成员处理
    addGroupMember (isGroup) {
      this.$store.state.showUserSelectPanel = true
      this.$store.state.isChatAddUser = true
      this.isGroup = isGroup
    },
    // 获取所有部门用户
    getAllDepUser () {
      depUserList().then(res => {
        let depList = []
        if (res && res.list) depList = res.list
        // 对数据做 el-tree 兼容处理 -> UserSelect.vue
        this.$store.state.allDepUser = depList.map(item => {
          item.id = item.depId // el-tree -> row-id
          item.childrenList.forEach(user => {
            user.id = user.uid // el-tree -> row-id
            user.name = user.username // el-tree -> prop展示名字
          })
          return item
        })
      })
    },
    async createPrivateChatting (uid) {
      await getOpenSynergy({
        relationId: uid,
        relationType: 66
      })
        .then(async (res) => {
          const { newsList } = await getNewsList()
          this.$store.dispatch('newsList', newsList)
          this.$store.commit('currentConversation', {
            groupId: res.synergyGroup.id,
            relationType: res.synergyGroup.relationType
          })
          this.$nextTick(() => {
            this.$refs.messageListRef.skipActiveGroup()
          })
        })
        .catch((err) => {
          this.$createToast({
            time: 2000,
            txt: err.msg || '互动消息开启失败,请检查网络',
            type: 'error'
          }).show()
        })
    }
  },
  created () {
    this.getAllDepUser()
  },
  mounted () {
    const relationId = this.$route.query.relationId * 1
    if (relationId) {
      this.createPrivateChatting(relationId)
    }
  }
}
</script>

<style scoped lang="less">
.layout {
  position: relative;
  height: 100%;
  font-size: 16px;
  display: flex;

  .aside {
    width: 260px;
    height: 100%;
    flex: 0 0 auto;
    background-color: #e6e8eb;
  }

  .chat-panel {
    flex: 1;
    height: 100%;
  }
}

</style>
