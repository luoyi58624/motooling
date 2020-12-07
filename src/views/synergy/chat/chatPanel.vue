<template>
  <div class="chat-panel">
    <nav>
      <div class="chatting-name">
        <input type="text" v-if="chattingTarget.type==666" v-model="chattingTarget.name" @blur="setGroupName($event.target.value)">
        <span v-else>{{chattingTarget.name}}</span>
      </div>
      <div class="add-member" v-if="chattingTarget.type == 666" @click="$emit('add-user',true)"></div>
    </nav>
    <div class="chat-content">
      <div class="talk-wrapper">
        <div class="talk-content" ref="talkContent">
          <div v-for="(item,index) in recordList" :key="index">
            <div :class="uid == item.senderId?'my-content':'others-content'" v-if="item.contentType !== 5">
              <div class="talker-name">{{item.username}}</div>
              <div class="word-message message" v-if="item.contentType === 1">{{item.content}}</div>
              <div class="image-message message" v-else-if="item.contentType === 2" @dblclick="showImagePreview(fileAddressFormatFunc(item.content))">
                <img :src="fileAddressFormatFunc(item.smallImg)" alt="">
              </div>
            </div>
            <div v-if="item.contentType === 5">
              <div class="sys-notifacation"><span>{{item.content}}</span></div>
            </div>
          </div>
        </div>
        <div class="input-area">
          <textarea v-model="wordContent" @keyup.enter="sendWordMessage"></textarea>
          <div class="enter-message" @click="sendWordMessage">发送</div>
        </div>
      </div>
      <div class="group-members" v-if="chattingTarget.type === 666" >
        <p class="group-members-title">群成员 · {{groupMember.length}}</p>
        <div class="group-members-item" v-for="item in groupMember" :key="item.uid" @click.right="handleGroupMember(item,$event)">
            <img :src="item.avatar" alt="">
          <span v-if="item.memberType===1">{{item.username}} · 群主</span>
          <span v-else>{{item.username}}</span>
          <div class="popover" v-if="item.uid === selectedGroupMember" v-clickoutside="hiden">
            <p @click.stop="createPrivateChatting(item.uid)">发送消息</p>
            <p @click.stop="removeFromGroup(item)" v-if="groupOwnerUid == uid">移出群聊</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fileAddressFormat } from '@/utils/utils.js'
