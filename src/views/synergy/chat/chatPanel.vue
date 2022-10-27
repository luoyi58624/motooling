<template>
  <div class="chat-panel" v-show="groupId">
    <nav>
      <div class="chatting-name">
        <input style="width: 580px" type="text" v-if="chattingTarget.type === 666" :value="chattingTarget.name"
               maxlength="50" @blur="setGroupName($event.target.value)"/>
        <span v-else-if="chattingTarget.type === 66">{{ chattingTarget.name }}</span>
        <span v-else>{{ talkMember }}</span>
      </div>
      <div class="add-member" v-if="chattingTarget.type === 666" @click="$emit('add-user', true)"></div>
    </nav>
    <div class="chat-content">
      <div class="talk-wrapper" :style="[chatContainerWidth]">
        <div class="talk-content" ref="talkContent">
          <div v-for="(item, index) in recordList" :key="index" class="talk-item" :data-id="item.id">
            <div :class="uid === item.senderId ? 'my-content' : 'others-content'"
                 v-if="item.contentType !== 5 && item.contentType!==7 && item.contentType!==8">
              <div class="time-name">
                <span class="time">{{ item.sendTime }}</span>
                <span class="name">{{ item.username }}</span>
              </div>
              <div class="message-container">
                <div v-if="item.loading">...</div>
                <!--如果是群聊，自己发送的消息需要知道哪些人已读、未读-->
                <template v-else-if="chattingTarget.type === 666">
                  <el-popover v-if="uid === item.senderId" placement="left" width="400" trigger="click">
                    <div class="read-popover" style="width: 380px;height: 360px">
                      <van-tabs color="#3498db">
                        <van-tab :title="readMessageUsers.length+'已读'">
                          <ul class="user-list">
                            <li v-for="user in readMessageUsers" :key="user.id"
                                @click="createPrivateChatting(user.uid)">
                              <el-image style="width: 30px; height: 30px;border-radius: 6px;"
                                        fit="fill" :src="user.avatar"/>
                              <span style="margin-left: 8px">
                             {{ user.username }}
                          </span>
                            </li>
                          </ul>
                        </van-tab>
                        <van-tab :title="unReadMessageUsers.length+'未读'">
                          <ul class="user-list">
                            <li v-for="user in unReadMessageUsers" :key="user.id"
                                @click="createPrivateChatting(user.uid)">
                              <el-image style="width: 30px; height: 30px;border-radius: 6px;"
                                        fit="fill" :src="user.avatar"/>
                              <span style="margin-left: 8px">
                             {{ user.username }}
                          </span>
                            </li>
                          </ul>
                        </van-tab>
                      </van-tabs>
                    </div>
                    <template v-if="item.readMessageUsers.length===0">
                      <div class="read-mark cursor-pointer" slot="reference" @click="setReadMessageUser(item)"></div>
                    </template>
                    <template v-else-if="item.readMessageUsers.length===groupMember.length-1">
                      <div class="read-mark all-read cursor-pointer" slot="reference" @click="setReadMessageUser(item)">
                        <svg t="1666074761757" class="icon" viewBox="0 0 1099 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="2330" width="200" height="200">
                          <path
                            d="M748.16 371.7c10-12.4 10.7-24.4 1.1-31.7-14.3-9.1-23.1-3.1-33.1 9.3L472.86 645.7 352.06 533.4c-13-11.9-24.7-17-36.2-7.2-8.5 10.3-7.2 16.4 3.6 28.7l132.6 123.7c12.9 12.9 30.5 12.7 43.4 1.3C505.56 671.2 748.16 371.7 748.16 371.7z"
                            p-id="2331"></path>
                        </svg>
                      </div>
                    </template>
                    <template v-else>
                      <div class="read-mark cursor-pointer" slot="reference" @click="setReadMessageUser(item)">
                        {{ item.readMessageUsers.length }}
                      </div>
                    </template>
                  </el-popover>
                </template>
                <template v-else-if="uid === item.senderId">
                  <div v-if="item.readMessageUsers.length===0" class="read-mark" slot="reference"
                       @click="setReadMessageUser(item)"></div>
                  <div v-else class="read-mark all-read" slot="reference" @click="setReadMessageUser(item)">
                    <svg t="1666074761757" class="icon" viewBox="0 0 1099 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="2330" width="200" height="200">
                      <path
                        d="M748.16 371.7c10-12.4 10.7-24.4 1.1-31.7-14.3-9.1-23.1-3.1-33.1 9.3L472.86 645.7 352.06 533.4c-13-11.9-24.7-17-36.2-7.2-8.5 10.3-7.2 16.4 3.6 28.7l132.6 123.7c12.9 12.9 30.5 12.7 43.4 1.3C505.56 671.2 748.16 371.7 748.16 371.7z"
                        p-id="2331"></path>
                    </svg>
                  </div>
                </template>
                <!--消息内容-->
                <div class="message-content">
                  <div class="message" v-if="item.contentType === 1">
                    <span class="word-message" @contextmenu="openContextMenu($event,item)" v-html="item.content"></span>
                  </div>
                  <div class="message" v-else-if="item.contentType === 2 || item.contentType === 6">
                    <el-image style="width: 160px; height: 90px;"
                              fit="scale-down"
                              :src="fileAddressFormatFunc(item.content)"
                              :preview-src-list="allImages"
                              @contextmenu="openContextMenu($event,item)"/>
                  </div>
                  <div class="audio-message message"
                       v-else-if="item.contentType === 3"
                       @click="playAudio(fileAddressFormatFunc(item.content))">
                    <img :src="require('@/assets/icon-voice-white.png')" alt=""/>
                    <span>{{ item.duration }}"</span>
                  </div>
                  <div class="video-message message" v-else-if="item.contentType === 4">
                    <video preload="meta"
                           :src="fileAddressFormatFunc(item.content)"
                           controls="controls"
                           width="250"
                           height="140"
                           @click="playVideo($event)"/>
                  </div>
                  <div class="file-message-container" v-if="item.contentType === 9">
                    <div class="file-message">
                      <div class="file-info">
                        <div class="name">{{ item.content.fileName }}</div>
                        <div class="size">{{ item.content.fileSize }}</div>
                      </div>
                      <div class="file-icon">
                        <el-image style="width: 36px;height: 36px;" :src="fileIcon(item.content.fileName)"/>
                      </div>
                      <div class="file-operate">
                        <div class="file-download"
                             @click="downloadFile(fileAddressFormatFunc(item.content.fileUrl),item.content.fileName)">
                          <svg t="1666683819263" class="icon" viewBox="0 0 1024 1024" version="1.1"
                               xmlns="http://www.w3.org/2000/svg" p-id="19951" width="32" height="32">
                            <path
                              d="M828.975746 894.125047 190.189132 894.125047c-70.550823 0-127.753639-57.18542-127.753639-127.752616L62.435493 606.674243c0-17.634636 14.308891-31.933293 31.93227-31.933293l63.889099 0c17.634636 0 31.93227 14.298658 31.93227 31.933293l0 95.821369c0 35.282574 28.596292 63.877843 63.87682 63.877843L765.098927 766.373455c35.281551 0 63.87682-28.595268 63.87682-63.877843l0-95.821369c0-17.634636 14.298658-31.933293 31.943526-31.933293l63.877843 0c17.634636 0 31.933293 14.298658 31.933293 31.933293l0 159.699212C956.729385 836.939627 899.538849 894.125047 828.975746 894.125047L828.975746 894.125047zM249.938957 267.509636c12.921287-12.919241 33.884738-12.919241 46.807049 0l148.97087 148.971893L445.716876 94.89323c0-17.634636 14.300704-31.94762 31.933293-31.94762l63.875796 0c17.637706 0 31.945573 14.312984 31.945573 31.94762l0 321.588299 148.97087-148.971893c12.921287-12.919241 33.875528-12.919241 46.796816 0l46.814212 46.818305c12.921287 12.922311 12.921287 33.874505 0 46.807049L552.261471 624.930025c-1.140986 1.137916-21.664416 13.68365-42.315758 13.69286-20.87647 0.010233-41.878806-12.541641-43.020816-13.69286L203.121676 361.13499c-12.922311-12.933567-12.922311-33.884738 0-46.807049L249.938957 267.509636 249.938957 267.509636z"
                              p-id="19952"></path>
                          </svg>
                        </div>
                        <a class="file-preview" v-if="officeFile(item.content.fileName)"
                           :href="'https://view.officeapps.live.com/op/view.aspx?src='+fileAddressFormatFunc(item.content.fileUrl)"
                           target="_blank">
                          <svg t="1666683919758" class="icon" viewBox="0 0 1331 1024" version="1.1"
                               xmlns="http://www.w3.org/2000/svg" p-id="1430" width="32" height="32">
                            <path
                              d="M665.6 1023.0784C298.2912 1023.0784 37.5808 694.5792 0.6144 512 37.4784 329.5232 298.2912 0.9216 665.6 0.9216c367.3088 0 628.0192 328.6016 664.9856 511.0784-36.864 182.5792-297.6768 511.0784-664.9856 511.0784z m0-912.5888C375.6032 110.4896 159.744 363.8272 114.688 512c45.056 148.1728 260.9152 401.6128 550.912 401.6128S1171.456 660.1728 1216.512 512c-45.056-148.1728-260.9152-401.5104-550.912-401.5104z m0 620.544C543.1296 731.136 443.904 633.0368 443.904 512s99.328-219.0336 221.696-219.0336c122.4704 0 221.696 97.9968 221.696 219.0336S787.968 731.136 665.6 731.136z m0-328.6016c-61.1328 0-110.7968 49.152-110.7968 109.568 0 60.416 49.664 109.568 110.7968 109.568 61.1328 0 110.7968-49.152 110.7968-109.568 0-60.416-49.664-109.568-110.7968-109.568z"
                              p-id="1431"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="item.contentType === 5">
              <div class="sys-notifacation">
                <span class="content">{{ item.content }}</span>
              </div>
            </div>
            <div v-if="item.contentType === 7">
              <div class="sys-notifacation" v-if="item.content.senderId === uid">
                <span class="content">{{ item.content.sendeContent }}</span>
              </div>
              <div class="sys-notifacation" v-else-if="item.content.receiverId === uid">
                <span class="content">{{ item.content.receiverContent }}</span>
              </div>
              <div class="sys-notifacation" v-else>
                <span class="content">{{ item.content.otherContent }}</span>
              </div>
            </div>
            <div v-if="item.contentType === 8">
              <div class="sys-notifacation">
                <span v-if="uid === item.senderId" class="content">
                  你撤回了一条消息
                  <span v-if="showAgainEdit(item)">
                    ，<span class="text-blue" @click="againEdit(item)">重新编辑</span>
                  </span>
                </span>
                <span v-else class="content">
                  {{ `${item.username}撤回了一条消息` }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <chat-editor ref="ChatEditor" :value="$store.state.wordContent"
                     @change="inputChange" @handleMessage="handleMessage"/>
      </div>
      <div class="group-members" v-if="!recordPanel && chattingTarget.type === 666">
        <p class="group-members-title">群成员 · {{ groupMember.length }}</p>
        <div class="group-members-wrapper">
          <div class="group-members-item" v-for="item in groupMember" :key="item.uid"
               @click.right="handleGroupMember(item, $event)">
            <img :src="item.avatar" alt=""/>
            <span v-if="item.memberType === 1">{{ item.username }} · 群主</span>
            <span v-else>{{ item.username }}</span>
            <div class="popover" v-if="item.uid === selectedGroupMember" v-clickoutside="hidden">
              <p @click.stop="createPrivateChatting(item.uid)">发送消息</p>
              <p @click.stop="beat(item)" v-if="item.uid != uid">找一找</p>
              <p @click.stop="removeFromGroup(item)" v-if="groupOwnerUid == uid">
                移出群聊
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-history" v-show="recordPanel">
        <chat-history ref="ChatHistory" :init-date="recordList"
                      @skip-target-message="skipTargetMessage"/>
      </div>
    </div>
    <audio :src="currentAudio" ref="audio"></audio>
    <div class="member-list" v-show="$store.state.groupAt">
      <member-list @handleAt="handleGroupAt" @selectUser="setSelectUser"/>
    </div>
    <context-menu ref="ContextMenu" @revocationMsg="revocationMsg"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { fileAddressFormat, isOffice, loadFileIcon, requestNotification, uuid } from '@/utils/utils.js'
import { time } from '@/utils/time.js'
import shortid from 'shortid'
import {
  alreadyRead,
  at,
  deleteGroupMember, getGroupMemberNewRecord,
  getNewsList,
  getOpenSynergy,
  sendMessage,
  signOutGroup,
  synergyRecordPage,
  updateGroupInfo
} from '@/api/synergy/synergy.js'
import clickoutside from '@/utils/clickoutside'
import memberList from '@/views/synergy/chat/memberList.vue'
import debounce from '@/utils/debounce'
import { Dialog, Notify } from 'vant'
import ChatEditor from '@/views/synergy/chat/ChatEditor'
import eventBus from '@/utils/mitt'
import { saveAs } from 'file-saver'
import ContextMenu from '@/views/synergy/chat/ContextMenu'
import { formatDate } from '@/utils/time'
import ChatHistory from '@/views/synergy/chat/ChatHistory'

let debounceLoadMoreMessage
let clearReaderMessage

export default {
  directives: { clickoutside },
  components: {
    ChatHistory,
    ContextMenu,
    ChatEditor,
    memberList
  },
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
      recordList: [],
      value: '',
      interval: null,
      selectedGroupMember: 0,
      groupOwnerUid: '',
      timeout: null,
      chattingTarget: {},
      groupMember: [],
      currentAudio: '',
      loadedScrollTop: 0,
      beforeLoadedScrollTop: 0,
      noMorePullUpRecords: false, // 聊天数据是否已到顶
      noMorePullDownRecords: false, // 聊天数据是否已到底
      uList: [],
      recordPanel: false,
      showContextMenu: false,
      readMessageUsers: [], // 已读用户
      unReadMessageUsers: [] // 未读用户
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
          this.$store.state.groupAt = false
          const messageDraft = this.$store.state.messageDraft.find(item => {
            return item.groupId === val
          })
          clearReaderMessage = setInterval(() => {
            this.getReadMessage()
          }, 3000)
          debounceLoadMoreMessage = debounce(this.loadMoreRecordList, 100)
          if (messageDraft) this.$store.state.wordContent = messageDraft.message
          setTimeout(() => {
            this.$refs.talkContent.addEventListener('scroll', debounceLoadMoreMessage)
            this.$store.state.editor.focus(true)
          }, 100)
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
      senderName: (state) => state.userInfo.username,
      showChatHistory: (state) => state.showChatHistory
    }),
    relationId () {
      return this.$route.query.relationId * 1
    },
    chatContainerWidth () {
      return this.showChatHistory ? { width: `calc(100% - 360px)` } : { width: 'calc(100% - 122px)' }
    },
    allImages () {
      return this.recordList
        .filter(item => item.contentType === 2 || item.constructor === 6)
        .map(item => this.fileAddressFormatFunc(item.content))
    }
  },
  created () {
    if (this.relationId) {
      this.createPrivateChatting(this.relationId)
    }
  },
  mounted () {
    eventBus.on('handleMessage', this.handleMessage)
    eventBus.on('showChatHistoryPanel', this.showChatHistoryPanel)
    eventBus.on('sendWordMessage', this.sendWordMessage)
    this.$eventBus.$on('beat', this.beat)
    this.$eventBus.$on('quit', this.quitGroup)
    requestNotification()
  },
  beforeDestroy () {
    this.$refs.talkContent.removeEventListener(
      'scroll',
      debounceLoadMoreMessage
    )
  },
  destroyed () {
    this.isClose = true
    clearInterval(clearReaderMessage)
    if (Object.keys(this.socket).length > 0) this.socket.close()
    eventBus.off('handleMessage', this.handleMessage)
    eventBus.off('showChatHistoryPanel', this.showChatHistoryPanel)
    eventBus.off('sendWordMessage', this.sendWordMessage)
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

          recordList.forEach(item => {
            // 自己发送的消息添加已读用户列表
            if (item.data.senderId === this.uid) item.data.readMessageUsers = []
            if (item.data.contentType === 7 || item.data.contentType === 9) {
              try {
                item.data.content = JSON.parse(item.data.content)
              } catch (e) {
              }
            }
          })
          this.recordList = time(recordList)
          this.scrolltoButtom()

          if (this.notReadCount !== 0) {
            alreadyRead({
              lastRecordId: Math.max.apply(Math, this.recordList.map(item => +item.id)),
              groupId: this.groupId
            }).then(() => {
              getNewsList().then((res) => {
                this.$store.dispatch('newsList', res.newsList)
              })
            })
          }

          this.im()
          this.getReadMessage()
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
        this.socket.onmessage = (e) => {
          console.log('收到消息：聊天记录socket')
          this.receiveMessage(JSON.parse(e.data))
        }
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
    websocketclose () {
      if (this.isClose === false) {
        this.im()
      } else {
        clearInterval(this.interval)
      }
    },
    handleGroupAt (member) {
      this.$store.state.wordContent += `${member.username} `
      this.uList.push({ uid: member.uid })
      this.$store.state.groupAt = false
      setTimeout(() => {
        this.$store.state.editor.focus(true)
      }, 300)
    },
    setSelectUser (username) {
      this.$store.state.wordContent += username + ' '
      this.$nextTick(() => {
        this.$store.state.editor.focus(true)
      })
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
      let messageContent
      switch (message.data.contentType) {
        case 2:
        case 6:
          messageContent = '[ 图片 ]'
          break
        case 3:
          messageContent = '[ 录音 ]'
          break
        case 4:
          messageContent = '[ 视频 ]'
          break
        case 7:
          messageContent = ' 拍一拍 '
          break
        case 8:
          messageContent = ''
          break
        case 9:
          messageContent = '[ 文件 ]'
          break
        default:
          messageContent = message.data.content
      }
      if (messageContent === '') {
        // eslint-disable-next-line no-new
        // new Notification(message.data.username, {
        //   body: messageContent,
        //   icon: require('@/assets/logo.png')
        // })
      }
      const currentTime = new Date()
      const sendTime = currentTime.getHours() + ':' + currentTime.getMinutes()

      if (message.data.contentType === 7 || message.data.contentType === 9) {
        message.data.content = JSON.parse(message.data.content)
      }
      this.recordList.push({ ...message.data, sendTime })

      if (message.responseType === '666666') {
        // 服务器主动推送
        this.$store.dispatch('latestMessageId', message.data.id)
        let responseServer = Object.assign({}, message)
        responseServer.requestType = '555555'
        this.socketMessage(3, {}, responseServer)
      }
      // 处理撤回消息
      if (message.data.contentType === 8) {
        this.recordList.forEach(item => {
          if (item.id === message.data.id) {
            item.contentType = 8
          }
        })
      }
      alreadyRead({
        lastRecordId: Math.max.apply(Math, this.recordList.map(item => +item.id)),
        groupId: this.$store.state.groupId
      })
      this.$nextTick(() => {
        if (this.$refs.talkContent) {
          this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
        }
      })
    },
    inputChange (e) {
      this.$store.state.wordContent = e
      this.$store.state.groupAt = this.chattingTarget.type === 666 && e.endsWith('@')
    },
    // 发送文字消息
    sendWordMessage (text) {
      const msgUUID = uuid()
      const currentTime = new Date()
      const sendTime = currentTime.getHours() + ':' + currentTime.getMinutes()
      let _message = {
        contentType: 1,
        content: text,
        senderId: this.uid,
        sendTime,
        username: this.senderName,
        readMessageUsers: [],
        loading: true,
        msgUUID
      }
      this.recordList.push(_message)
      this.scrolltoButtom()
      sendMessage({
        groupId: this.groupId,
        senderId: this.uid,
        contentType: 1,
        content: text
      }).then((res) => {
        this.recordList.forEach(item => {
          if (item.msgUUID === msgUUID) {
            delete res.data.sendTime
            Object.keys(res.data).forEach(key => {
              item[key] = res.data[key]
              item.loading = false
            })
          }
        })
        this.handleDebounce(function () {
          getNewsList().then((res) => {
            this.$store.dispatch('newsList', res.newsList)
          })
        }, 1000)
        at({ groupId: this.groupId, imUrl: this.imurl, uList: this.uList }).then(() => {
          this.uList = []
        }).catch(() => {
          this.uList = []
        })
      }).catch((err) => {
        this.$createToast({
          time: 2000,
          txt: err.msg || '发送失败，请检查网络',
          type: 'error'
        }).show()
      })
    },
    // 防抖
    handleDebounce (func, wait) {
      let args = arguments
      let context = this
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    },
    // 获取聊天记录
    loadMoreRecordList () {
      if (this.$refs.talkContent == null) return
      if (this.$refs.talkContent.scrollTop === 0) {
        this.beforeLoadedScrollTop = this.$refs.talkContent.scrollHeight
        synergyRecordPage({ id: this.recordList[0].id, groupId: this.groupId }).then((res) => {
          const result = res.recordList
          if (result.length !== 0) {
            let recordList = result.reverse()
            recordList.forEach(item => {
              if (item.data.senderId === this.uid) item.data.readMessageUsers = []
              if (item.data.contentType === 7 || item.data.contentType === 9) {
                item.data.content = JSON.parse(item.data.content)
              }
            })
            let _recordList = time(recordList)
            this.recordList = _recordList.concat(this.recordList)
            this.getReadMessage()
            this.$nextTick(() => {
              this.loadedScrollTop = this.$refs.talkContent.scrollHeight
              this.$refs.talkContent.scrollTop =
                this.loadedScrollTop - this.beforeLoadedScrollTop
            })
          }
        })
      }
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
          this.$store.commit('currentConversation', {
            groupId: res.synergyGroup.id,
            relationType: res.synergyGroup.relationType
          })
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
      const msgUUID = uuid()
      let message = [
        {
          contentType,
          smallImg,
          content,
          sendTime,
          username: this.senderName,
          senderId: this.uid,
          readMessageUsers: [],
          loading: true,
          msgUUID
        }
      ]
      this.recordList = this.recordList.concat(message)
      this.scrolltoButtom()
      delete message.readMessageUsers
      if (contentType === 9) content = JSON.stringify(content)
      sendMessage({
        groupId: this.groupId,
        senderId: this.uid,
        contentType,
        content,
        smallImg
      }).then((res) => {
        this.recordList.forEach(item => {
          if (item.msgUUID === msgUUID) {
            delete res.data.sendTime
            delete res.data.content
            Object.keys(res.data).forEach(key => {
              item[key] = res.data[key]
              item.loading = false
            })
          }
        })
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
    },
    showChatHistoryPanel () {
      if (this.recordList.length > 0) {
        this.recordPanel = !this.recordPanel
        this.$nextTick(() => {
          this.recordPanel ? this.$refs.ChatHistory.openPanel() : this.$refs.ChatHistory.closePanel()
        })
      } else {
        Notify('没有消息')
      }
    },
    downloadFile (url, fileName) {
      Dialog.confirm({
        title: '文件下载',
        message: '确定要下载该文件吗'
      }).then(() => {
        saveAs(url, fileName)
        // const a = document.createElement('a')
        // a.href = url
        // a.download = fileName
        // a.click()
      })
    },
    fileIcon (fileName) {
      return loadFileIcon(fileName)
    },
    officeFile (fileName) {
      return isOffice(fileName)
    },
    openContextMenu (event, messageItem) {
      this.$refs.ContextMenu.openContextMenu(event, messageItem)
    },
    revocationMsg (res) {
      this.recordList.forEach(item => {
        if (item.id === res.data.id) {
          Object.keys(res.data).forEach(key => {
            item[key] = res.data[key]
          })
        }
      })
    },
    againEdit (msg) {
      this.$store.state.wordContent = msg.content
    },
    showAgainEdit (item) {
      let sendTime = item.sendTime
      if (item.sendTime.length <= 5) {
        sendTime = new Date(formatDate(Date.now(), 'YYYY-MM-DD') + item.sendTime)
      }
      return new Date(sendTime).getTime() + (5 * 60 * 1000) > Date.now()
    },
    // 获取已读消息用户记录
    getReadMessage () {
      getGroupMemberNewRecord({
        groupId: this.groupId
      }).then(res => {
        const msgIndex = this.recordList.length - 1
        res.memberNewRecordList.filter(item => item.uid !== this.uid).forEach(item => {
          for (let i = msgIndex; i >= 0; i--) {
            if (this.recordList[i].id === item.lastRecordId) {
              for (let j = 0; j <= i; j++) {
                if (this.recordList[j].senderId === this.uid) {
                  if (!this.recordList[j].readMessageUsers.includes(item.uid)) this.recordList[j].readMessageUsers.push(item.uid)
                }
              }
            }
          }
        })
      })
    },
    // 设置已读、未读用户
    setReadMessageUser (msg) {
      this.readMessageUsers = []
      this.unReadMessageUsers = []
      const groupMember = this.groupMember.filter(item => item.uid !== this.uid)
      for (let i = 0; i < groupMember.length; i++) {
        let flag = true
        for (let j = 0; j < msg.readMessageUsers.length; j++) {
          if (groupMember[i].uid === msg.readMessageUsers[j]) {
            this.readMessageUsers.push(groupMember[i])
            flag = false
          }
        }
        if (flag) {
          this.unReadMessageUsers.push(groupMember[i])
        }
      }
    },
    // 跳转到目标消息
    skipTargetMessage (item, messages) {
      messages.forEach(item => {
        if (item.senderId === this.uid) item.readMessageUsers = []
      })
      this.recordList = messages

      this.$nextTick(() => {
        if (messages.length <= 15) {
          const talkItems = document.getElementsByClassName('talk-item')
          for (let i = 0; i < talkItems.length; i++) {
            if (+item.id === +talkItems[i].dataset.id) {
              this.$refs.talkContent.scrollTo({
                top: talkItems[i].offsetTop - 67
              })
              break
            }
          }
        } else {
          this.$refs.talkContent.scrollTo({
            top: 2
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
@import url("./common.less");

.chat-panel {
  position: relative;
  height: 100%;
  background-color: #fff;

  .pull-refresh-loading {
    position: absolute;
    z-index: 100;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
  }
}

.member-list {
  position: absolute;
  bottom: 160px;
  left: 110px;
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

    .talk-content {
      width: 100%;
      font-size: 14px;
      height: calc(100% - 155px);
      background-color: #f2f3f5;
      overflow-y: auto;
      padding-bottom: 10px;
      box-sizing: border-box;

      .time-name {
        padding-top: 8px;

        .time {
          font-size: 12px;
          padding: 0 3px;
          color: #828c99;
        }
      }

      .word-message {
        background-color: #dee0e3;
        padding: 8px 10px 6px 10px;
        line-height: 1.5;
        border-radius: 6px;
        user-select: text;
        word-break: break-all;
        white-space: pre-line;
        display: inline-block;
        overflow: hidden;
      }

      /deep/ .el-image__inner {
        width: auto !important;
      }

      .audio-message {
        img {
          height: 30px;
          width: 30px;
          vertical-align: middle;
        }
      }

      .my-content {
        width: 100%;
        padding-right: 8px;
        box-sizing: border-box;

        .time-name {
          display: flex;
          justify-content: right;
          align-items: center;
        }

        .message {
          margin: 8px 0 8px 8px;
        }

        .message-container {
          justify-content: right;
          display: flex;
          align-items: center;

          .read-mark {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            border: 1px solid #0984e3;
            color: #0984e3;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 12px;

            &.all-read {
              border: 1px solid #7f8c8d;
              color: #7f8c8d;
            }
          }

          & > .message-content {
            max-width: 80%;

            & > .file-message-container {
              margin: 8px 0 8px 8px;
              display: flex;
              justify-content: right;
            }
          }
        }
      }

      .others-content {
        width: 100%;
        padding-left: 8px;
        box-sizing: border-box;

        .message {
          margin: 8px 0 8px 20px;
        }

        .time-name {
          display: flex;
          flex-direction: row-reverse;
          justify-content: left;
          align-items: center;
        }

        .message-container {
          display: flex;
          justify-content: left;
          align-items: center;

          & > .message-content {
            max-width: 80%;

            & > .file-message-container {
              margin: 8px 0 8px 20px;
              display: flex;
              justify-content: left;
            }
          }
        }

      }

      .sys-notifacation {
        text-align: center;
        margin: 8px 20px;

        .content {
          display: inline-block;
          line-height: 1.2;
          padding: 8px 10px 6px 10px;
          background-color: #e4e7eb;
          border-radius: 6px;
        }
      }
    }
  }

  .group-members {
    width: 121px;
    font-size: 12px;
    border-left: 1px solid #dadcdf;
    border-bottom: 1px solid #dadcdf;

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

  .chat-history {
    width: 300px;
    height: 100%;
  }
}

.file-message {
  width: 250px;
  margin-top: 4px;
  padding: 12px 10px;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  position: relative;

  & > .file-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > .name {
      width: 100%;
      display: flex;
      align-items: center;
      // 文字超出换行
      word-wrap: break-word;
      word-break: break-all;
      overflow: hidden;
    }

    & > .size {
      color: #636e72;
      margin-top: 8px;
      display: flex;
      align-items: center;
    }
  }

  & > .file-icon {
    margin: 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > .file-operate {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: space-around;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;

    & > .file-download, .file-preview {
      cursor: pointer;

      svg {
        fill: #fff;

        &:hover {
          fill: #3498db;
        }
      }
    }
  }

  &:hover {
    & > .file-operate {
      opacity: 1;
    }
  }
}

.text-blue {
  color: #0984e3;
  cursor: pointer;
}

.user-list {
  height: 300px;
  padding: 8px;
  overflow: auto;

  & > li {
    width: 100%;
    height: 48px;
    padding: 8px 12px;
    box-sizing: border-box;
    border-radius: 6px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: #edeeef;
    }
  }
}

.my-content {

  /deep/ .el-image {
    display: flex;
    justify-content: right;
  }
}

.read-popover {
  /deep/ .van-tab--active > .van-tab__text {
    color: #0984e3;
  }

  /deep/ .van-tabs__line {
    transform: translateX(100px) translateX(-50%);
  }
}
</style>
