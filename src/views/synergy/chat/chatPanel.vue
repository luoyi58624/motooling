<template>
  <div class="chat-panel" v-show="groupId">
    <nav>
      <div class="chatting-name">
        <input
          type="text"
          v-if="chattingTarget.type == 666"
          :value="chattingTarget.name"
          maxlength="20"
          @blur="setGroupName($event.target.value)"
        />
        <span v-else-if="chattingTarget.type == 66">{{ chattingTarget.name }}</span>
        <span v-else>{{ talkMember }}</span>
      </div>
      <div
        class="add-member"
        v-if="chattingTarget.type == 666"
        @click="$emit('add-user', true)"
      ></div>
    </nav>
    <div class="chat-content">
      <div class="talk-wrapper">
        <div class="talk-content" ref="talkContent">
          <div v-for="(item, index) in recordList" :key="index">
            <div
              :class="uid == item.senderId ? 'my-content' : 'others-content'"
              v-if="item.contentType !== 5"
            >
              <div class="time-name">
                <span class="time">{{ item.sendTime }}</span
                ><span class="name">{{ item.username }}</span>
              </div>
              <div class="message" v-if="item.contentType === 1">
                <span class="word-message">{{ item.content }}</span>
              </div>
              <div
                class="image-message message"
                v-else-if="item.contentType === 2 || item.contentType === 6"
                @dblclick="showImagePreview(fileAddressFormatFunc(item.content))"
              >
                <img :src="fileAddressFormatFunc(item.content)" @load="handleImgload" />
              </div>
              <div
                class="audio-message message"
                v-else-if="item.contentType === 3"
                @click="playAudio(fileAddressFormatFunc(item.content))"
              >
                <img :src="require('@/assets/icon-voice-white.png')" alt="" />
                <span>{{ item.duration }}"</span>
              </div>
              <div class="video-message message" v-else-if="item.contentType === 4">
                <video
                  preload="meta"
                  :src="fileAddressFormatFunc(item.content)"
                  controls="controls"
                  width="250"
                  @click="playVideo($event)"
                ></video>
              </div>
            </div>
            <div v-if="item.contentType === 5">
              <div class="sys-notifacation">
                <span>{{item.content}}</span>
              </div>
            </div>
            <div v-if="item.contentType === 7">
              <div class="sys-notifacation" v-if="item.content.senderId == uid">
                <span>{{ item.content.sendeContent }}</span>
              </div>
              <div class="sys-notifacation" v-else-if="item.content.receiverId == uid">
                <span>{{ item.content.receiverContent }}</span>
              </div>
              <div class="sys-notifacation" v-else>
                <span>{{ item.content.otherContent }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="input-area">
          <div class="upload-wrapper">
            <label for="upload">
              <div class="icon icon-image"></div>
            </label>
            <input
              type="file"
              id="upload"
              multiple
              hidden
              accept="audio/mpeg,video/mp4,image/jpg,image/png,image/gif"
              @change="upload"
            />
            <label for="upload">
              <div class="icon icon-video"></div>
            </label>
          </div>
          <textarea v-model="wordContent" @keyup.enter.exact="sendWordMessage"></textarea>
          <div class="enter-message" @click="sendWordMessage">发送</div>
        </div>
      </div>
      <div class="group-members" v-if="chattingTarget.type === 666">
        <p class="group-members-title">群成员 · {{ groupMember.length }}</p>
        <div class="group-members-wrapper">
          <div
            class="group-members-item"
            v-for="item in groupMember"
            :key="item.uid"
            @click.right="handleGroupMember(item, $event)"
          >
            <img :src="item.avatar" alt="" />
            <span v-if="item.memberType === 1">{{ item.username }} · 群主</span>
            <span v-else>{{ item.username }}</span>
            <div
              class="popover"
              v-if="item.uid === selectedGroupMember"
              v-clickoutside="hidden"
            >
              <p @click.stop="createPrivateChatting(item.uid)">发送消息</p>
              <p @click.stop="beat(item)" v-if="item.uid != uid">找一找</p>
              <p @click.stop="removeFromGroup(item)" v-if="groupOwnerUid == uid">
                移出群聊
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <audio :src="currentAudio" ref="audio"></audio>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fileAddressFormat } from '@/utils/utils.js'
import { time } from '@/utils/time.js'
import shortid from 'shortid'
import {
  getOpenSynergy,
  synergyRecordPage,
  deleteGroupMember,
  updateGroupInfo,
  getNewsList,
  signOutGroup,
  alreadyRead,
  sendMessage
} from '@/api/synergy/synergy.js'
import clickoutside from '@/utils/clickoutside'
import debounce from '@/utils/debounce'
import { imgUpload, fileUpload } from '@/api/upload/upload.js'
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
    },
    talkMember: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isClose: false,
      imurl: localStorage.imurl,
      socket: {},
      synergyGroup: {},
      mainKeyId: '',
      wordContent: '',
      recordList: [],
      value: '',
      interval: null,
      selectedGroupMember: 0,
      groupOwnerUid: '',
      timeout: null,
      chattingTarget: {},
      groupMember: [],
      noMoreRecords: false,
      currentAudio: '',
      loadedScrollTop: 0,
      beforeLoadedScrollTop: 0,
      loadRecordTag: ''
    }
  },
  watch: {
    invitedMembers (newVal) {
      this.socketMessage(2, {
        contentType: 5,
        content: `${this.senderName}邀请${newVal}加入群聊成功`
      })
    },
    invidedMembersInfo (val) {
      this.groupMember = this.groupMember.concat(val)
    },
    groupId: {
      handler: function (val) {
        if (val) {
          this.init()
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapState({
      groupId: (state) => state.groupId,
      relationType: (state) => state.relationType,
      notReadCount: (state) => state.notReadCount,
      chatTargetInfo: (state) => state.chatTargetInfo,
      companyId: (state) => state.userInfo.companyId,
      uid: (state) => state.userInfo.uid,
      senderName: (state) => state.userInfo.username
    }),
    relationId () {
      return this.$route.query.relationId * 1
    }
  },
  created () {
    if (this.relationId) {
      this.createPrivateChatting(this.relationId)
    }
  },
  mounted () {
    this.$eventBus.$on('beat', this.beat)
    this.$eventBus.$on('quit', this.quitGroup)
    this.$refs.talkContent.addEventListener(
      'scroll',
      debounce(this.loadMoreRecordList, 500)
    )
  },
  beforeDestroy () {
    this.$refs.talkContent.removeEventListener(
      'scroll',
      debounce(this.loadMoreRecordList, 500)
    )
  },
  destroyed () {
    this.isClose = true
    this.socket.close()
  },
  methods: {
    init () {
      getOpenSynergy({
        relationType: this.relationType,
        groupId: this.groupId
      })
        .then((res) => {
          this.isClose = false
          if (res.synergyGroup.relationType === 666) {
            this.chattingTarget = { name: res.synergyGroup.subject, type: 666 }
          } else {
            res.memberList.forEach((member) => {
              if (member.uid !== this.uid * 1) {
                this.chattingTarget = { name: member.username, type: 66 }
              }
            })
          }
          let memberList = JSON.parse(JSON.stringify(res.memberList))
          this.groupMember = memberList
          this.groupOwnerUid = memberList[0].uid
          this.$store.commit('changeUserSelectedList', res.memberList)

          this.synergyGroup = res.synergyGroup
          let recordList = res.recordList.reverse()

          if (this.notReadCount !== 0) {
            let recordLen = recordList.length - 1
            alreadyRead({
              lastRecordId: recordList[recordLen].data.id,
              groupId: this.groupId
            }).then(() => {
              getNewsList().then((res) => {
                this.$store.dispatch('newsList', res.newsList)
              })
            })
          }

          recordList.forEach(item => {
            if (item.data.contentType === 7) {
              item.data.content = JSON.parse(item.data.content)
            }
          })
          this.recordList = time(recordList)
          this.scrolltoButtom()

          this.mainKeyId = recordList[0] && recordList[0].data.id
          this.im()
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
          prefix +
            this.imurl +
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
        if (this.socket.readyState === 1) {
          this.socket.send(
            JSON.stringify({
              requestType: 'ping',
              serialNumber: null,
              data: {}
            })
          )
        }
      }, 10000)
    },
    websocketonerror () {
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
    handleImgload () {
      if (this.loadRecordTag === 'load') {
        this.loadedScrollTop = this.$refs.talkContent.scrollHeight
        this.$refs.talkContent.scrollTop =
          this.loadedScrollTop - this.beforeLoadedScrollTop
      } else {
        let ele = this.$refs.talkContent
        ele.scrollTop = ele.scrollHeight
      }
    },
    // 滚到底部
    scrolltoButtom () {
      this.$nextTick(() => {
        let messageListNode = this.$refs.talkContent
        if (!messageListNode) {
          return
        }
        messageListNode.scrollTop = messageListNode.scrollHeight
      })
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
        if (name !== this.chattingTarget.name) {
          updateGroupInfo({
            groupId: this.groupId,
            subject: name
          }).then(() => {
            this.socketMessage(2, {
              contentType: 5,
              content: `${this.senderName}修改群名为"${name}"`
            })
            this.chattingTarget.name = name
            getNewsList().then((res) => {
              this.$store.dispatch('newsList', res.newsList)
            })
          })
        }
      }
    },
    // 退出群聊
    quitGroup (groupId) {
      signOutGroup({ groupId }).then(item => {
        this.socketMessage(2, {
          contentType: 5,
          content: `${this.senderName}退出了群聊`
        })
        this.$store.commit('currentConversation', {
          groupId: null,
          relationType: null
        })
        getNewsList().then(res => {
          this.$store.dispatch('newsList', res.newsList)
        })
      })
    },
    hidden () {
      this.selectedGroupMember = null
    },
    socketMessage (type, { contentType, content, smallImg, duration } = {}, data) {
      let message = {
        requestType: 'h5',
        serialNumber: 'h5' + shortid.generate(),
        data: {
          groupId: this.synergyGroup.id,
          senderId: this.uid
        }
      }
      if (type === 1) {
        message = {
          requestType: 'ping',
          serialNumber: null,
          data: {}
        }
      }
      if (type === 2) {
        message.data.contentType = contentType
        if (content) {
          message.data.content = content
        }
      }
      if (type === 3) {
        message = data
      }
      if (this.socket.readyState === 1) {
        this.socket.send(JSON.stringify(message))
      } else {
        this.im()
      }
    },
    fileAddressFormatFunc (url) {
      return fileAddressFormat(url)
    },
    // 播放音频
    playAudio (src) {
      this.$refs.audio.src = src
      this.$refs.audio.play()
    },
    // 播放视频
    playVideo (e) {
      if (e.target.paused) {
        e.target.play()
      } else {
        e.target.pause()
      }
    },
    receiveMessage (message) {
      console.log({ message })
      const currentTime = new Date()
      const sendTime = currentTime.getHours() + ':' + currentTime.getMinutes()
      this.recordList.push({ ...message.data, sendTime })

      if (message.responseType === '666666') {
        // 服务器主动推送
        this.$store.dispatch('latestMessageId', message.data.id)
        let responseServer = Object.assign({}, message)
        responseServer.requestType = '555555'
        this.socketMessage(3, {}, responseServer)
      }
      this.$nextTick(() => {
        this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
      })
    },
    // 发送文字消息
    sendWordMessage (type) {
      this.loadRecordTag = ''
      if (this.wordContent.trim() !== '') {
        const currentTime = new Date()
        const sendTime = currentTime.getHours() + ':' + currentTime.getMinutes()
        let _message = [
          {
            contentType: 1,
            content: this.wordContent,
            senderId: this.uid,
            sendTime,
            username: this.senderName
          }
        ]
        this.recordList = this.recordList.concat(_message)
        this.scrolltoButtom()
        sendMessage({
          groupId: this.groupId,
          senderId: this.uid,
          contentType: 1,
          content: this.wordContent
        }).then(() => {
          getNewsList().then((res) => {
            this.$store.dispatch('newsList', res.newsList)
          })
        }).catch((err) => {
          this.$createToast({
            time: 2000,
            txt: err.msg || '发送失败，请检查网络',
            type: 'error'
          }).show()
        })
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
    loadMoreRecordList () {
      if (this.noMoreRecords) {
        return false
      } else {
        if (this.$refs.talkContent.scrollTop === 0) {
          this.loadRecordTag = 'load'
          this.beforeLoadedScrollTop = this.$refs.talkContent.scrollHeight
          synergyRecordPage({ id: this.mainKeyId, groupId: this.groupId }).then((res) => {
            const result = res.recordList
            if (result.length !== 0) {
              let recordList = result.reverse()
              this.mainKeyId = recordList[0].data.id

              let _recordList = time(recordList)
              this.recordList = _recordList.concat(this.recordList)
            }
            if (result.length < 15) {
              this.noMoreRecords = true
            }

            this.$nextTick(() => {
              this.loadedScrollTop = this.$refs.talkContent.scrollHeight
              this.$refs.talkContent.scrollTop =
                this.loadedScrollTop - this.beforeLoadedScrollTop
            })
          })
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
        groupId: this.groupId,
        memberList: [{ uid: member.uid }]
      }).then((items) => {
        const deletedMember = items.delUserList[0]
        this.socketMessage(2, {
          contentType: 5,
          content: `${this.groupMember[0].username}将${deletedMember.username}请出了群聊`
        })
        let groupMembers = this.groupMember.filter((item) => {
          return item.uid !== deletedMember.uid
        })

        this.groupMember = groupMembers
        this.$store.dispatch('getNewGroupMember', groupMembers)
        this.selectedGroupMember = null
      })
    },
    // 选择群组中的某人创建聊天
    async createPrivateChatting (uid) {
      await getOpenSynergy({
        relationId: uid,
        relationType: 66
      })
        .then(async (res) => {
          this.selectedGroupMember = null
          const { newsList } = await getNewsList()
          this.$store.dispatch('newsList', newsList)
          this.$store.commit('currentConversation', { groupId: res.synergyGroup.id, relationType: res.synergyGroup.relationType })
        })
        .catch((err) => {
          this.$createToast({
            time: 2000,
            txt: err.msg || '互动消息开启失败,请检查网络',
            type: 'error'
          }).show()
        })
      this.selectedGroupMember = null
    },
    handleMessage ({ contentType, smallImg, content } = {}) {
      const currentTime = new Date()
      const sendTime = currentTime.getHours() + ':' + currentTime.getMinutes()
      let message = [
        {
          contentType,
          smallImg,
          content,
          sendTime,
          username: this.senderName,
          senderId: this.uid
        }
      ]
      this.recordList = this.recordList.concat(message)
      sendMessage({
        groupId: this.groupId,
        senderId: this.uid,
        contentType,
        content,
        smallImg
      }).then(() => {
        getNewsList().then((res) => {
          this.$store.dispatch('newsList', res.newsList)
        })
      }).catch((err) => {
        this.$createToast({
          time: 2000,
          txt: err.message || '发送失败，请重试',
          type: 'warn'
        }).show()
      })
    },
    // 上传图片或视频
    upload (e) {
      this.loadRecordTag = ''
      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        if (/image/.test(files[i].type)) {
          imgUpload(files[i]).then((res) => {
            let params = { contentType: 2, smallImg: res.imgUrl, content: res.rawUrl }
            this.handleMessage(params)
          })
        } else if (/audio/.test(files[i].type)) {
          fileUpload(files[i]).then((res) => {
            let params = { contentType: 3, smallImg: '', content: res.url }
            this.handleMessage(params)
          })
        } else if (/video/.test(files[i].type)) {
          fileUpload(files[i]).then((res) => {
            let params = { contentType: 4, smallImg: '', content: res.url }
            this.handleMessage(params)
          })
        } else {
          this.$createToast({
            time: 2000,
            txt: '不支持发送该文件',
            type: 'warn'
          }).show()
        }
      }
    },
    beat (data) {
      const senderName = this.senderName
      const content = {
        senderId: data.senterID || this.uid,
        receiverId: data.receiverID || data.uid,
        otherContent: `${senderName}找了${data.username}`,
        receiverContent: `${senderName}找了我`,
        sendeContent: `我找了${data.username}`
      }

      this.recordList.push({ content, contentType: 7 })
      this.scrolltoButtom()

      sendMessage({
        groupId: this.groupId,
        senderId: data.senterID || this.uid,
        contentType: 7,
        content: JSON.stringify(content)
      }).catch((err) => {
        this.$createToast({
          time: 2000,
          txt: err.msg || '发送失败，请检查网络',
          type: 'error'
        }).show()
      })
      this.selectedGroupMember = null
    }
  }
}
</script>

<style scoped lang="less">
@import url("./common.less");
.chat-panel {
  height: 100%;
  background-color: #fff;
}
nav {
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
      background-color: #f2f3f5;
      overflow-y: auto;
      .time-name {
        padding-top: 8px;
        .time {
          font-size: 12px;
          padding: 0 3px;
          color: #828c99;
        }
      }
      .message {
        margin: 8px 0 8px 20px;
      }
      .word-message {
        background-color: #dee0e3;
        padding: 5px;
        border-radius: 5px;
        user-select: text;
        word-break: break-all;
        white-space: pre-line;
        display: inline-block;
        overflow: hidden;
      }
      .image-message {
        img {
          max-height: 200px;
          object-fit: contain;
        }
      }
      .audio-message {
        img {
          height: 30px;
          width: 30px;
          vertical-align: middle;
        }
      }
      .my-content {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-right: 18px;
        .time-name {
          display: flex;
          align-items: center;
        }
      }
      .others-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 18px;
        .time-name {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
        }
      }
      .sys-notifacation {
        text-align: center;
        margin: 8px 20px;
        span {
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
      .upload-wrapper {
        height: 20px;
        margin-top: 5px;
        .icon {
          float: left;
          width: 20px;
          height: 20px;
          margin-left: 10px;
        }
        .icon-image {
          background: url("../../../assets/icon-album.png") center/cover;
        }
        .icon-video {
          background: url("../../../assets/icon-camera.png") center/cover;
        }
      }
      textarea {
        width: 95%;
        height: calc(100% - 54px);
        resize: none;
        border: 0;
        padding-left: 10px;
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
    .group-members-title {
      padding: 10px;
    }
    .group-members-wrapper {
      height: calc(100% - 32px);
      overflow-y: auto;
    }
    .group-members-item {
      padding: 4px 0 4px 10px;
      img {
        width: 15px;
        height: 15px;
        vertical-align: middle;
        background-color: #ccc;
      }
      span {
        padding-left: 5px;
      }
      &:hover {
        background-color: #e6e8eb;
      }
    }
  }
}
</style>