import shortid from 'shortid'
import {
  getOpenSynergy,
  synergyRecordPage,
  deleteGroupMember,
  updateGroupInfo,
  getNewsList,
  alreadyRead,
  sendMessage
} from '@/api/synergy/synergy.js'
import clickoutside from '@/utils/clickoutside'
export default {
  directives: { clickoutside },
  props: {
    invitedMembers: {
      type: String,
      default: ''
    },
    invidedMembersInfo: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isClose: false,
      companyId: localStorage.companyId,
      imurl: localStorage.imurl,
      socket: {},
      synergyGroup: {},
      uid: localStorage.uid,
      mainKeyId: '',
      wordContent: '',
      recordList: [],
      value: '',
      interval: null,
      selectedGroupMember: null,
      groupOwnerUid: null,
      chattingTarget: {},
      groupMember: [],
      noMoreRecords: false
    }
  },
  watch: {
    invitedMembers (newVal) {
      this.sendMessage(2, { contentType: 5, content: `${localStorage.username}邀请${newVal}加入群聊` })
    },
    invidedMembersInfo (val) {
      this.groupMember = this.groupMember.concat(val)
    }
  },
  computed: {
    chatTargetInfo () {
      return this.$store.state.chatTargetInfo
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    if (!from.query.relationId) {
      this.isClose = true
      this.socket.close()
      this.init().then(() => {
        this.$refs.talkContent.scrollTop = 9999
      })
    }
  },
  mounted () {
    this.$refs.talkContent.addEventListener('scroll', this.loadMoreRecordList)
  },
  beforeDestroy () {
    this.$refs.talkContent.removeEventListener('scroll', this.loadMoreRecordList)
  },
  destroyed () {
    this.isClose = true
    this.socket.close()
  },
  methods: {
    async init () {
      let uid = this.$route.query.relationId
      if (uid) {
        await this.createPrivateChatting(uid)
      }
      await getOpenSynergy({
        relationType: this.$route.query.relationType,
        relationId: this.$route.query.ralationId,
        groupId: this.$route.query.groupId
      }).then(res => {
        console.log('res', res)
        this.isClose = false
        this.chattingTarget = { name: res.synergyGroup.subject || res.memberList[1].username, type: res.synergyGroup.relationType }
        let memberList = JSON.parse(JSON.stringify(res.memberList))
        this.groupMember = memberList
        this.groupOwnerUid = memberList[0].uid
        this.$store.commit('changeUserSelectedList', res.memberList)

        this.synergyGroup = res.synergyGroup
        let recordList = res.recordList.reverse()

        // let recordLen = recordList.length - 1
        // if (recordLen >= 0) {
        //   alreadyRead({ lastRecordId: recordList[recordLen].data.id, groupId: this.$route.query.groupId }).then(() => {
        //     getNewsList().then(res => {
        //       this.$store.dispatch('newsList', res.newsList)
        //     })
        //   })
        // }

        this.recordList = recordList.map(item => {
          return item.data
        })
        this.mainKeyId = res.recordList[0] && res.recordList[0].data.id
        this.im()
      }).catch(err => {
        console.log('请求超时')
        this.$createToast({
          time: 2000,
          txt: err.msg || '互动消息开启失败,请检查网络',
          type: 'error'
        }).show()
      })
    },
    im () {
      let prefix = location.protocol === 'https:' ? 'wss://' : 'ws://'
      if (
        this.isClose === false &&
        (Object.keys(this.socket).length === 0 ||
          (this.socket && this.socket.readyState === 3))
      ) {
        this.socket = new WebSocket(
          prefix + this.imurl +
            '/mtwebsocket/' +
            this.companyId +
            '/' +
            this.synergyGroup.id +
            '/' +
            sessionStorage.token +
            '/' +
            localStorage.WEBURL.split('//')[1]
        )
        this.socket.onopen = this.websocketonopen
        this.socket.onerror = this.websocketonerror
        this.socket.onmessage = this.websocketonmessage
        this.socket.onclose = this.websocketclose
      }
    },
    websocketonopen () {
      this.interval = setInterval(() => {
        this.sendMessage(1)
      }, 10000)
    },
    websocketonerror () {
      console.log('error')
      this.isEnable = false
      this.$createToast({
        time: 2000,
        txt: '网络连接发生错误，请检查网络',
        type: 'warn'
      }).show()
    },
    websocketonmessage (e) {
      this.receiveMessage(JSON.parse(e.data))
    },
    websocketclose () {
      if (this.isClose === false) {
        this.im()
      } else {
        clearInterval(this.interval)
      }
    },
    // 设置群名称
    setGroupName (name) {
      if (name === '') {
        this.$createToast({
          time: 2000,
          txt: '群名不能为空',
          type: 'error'
        }).show()
      } else {
        updateGroupInfo({
          groupId: this.$route.query.groupId,
          subject: name
        }).then(res => {
          this.sendMessage(2, { contentType: 5, content: `${localStorage.username}修改群名为"${name}"` })
          getNewsList().then(res => {
            this.$store.dispatch('newsList', res.newsList)
          })
        })
      }
    },
    hiden () {
      this.selectedGroupMember = null
    },
    // 发送信息
    sendMessage ({ contentType, content, smallImg } = {}) {
      if (this.socket.readyState === 1) {
        sendMessage({
          groupId: this.$route.query.groupId,
          senderId: this.uid,
          contentType,
          content,
          smallImg
        })
      } else {
        this.im()
      }
    },
    fileAddressFormatFunc (url) {
      return fileAddressFormat(url)
    },
    receiveMessage (message) {
      if (message.responseType === '666666') {
        alreadyRead({ lastRecordId: message.data.id, groupId: message.data.groupId }).then(() => {
          getNewsList().then(res => {
            this.$store.dispatch('newsList', res.newsList)
          })
        })
      }
      if (message.responseType === '666666') { // 服务器主动推送
        this.recordList.push(message.data)
        let responseServer = Object.assign({}, message)
        responseServer.requestType = '555555'
        this.sendMessage(3, {}, responseServer)
      } else {
        let _message = [{ ...message.data, username: localStorage.username }]
        this.recordList = this.recordList.concat(_message)
      }
      this.$nextTick(() => {
        this.$refs.talkContent.scrollTop = 9999
      })
    },
    // 发送文字消息
    sendWordMessage (type) {
      if (this.wordContent.trim() !== '') {
        if (this.socket.readyState === 1) {
          sendMessage({
            groupId: this.$route.query.groupId,
            senderId: this.uid,
            contentType: 1,
            content: this.wordContent
          }).then(res => {
            let _message = [{ ...res.data, username: localStorage.username }]
            this.recordList = this.recordList.concat(_message)
            this.$nextTick(() => {
              this.$refs.talkContent.scrollTop = 9999
            })
          })
        } else {
          this.im()
        }
        this.wordContent = ''
      } else {
        this.$createToast({
          time: 2000,
          txt: '请输入要发送的内容',
          type: 'error'
        }).show()
      }
    },
    // 获取聊天记录
    getRecordList () {
      synergyRecordPage({ id: this.mainKeyId, groupId: this.$route.query.groupId }).then(res => {
        const result = res.recordList
        if (result.length !== 0) {
          this.mainKeyId = result[0].data.id
          let recordList = result.reverse()
          let _recordList = recordList.map(item => item.data)
          this.recordList = _recordList.concat(this.recordList)
        }
        if (result.length < 16) {
          this.noMoreRecords = true
        }
      })
    },
    loadMoreRecordList () {
      if (this.noMoreRecords) {
        return false
      } else {
        if (this.$refs.talkContent.scrollTop === 0) {
          this.getRecordList()
          this.$refs.talkContent.scrollTo(0, 300)
        }
      }
    },
    // 图片预览
    showImagePreview (url) {
      this.$createImagePreview({
        imgs: [url]
      }).show()
    },
    // 对群成员的操作
    handleGroupMember (item, event) {
      if (event) {
        event.preventDefault()
      }
      this.selectedGroupMember = item.uid
    },
    // 移除群聊
    removeFromGroup (member) {
      deleteGroupMember({
        groupId: this.$route.query.groupId,
        memberList: [{ uid: member.uid }]
      }).then(items => {
        const deletedMember = items.delUserList[0]
        this.sendMessage(2, { contentType: 5, content: `${this.groupMember[0].username}将${deletedMember.username}移出了群聊` })
        let groupMembers = this.groupMember.filter(item => {
          return item.uid !== deletedMember.uid
        })

        this.groupMember = groupMembers
        this.$store.dispatch('getNewGroupMember', groupMembers)
      })
    },
    // 选择群组中的某人创建聊天
    async createPrivateChatting (uid) {
      await getOpenSynergy({
        relationId: uid,
        relationType: 66
      }).then(res => {
        console.log('success')
        this.selectedGroupMember = null
        this.$router.push({
          path: 'chatPanel',
          query: {
            groupId: res.synergyGroup.id,
            relationType: res.synergyGroup.relationType
          }
        })
        getNewsList().then(res => {
          this.$store.dispatch('newsList', res.newsList)
        })
      }).catch(err => {
        console.log('error')
        this.$createToast({
          time: 2000,
          txt: err.msg || '互动消息开启失败,请检查网络',
          type: 'error'
        }).show()
      })
    }
  }
}
</script>

