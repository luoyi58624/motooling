<template>
  <div class="layout">
    <div class="aside">
      <message-list @add-user="createNewChatting"/>
    </div>
    <div class="chat-panel">
      <chat-panel @add-user="addGroupMember" :invitedMembers="invitedMembers"
                  :invidedMembersInfo="invidedMembersInfo"></chat-panel>
    </div>
    <UserSelect v-show="show" @confirm="confirm" :visible.sync="show" @cancel="cancel"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getOpenSynergy, synergyAddMember, getNewsList } from '@/api/synergy/synergy.js'
import UserSelect from '@/components/UserSelect'
import messageList from './messageList'
import chatPanel from './chatPanel.vue'

export default {
  components: {
    messageList,
    UserSelect,
    chatPanel
  },
  data () {
    return {
      show: false,
      isGroup: false,
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
  methods: {
    // 创建新的聊天
    createNewChatting () {
      this.show = true
      this.initMembers = JSON.parse(JSON.stringify(this.userSelectedList))
      this.$store.dispatch('getNewGroupMember', [])
    },
    confirm () {
      this.show = false
      if (this.isGroup) {
        this.isGroup = false
        let data = {
          groupId: this.groupId,
          inviterId: +localStorage.getItem('uid'),
          uList: this.userSelectedList.map(item => ({ uid: item.uid }))
        }
        synergyAddMember(data).then(res => {
          this.invitedMembers = res.successList.map(item => item.username).join('、')
          this.invidedMembersInfo = res.successList
        }).catch(() => {
          this.$createToast({
            time: 2000,
            txt: '邀请失败，请重试',
            type: 'error'
          }).show()
          this.$store.dispatch('getNewGroupMember', this.initMembers)
        })
      } else {
        let parameter = this.shiftParameter(this.userSelectedList)
        getOpenSynergy(
          parameter
        ).then(res => {
          this.$store.commit('currentConversation', {
            groupId: res.synergyGroup.id,
            relationType: res.synergyGroup.relationType
          })
          getNewsList().then(res => {
            this.$store.dispatch('newsList', res.newsList)
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
      this.show = false
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
      this.show = true
      this.isGroup = isGroup
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
