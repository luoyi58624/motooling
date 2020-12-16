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
              <div class="image-message message" v-else-if="item.contentType === 2 || item.contentType === 6" @dblclick="showImagePreview(fileAddressFormatFunc(item.content))">
                <img :src="fileAddressFormatFunc(item.content)" loading="lazy" @load="handleImgload">
              </div>
              <div class="audio-message message"
                v-else-if="item.contentType === 3"
                @click="playAudio(fileAddressFormatFunc(item.content))"
              >
                <img :src="require('@/assets/icon-voice-white.png')" alt="">
                <span>{{item.duration}}"</span>
              </div>
              <div
                class="video-message message"
                v-else-if="item.contentType === 4"
              >
                <video
                 preload="meta"
                 :src="fileAddressFormatFunc(item.content)"
                 controls="controls"
                 width="250"
                 @click="playVideo($event)"
                >
                </video>
              </div>
            </div>
            <div v-if="item.contentType === 5">
              <div class="sys-notifacation"><span>{{item.content}}</span></div>
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
            >
            <label for="upload">
              <div class="icon icon-video"></div>
            </label>
          </div>
          <textarea v-model="wordContent" @keyup.enter.exact="sendWordMessage"></textarea>
          <div class="enter-message" @click="sendWordMessage">发送</div>
        </div>
      </div>
      <div class="group-members" v-if="chattingTarget.type === 666" >
        <p class="group-members-title">群成员 · {{groupMember.length}}</p>
        <div class="group-members-wrapper">
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
    <audio :src="currentAudio" ref="audio"></audio>
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
    }
  },
  data () {
    return {
      isClose: false,
      companyId: localStorage.companyId,
      imurl: localStorage.imurl,
      uid: localStorage.uid,
      socket: {},
      synergyGroup: {},
      mainKeyId: '',
      wordContent: '',
      recordList: [],
      value: '',
      interval: null,
      selectedGroupMember: null,
      groupOwnerUid: null,
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
      this.socketMessage(2, { contentType: 5, content: `${localStorage.username}邀请${newVal}加入群聊` })
    },
    invidedMembersInfo (val) {
      this.groupMember = this.groupMember.concat(val)
    }
  },
  computed: {
    chatTargetInfo () {
      return this.$store.state.chatTargetInfo
    },
    notReadCount () {
      return this.$store.state.notReadCount
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    if (!from.query.relationId) {
      this.noMoreRecords = false
      this.isClose = true
      this.socket.close()
      this.init().then(() => {
        this.$refs.talkContent.scrollTop = 9999
      })
    }
  },
  mounted () {
    this.init().then(() => {
      this.$refs.talkContent.scrollTop = 9999
    })
    this.$refs.talkContent.addEventListener('scroll', debounce(this.loadMoreRecordList, 500))
  },
  beforeDestroy () {
    this.$refs.talkContent.removeEventListener('scroll', debounce(this.loadMoreRecordList, 500))
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
        this.isClose = false
        if (res.synergyGroup.relationType === 666) {
          this.chattingTarget = { name: res.synergyGroup.subject, type: 666 }
        } else {
          res.memberList.forEach(member => {
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
          alreadyRead({ lastRecordId: recordList[recordLen].data.id, groupId: this.$route.query.groupId }).then(() => {
            getNewsList().then(res => {
              this.$store.dispatch('newsList', res.newsList)
            })
          })
        }

        this.recordList = recordList.map(item => {
          return item.data
        })
        this.mainKeyId = recordList[0] && recordList[0].data.id
        this.im()
      }).catch(err => {
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
        console.log('ping')
        this.socket.send(JSON.stringify({
          requestType: 'ping',
          serialNumber: null,
          data: {} }))
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
        this.$refs.talkContent.scrollTop = this.loadedScrollTop - this.beforeLoadedScrollTop
      } else {
        let ele = this.$refs.talkContent
        ele.scrollTop = ele.scrollHeight
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
          this.socketMessage(2, { contentType: 5, content: `${localStorage.username}修改群名为"${name}"` })
          getNewsList().then(res => {
            this.$store.dispatch('newsList', res.newsList)
          })
        })
      }
    },
    hiden () {
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
          data: {

          }
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
        this.socket.send(JSON.stringify(
          message
        ))
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
      this.recordList.push(message.data)
      if (message.responseType === '666666') { // 服务器主动推送
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
      if (this.wordContent.trim() !== '') {
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
          synergyRecordPage({ id: this.mainKeyId, groupId: this.$route.query.groupId }).then(res => {
            const result = res.recordList
            if (result.length !== 0) {
              let recordList = result.reverse()
              this.mainKeyId = recordList[0].data.id
              let _recordList = recordList.map(item => item.data)
              this.recordList = _recordList.concat(this.recordList)
            }
            if (result.length < 15) {
              this.noMoreRecords = true
            }

            this.$nextTick(() => {
              this.loadedScrollTop = this.$refs.talkContent.scrollHeight
              this.$refs.talkContent.scrollTop = this.loadedScrollTop - this.beforeLoadedScrollTop
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
        groupId: this.$route.query.groupId,
        memberList: [{ uid: member.uid }]
      }).then(items => {
        const deletedMember = items.delUserList[0]
        this.socketMessage(2, { contentType: 5, content: `${this.groupMember[0].username}将${deletedMember.username}移出了群聊` })
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
        this.$createToast({
          time: 2000,
          txt: err.msg || '互动消息开启失败,请检查网络',
          type: 'error'
        }).show()
      })
    },
    handleMessage ({ contentType, smallImg, content } = { }) {
      sendMessage({
        groupId: this.$route.query.groupId,
        senderId: this.uid,
        contentType,
        content,
        smallImg
      }).then(res => {
        let _message = [{ ...res.data, username: localStorage.username }]
        this.recordList = this.recordList.concat(_message)
      }).catch(err => {
        this.$createToast({
          time: 2000,
          txt: err.message || '发送失败，请重试',
          type: 'warn'
        }).show()
      })
    },
    // 上传图片或视频
    upload (e) {
      const files = e.target.files
      for (let i = 0; i < files.length; i++) {
        if (/image/.test(files[i].type)) {
          imgUpload(files[i]).then(res => {
            let params = { contentType: 2, smallImg: res.imgUrl, content: res.rawUrl }
            this.handleMessage(params)
          })
        } else if (/audio/.test(files[i].type)) {
          fileUpload(files[i]).then(res => {
            let params = { contentType: 3, smallImg: '', content: res.url }
            this.handleMessage(params)
          })
        } else if (/video/.test(files[i].type)) {
          fileUpload(files[i]).then(res => {
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
      background-color: #f2f3f5;
      overflow-y: auto;
      .talker-name {
        padding-top: 8px;
      }
      .message {
          margin: 8px 0 8px 20px;
      }
      .word-message {
          background-color: #dee0e3;
          padding: 8px;
          border-radius: 5px;
          user-select: text;
          white-space: pre-wrap;

        }
        .image-message {
          img {
            max-height: 200px;
            object-fit: contain;
          }
        }
        .audio-message {
          img{
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
          background: url('../../../assets/icon-album.png') center/cover;
        }
        .icon-video {
          background: url('../../../assets/icon-camera.png') center/cover;
        }
      }
      textarea {
        width: 95%;
        height: calc(100% - 54px);
        resize: none;
        border: 0;
        padding-left:10px;
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
    .group-members-wrapper{
      height: calc(100% - 32px);
      overflow-y: auto;
    }
    .group-members-item {
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