<style scoped lang="less">
@import url('./common.less');
.chat-panel {
  height: 100%;
  background-color: #fff;
}
nav{
  position: relative;
  height: 59px;
  line-height: 59px;
  border-bottom: 1px solid #dadcdf;
  padding-left: 18px;
    .add-member {
    position: absolute;
    bottom: 8px;
    right: 15px;
    width: 20px;
    height: 20px;
    background: url("../../../assets/add-member.png") no-repeat center/cover;
  }
}
.chat-content {
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  .talk-wrapper {
    flex: auto;
    height: 100%;
    width: calc(100% - 122px);
    .talk-content {
      font-size: 14px;
      height: calc(100% - 155px);
      // overflow: hidden;
      overflow-y: auto;
      // &:hover {
      //   margin-right: -6px;
      //   overflow-y: auto;
      // }
      .talker-name {
        padding-top: 8px;
      }
      .message {
          margin: 8px 0;
      }
      .word-message {
          background-color: #dee0e3;
          padding: 8px;
          border-radius: 5px;
        }
      .my-content {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-right: 18px;
      }
      .others-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 18px;
      }
      .sys-notifacation {
        text-align: center;
        margin: 8px auto;
        span{
          display: inline-block;
          padding: 8px;
          background-color: #e4e7eb;
        }
      }
    }
    .input-area {
      height: 154px;
      border-top: 1px solid #dadcdf;
      position: relative;
      textarea {
        width: 98%;
        height: calc(100% - 30px);
        resize: none;
        border: 0;
      }
      .enter-message {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 10px;
        font-size: 14px;
        color: #6e7882;
        cursor: pointer;
        &:hover {
          color: #2391f5;
        }
      }
    }
  }
  .group-members {
    width: 121px;
    font-size: 12px;
    border-left: 1px solid #dadcdf;
    box-sizing: border-box;
    padding-top: 10px;
    .group-members-title {
      padding-left: 10px;
    }
    .group-members-item {
      position: relative;
      padding: 4px 0 4px 10px ;
        img{
          width:15px;
          height:15px;
          vertical-align:middle;
          background-color:#ccc
        }
      span {
        padding-left: 5px;
      }
      &:hover{
        background-color: #e6e8eb;
      }
    }
  }
}
</style>
