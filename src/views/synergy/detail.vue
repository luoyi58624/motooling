<template>
  <div>
    <div class="member-list-wrap" v-if="isEnable">
      <div class="member-list">
        <template v-for="item in resMemberList">
          <img
            :src="item.avatar ? item.avatar : require('@/assets/person.png')"
            :key="item.id"
          />
        </template>
      </div>
      <div @click="selectUser()">
        <img src="../../assets/icon-add.png" />
      </div>
    </div>
    <scroll
      :data="watchData"
      class="talk-contents"
      :class="{ active: moreBtnStatus }"
      ref="scroll"
      :pulldown="true"
      @pulldown="pulldown"
      listenScroll
    >
      <div class="scroll-content">
        <div
          class="talk-space"
          :class="uid != item.data.senderId ? 'user-talk' : 'self-talk'"
          v-for="item in recordList"
          :key="item.id"
        >
          <div
            class="talk-user-avatar"
            :style="'background-image: url(' + item.data.avatar + ')'"
          ></div>
          <div
            class="talk-info"
            v-if="
              item.data.contentType === 1 ||
                item.data.contentType === 2 ||
                item.data.contentType === 3 ||
                item.data.contentType === 4 ||
                item.data.contentType === 6
            "
          >
            <div class="talk-user-name" v-if="uid != item.data.senderId">
              {{ item.data.username }}
            </div>
            <div
              class="talk-content talk-word-content"
              v-if="item.data.contentType === 1"
            >
              {{ item.data.content }}
            </div>
            <div
              class="talk-content"
              v-if="item.data.contentType === 2"
              @click="
                showImagePreview(fileAddressFormatFunc(item.data.content))
              "
            >
              <img :src="fileAddressFormatFunc(item.data.smallImg)" />
            </div>
            <div
              class="talk-content"
              v-if="item.data.contentType == 6"
              @click="
                showImagePreview(fileAddressFormatFunc(item.data.content))
              "
            >
              <img :src="fileAddressFormatFunc(item.data.content)" />
            </div>
            <div
              class="talk-content"
              v-if="item.data.contentType === 3"
              @click="playAudio(fileAddressFormatFunc(item.data.content))"
            >
              <!-- <audio :src="item.data.content" controls></audio> -->
              <div class="talk-audio-content">{{ item.data.duration }}"</div>
            </div>
            <div class="talk-content" v-if="item.data.contentType === 4">
              <video
                preload="meta"
                :src="fileAddressFormatFunc(item.data.content)"
                controls="controls"
                @click="playVideo($event)"
              ></video>
            </div>
            <div
              class="talk-content talk-word-content"
              v-if="item.data.contentType === 5"
            >
              {{ item.data.content }}
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <audio :src="currentAudioSrc" ref="audio"></audio>

    <div class="footer" ref="footer" v-if="isEnable">
      <form class="talker" @submit="submitWord">
        <div class="talker-icon-btn" @click="isVoice = !isVoice">
          <div class="talker-icon-btn">
            <div class="icon icon-voice-right"></div>
          </div>
        </div>
        <div class="talker-input-wrapper" v-if="!isVoice">
          <input
            class="talker-input"
            type="text"
            placeholder="?????????"
            v-model="content"
            @focus="focus"
            @blur="blur"
          />
        </div>
        <div class="talker-input-wrapper" v-if="isVoice">
          <button
            type="button"
            class="rec-btn"
            @touchstart="startRecorder"
            @touchend="stopRecorder"
          >
            ????????????
          </button>
          <!-- <button type="button" @click="stopRecorder">??????</button> -->
        </div>
        <div class="input-toggle-button talker-icon-btn">
          <div class="icon icon-add" @click="showMoreBtn"></div>
        </div>
        <div class="talker-action">
          <button type="submit" class="talker-send" @click="submitWord">
            ??????
          </button>
        </div>
      </form>
      <transition name="slide-fade">
        <div class="talker-toolbar" v-show="moreBtnStatus">
          <label class="list-item" for="uploadImageField">
            <div class="item-icon">
              <div class="icon icon-camera"></div>
            </div>
            <div class="center item-text">??????</div>
          </label>
          <input
            type="file"
            id="uploadImageField"
            multiple
            hidden
            accept="audio/mpeg,video/mp4,image/*"
            capture="environment"
            @change="uploadImage"
          />
           <label class="list-item" for="uploadImageField">
            <div class="item-icon">
              <div class="icon icon-album"></div>
            </div>
            <div class="center item-text">??????</div>
          </label>
          <div class="list-item">
            <router-link
              :to="
                '/synergy/summary/new/' + this.synergyGroup.id + '/' + newestId
              "
            >
              <div class="item-icon">
                <div class="icon icon-record"></div>
              </div>
              <div class="center item-text">??????</div>
            </router-link>
          </div>
          <div class="list-item">
            <router-link to="/synergy/summary/list">
              <div class="item-icon">
                <div class="icon icon-record"></div>
              </div>
              <div class="center item-text">??????</div>
            </router-link>
          </div>
        </div>
      </transition>
    </div>
    <div v-show="show">
      <UserSelect :visible.sync="show" @confirm="confirm" @cancel="cancel" />
    </div>
  </div>
</template>
<script>
import { fileAddressFormat } from '@/utils/utils.js'
import {
  getOpenSynergy,
  synergyRecordPage,
  synergyAddMember
} from '@/api/synergy/synergy.js'
import { getUploadWechatFile } from '@/api/wechat.js'
import { imgUpload, fileUpload } from '@/api/upload/upload.js'
import { getUser } from '@/api/Person/User.js'
import wx from 'weixin-js-sdk'
// import { BetterScroll } from 'cube-ui'
import scroll from '@/components/BScroll.vue'
import UserSelect from '@/components/OldUserSelect.vue'
import shortid from 'shortid'

export default {
  components: {
    scroll,
    UserSelect
  },
  data () {
    return {
      isEnable: true, // ???????????????
      isVoice: false,
      isClose: false,
      socket: {},
      imurl: '',
      uid: localStorage.uid - 0,
      username: '',
      avatar: localStorage.avatar,
      // ????????????
      relationType: '1',
      // ??????id
      relationId: '1001',
      // ??????id
      companyId: localStorage.companyId,
      // ?????????????????????
      content: '',
      recordList: [
        {
          data: { id: 0 }
        }
      ],
      resMemberList: [],
      synergyGroup: {},
      contentType: {
        word: 1
      },
      // ???????????????????????????????????????id
      oldestId: 0,
      // newestId: 0,
      moreBtnStatus: false,
      /* eslint-disable no-undef */
      rec: Recorder({ type: 'mp3' }),
      currentAudioSrc: '',
      startTimestamp: 0, // ????????????????????????
      show: false
    }
  },
  computed: {
    newestId () {
      if (this.recordList && this.recordList.length > 0) {
        return this.recordList[this.recordList.length - 1].data.id
      }
      return 0
    },

    watchData () {
      return [...this.recordList, this.moreBtnStatus]
    }
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        this.$refs.scroll.refresh()
        console.log('resize')
      })()
    }
    setTimeout(() => {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.$refs.scroll.scroll.maxScrollY)
    }, 1000)
  },
  destroyed () {
    this.isClose = true
    this.socket.close()
  },
  methods: {
    confirm () {
      this.show = false
      this.addSynergyAddMember()
    },
    cancel () {
      this.show = false
    },

    selectUser () {
      this.$store.commit('changeUserSelectedList', this.resMemberList)
      this.show = true
    },
    focus () {
      // ????????????????????????
      this.moreBtnStatus = false
      setTimeout(() => {
        console.log(123)
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0, this.$refs.scroll.scroll.maxScrollY)
      }, 300)
    },
    blur () {
      // ?????????????????????
      setTimeout(() => {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0, this.$refs.scroll.scroll.maxScrollY)
      }, 300)
    },
    fileAddressFormatFunc (url) {
      return fileAddressFormat(url)
    },
    // ??????????????????
    getUserInfo () {
      getUser({ uid: this.uid })
        .then(res => {
          if (res.data.code === '000000') {
            this.username = res.data.data.userInfo.username
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    startRecorder () {
      var self = this
      var ua = navigator.userAgent.toLowerCase() // ??????????????????????????????
      var isWinxin = ua.indexOf('micromessenger') !== -1
      if (isWinxin) {
        // ??????????????????
        wx.startRecord()
        this.startTimestamp = new Date().getTime()
        self.showLoading('?????????...')
      } else {
        // ?????????????????????
        this.rec.open(
          function () {
            // ???????????????????????????????????????
            self.rec.start() // ????????????
            self.showLoading('?????????...')
          },
          function (msg, isUserNotAllow) {
            // ?????????????????????????????????
            self
              .$createToast({
                time: 2000,
                txt:
                  (isUserNotAllow ? 'UserNotAllow???' : '') + '????????????:' + msg,
                type: 'warn'
              })
              .show()
          }
        )
      }
    },
    async wxupload (mediaId) {
      // ????????????????????????
      try {
        const res = getUploadWechatFile({ mediaId })
        return res
      } catch (err) {
        throw err
      }
    },
    stopRecorder () {
      var self = this
      this.hideLoading()
      var ua = navigator.userAgent.toLowerCase() // ??????????????????????????????
      var isWinxin = ua.indexOf('micromessenger') !== -1
      if (isWinxin) {
        // ??????????????????
        var duration = new Date().getTime() - this.startTimestamp // ???????????????
        wx.stopRecord({
          success: function (res) {
            var localId = res.localId
            if (duration > 1000) {
              wx.uploadVoice({
                localId: localId, // ??????????????????????????????ID??????stopRecord????????????
                isShowProgressTips: 1, // ?????????1?????????????????????
                success: function (res) {
                  var serverId = res.serverId // ???????????????????????????ID
                  self.wxupload(serverId).then(res => {
                  // alert('???????????????res???' + JSON.stringify(res))
                    self.sendMessage(2, {
                      contentType: 3,
                      content: res.fileUrl,
                      duration: parseInt(duration / 1000)
                    })
                  }).catch(err => {
                    self.showToast(err.msg)
                  })
                },
                fail: function (res) {
                  selft.showToast('??????????????????')
                }
              })
            } else {
              self
                .$createToast({
                  time: 2000,
                  txt: '??????????????????',
                  type: 'warn'
                })
                .show()
            }
          }
        })
      } else {
        this.rec.stop(
          function (blob, duration) {
            // ??????????????????????????????
            console.log(URL.createObjectURL(blob), '??????:' + duration + 'ms')
            self.rec.close() // ??????????????????
            // ????????????blob??????????????????????????????????????????????????????
            if (duration > 1000) {
              fileUpload(blob, 'rec.mp3')
                .then(res => {
                  console.log(res)
                  self.sendMessage(2, {
                    contentType: 3,
                    content: res.url,
                    duration: parseInt(duration / 1000)
                  })
                })
                .catch(err => {
                  console.log(err)
                })
            } else {
              self
                .$createToast({
                  time: 2000,
                  txt: '??????????????????',
                  type: 'warn'
                })
                .show()
            }
          },
          function (msg) {
            self.hideLoading()
            self.$createDialog({
              type: 'alert',
              title: '????????????',
              content: msg,
              icon: 'cubeic-alert'
            }).show()
          }
        )
      }
    },
    uploadRecorder () {
      fileUpload()
    },
    playAudio (src) {
      this.$refs.audio.src = src
      this.$refs.audio.play()
    },
    playVideo (event) {
      console.log(event)
      if (event.target.paused) {
        event.target.play()
      } else {
        event.target.pause()
      }
    },
    // ???????????????
    addSynergyAddMember () {
      synergyAddMember({
        groupId: this.synergyGroup.id,
        inviterId: this.uid,
        companyId: this.companyId,
        companyName: this.companyName,
        uList: this.$store.state.userSelectedList.map(function (item) {
          return { uid: item.uid }
        })
      })
        .then(res => {
          this.resMemberList = res.existList.concat(res.successList)
          this.$createToast({
            time: 2000,
            txt: '?????????????????????',
            type: 'correct'
          }).show()
        })
        .catch(err => {
          console.log(err)
          this.$createToast({
            time: 2000,
            txt: err.msg,
            type: 'error'
          }).show()
        })
    },
    addUser (type, name) {
      console.log(2111)
      this.$router.push({
        path: '/instore/setting/select',
        query: {
          type,
          name
        }
      })
    },
    init () {
      getOpenSynergy({
        relationType: this.relationType,
        relationId: this.relationId,
        groupId: this.groupId
      })
        .then(res => {
          this.synergyGroup = res.synergyGroup
          this.resMemberList = res.memberList

          this.recordList = res.recordList.reverse()
          if (this.recordList.length > 0) {
            this.oldestId = this.recordList[0].data.id
          }
          // ??????????????????
          this.im()
          this.$store.commit(
            'changeSynergyMemberList',
            this.resMemberList || []
          )
        })
        .catch(err => {
          this.isEnable = false
          this.$createToast({
            time: 0,
            txt: err.msg || '????????????????????????????????????',
            type: 'warn'
          }).show()
        })
    },
    // ????????????
    pulldown () {
      this.getRecordPage(this.oldestId)
    },
    // ????????????????????????
    getRecordPage (id) {
      synergyRecordPage({
        pageSize: 10,
        id: id,
        groupId: this.synergyGroup.id
      })
        .then(res => {
          if (res.recordList.length !== 0) {
            this.$refs.scroll.refresh()
            var oldHeight = this.$refs.scroll.scroll.maxScrollY
            this.recordList = res.recordList.reverse().concat(this.recordList)
            this.oldestId = res.recordList[0].data.id
            setTimeout(() => {
              this.$refs.scroll.refresh()
              var newHeight = this.$refs.scroll.scroll.maxScrollY
              this.$refs.scroll.scrollTo(0, newHeight - oldHeight, 0)
              this.$refs.scroll.refresh()
            }, 0)
          } else {
            this.$createToast({
              time: 2000,
              txt: '?????????????????????',
              type: 'warn'
            }).show()
          }
        })
        .catch(err => {
          this.$createToast({
            time: 2000,
            txt: err.msg,
            type: 'warn'
          }).show()
        })
    },
    uploadImage (e) {
      let files = e.target.files
      for (let i = 0; i < files.length; i++) {
        if (/image*/.test(files[i].type)) {
          console.log('image')
          imgUpload(files[i])
            .then(res => {
              console.log(res)
              this.sendMessage(2, {
                contentType: 2,
                content: res.rawImgUrl,
                smallImg: res.imgUrl
              })
            })
            .catch(err => {
              this.$createToast({
                time: 2000,
                txt: err.message,
                type: 'warn'
              }).show()
            })
        } else if (/audio*/.test(files[i].type)) {
          fileUpload(files[i])
            .then(res => {
              console.log(res)
              this.sendMessage(2, {
                contentType: 3,
                content: res.fileUrl
              })
            })
            .catch(err => {
              this.$createToast({
                time: 2000,
                txt: err.message,
                type: 'warn'
              }).show()
            })
        } else if (/video*/.test(files[i].type)) {
          fileUpload(files[i])
            .then(res => {
              console.log(res)
              this.sendMessage(2, {
                contentType: 4,
                content: res.fileUrl
              })
            })
            .catch(err => {
              this.$createToast({
                time: 2000,
                txt: err.message,
                type: 'warn'
              }).show()
            })
        } else {
          fileUpload(files[i])
            .then(res => {
              console.log(res)
              this.sendMessage(2, {
                contentType: 1,
                content: res.fileUrl
              })
            })
            .catch(err => {
              this.$createToast({
                time: 2000,
                txt: err.message,
                type: 'warn'
              }).show()
            })
        }
      }
    },
    im () {
      console.log(this.imurl)
      let prefix = location.protocol === 'https:' ? 'wss://' : 'ws://'
      if (
        this.isClose === false &&
        (Object.keys(this.socket).length === 0 ||
          (this.socket && this.socket.readyState === 3))
      ) {
        if (this.imurl.indexOf('ws') !== -1) {
          this.socket = new WebSocket(
            this.imurl
          )
        } else {
          this.socket = new WebSocket(
            prefix + this.imurl +
              '/mtwebsocket/' +
              // 'ws://192.168.2.180:8070/mtwebsocket/' +
              this.companyId +
              '/' +
              this.synergyGroup.id +
              '/' +
              sessionStorage.token +
              '/' +
              localStorage.WEBURL.split('//')[1]
            // this.imurl
          )
        }
        this.socket.onopen = this.websocketonopen
        this.socket.onerror = this.websocketonerror
        this.socket.onmessage = this.websocketonmessage
        this.socket.onclose = this.websocketclose
      }
    },
    websocketonopen () {
      let that = this
      let heartCheck = {
        timeout: 30000,
        timeoutObj: null,
        reset: function () {
          clearInterval(this.timeoutObj)
          return this
        },
        start: function () {
          this.timeoutObj = setInterval(function () {
            that.sendMessage(1)
            console.log('ping')
          }, this.timeout)
        }
      }
      heartCheck.reset().start()
      this.hideLoading()
    },
    websocketonerror () {
      console.error('websocketonerror')
    },
    websocketonmessage (e) {
      console.log('websocketonmessage')
      this.receiveMessage(JSON.parse(e.data))
    },
    websocketclose () {
      console.log('websocketclose')
      if (this.isClose === false) {
        this.showLoading('??????????????????...')
        this.im()
      } else {
        console.log(22221)
        this.websocketonopen.heartCheck.reset()
      }
    },
    sendMessage (type, { contentType, content, smallImg, duration } = {}, data) {
      // ??????id ??????
      var sid = shortid.generate()
      var message = {
        requestType: 'h5',
        serialNumber: 'h5' + sid,

        data: {
          groupId: this.synergyGroup.id,
          senderId: this.uid
        }
      }
      // ping??????
      if (type === 1) {
        message = {
          requestType: 'ping',
          serialNumber: null,
          data: {}
        }
      } else if (type === 2) {
        // ????????????
        message.data.contentType = contentType
        // ??????
        if (content) {
          message.data.content = content
        }
        // ??????
        if (smallImg) {
          message.data.smallImg = smallImg
        }
        // ????????????
        if (duration) {
          message.data.duration = duration
        }
      } else if (type === 3) {
        // ????????????
        message = data
      } else {
      }
      if (this.socket.readyState === 1) {
        console.log(message)
        this.socket.send(JSON.stringify(message))
      } else {
        this.im()
      }
    },
    receiveMessage (msg) {
      console.log(msg)
      // ?????????????????????
      if (msg.data.senderId !== this.uid) {
        if (msg.responseType === '666666') {
          console.log(666666)
          this.recordList.push({ data: msg.data })
          var sendMsg = Object.assign({}, msg)
          sendMsg.requestType = '555555'
          this.sendMessage(3, {}, sendMsg)
        }
      } else {
        this.recordList.push({
          data: Object.assign(
            {
              avatar: this.avatar,
              username: this.username
            },
            msg.data
          )
        })
      }
      this.$refs.scroll.refresh()
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, this.$refs.scroll.scroll.maxScrollY)
      }, 100)
    },
    submitWord (e) {
      e.preventDefault()
      if (this.content.trim() !== '') {
        this.sendMessage(2, {
          contentType: 1,
          content: this.content
          // contentType: 2,
          // smallImg:,
          // duration:3,
        })

        // this.recordList.push({
        // data: {
        //   groupId: this.synergyGroup.id,
        //   senderId: this.uid,
        //   contentType: 1,
        //   content: this.content,
        //   avatar: this.avatar,
        //   username: this.username
        // }
        // })
        this.content = ''
      } else {
        this.$createToast({
          time: 2000,
          txt: '???????????????????????????',
          type: 'error'
        }).show()
      }
    },
    showMoreBtn () {
      this.moreBtnStatus = !this.moreBtnStatus
    },

    // ????????????
    showImagePreview (url) {
      this.$createImagePreview({
        imgs: [url]
      }).show()
    }
  },
  created () {
    var self = this
    this.relationId = this.$route.params.id || this.$route.query.relationId
    this.relationType = this.$route.params.typeid || this.$route.query.relationType
    this.groupId = this.$route.query.groupId
    this.imurl = localStorage.imurl
    if (this.relationType === '66' || this.relationType === '666') {
      this.isEnable = false
      this.$createToast({
        time: 0,
        txt: '?????????????????????????????????',
        type: 'warn'
      }).show()
    } else {
      this.init()
      this.getUserInfo()
    }
    wx.ready(() => {
      wx.onVoiceRecordEnd({
        complete: function (res) {
          console.log('???60???????????????????????????')
          self.hideLoading()
          var localId = res.localId
          wx.uploadVoice({
            localId: localId, // ??????????????????????????????ID??????stopRecord????????????
            isShowProgressTips: 1, // ?????????1?????????????????????
            success: function (res) {
              var serverId = res.serverId // ???????????????????????????ID
              self.wxupload(serverId).then(res => {
                self.sendMessage(2, {
                  contentType: 3,
                  content: res.fileUrl,
                  duration: 60
                })
              }).catch(err => {
                self.showToast(err.msg || '?????????????????????')
              })
            }
          })
        }
      })
    })
  },
  watch: {
    moreBtnStatus () {
      setTimeout(() => {
        this.$refs.scroll.refresh()
        this.$refs.scroll.scrollTo(0, this.$refs.scroll.scroll.maxScrollY)
      }, 300)
    }
  }
}
</script>
<style lang="less" scoped>
.scroll-content {
  min-height: 101%;
}
input {
  width: 100%;
  outline: none;
}
.center {
  text-align: center;
}
.member-list-wrap {
  padding: 8px 30px; /* no*/
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  justify-content: center;
  font-size: 0;
  background: #fff;
  img {
    width: 30px; /* no*/
    height: 30px; /* no*/
    margin: 0 4px; /* no*/
    object-fit: cover;
  }
}

.member-list {
  text-align: center;
  background: #fff;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
  align-self: center;
}
.talk-contents {
  position: fixed;
  top: 46px; /* no*/
  left: 0;
  bottom: 44px; /* no*/
  right: 0;
  background: #eaeaea;
}
.talk-contents.active {
  bottom: 157px; /* no*/
}
.talk-contents .talk-space {
  display: flex;
  padding: 10px; /* no */
}
.talk-contents .talk-space .talk-user-avatar {
  height: 40px; /* no */
  width: 40px; /* no */
  border-radius: 6px; /* no */
  flex-shrink: 0;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.talk-contents .talk-space .talk-user-name {
  font-size: 14px; /* no */
  line-height: 1.2;
  padding: 0 0 2px; /* no */
}
.talk-contents .talk-space .talk-info {
  position: relative;
  padding: 0 6px; /* no*/
  width: 100%;
  font-size: 0;
}
.talk-contents .talk-space .talk-content {
  background: #fff;
  display: inline-block;
  padding: 6px 8px; /* no */
  border-radius: 6px; /* no */
  font-size: 16px; /* no */
}
.talk-contents .talk-space .talk-content img {
  object-fit: contain;
  height: 100px; /* no */
  max-width: 100%;
}
.talk-contents .talk-space .talk-content video {
  object-fit: contain;
  height: 140px; /* no */
  max-width: 100%;
}
.talk-contents .talk-space .talk-word-content {
  text-align: left;
  word-break: break-all;
}
.talk-contents .talk-space .talk-voice-content {
  height: 26px;
}
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: #ffffff;
}
.footer a {
  display: block;
  color: #2a2a2a;
}
.talker {
  display: flex;
  padding: 4px 0; /* no */
  align-items: center;
  font-size: 16px; /* no */
  button {
    background-color: #fff;
    border: 1px solid #ccc; /* no */
    border-radius: 4px; /* no */
    padding: 8px; /* no */
  }
}
.talker-input-wrapper {
  flex: 1;
  padding: 0 6px; /* no */
}
.talker-input {
  box-sizing: border-box;
  border: none;
  padding: 6px 8px; /* no */
  border-radius: 6px; /* no */
  background-color: #ebebeb;
}
.talker-icon-btn {
  flex: 0 0 40px; /*no*/
}
.talker .icon {
  height: 30px; /* no */
}

.icon {
  flex: 1;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.icon-full-width {
  width: 100%;
  height: 100%;
}
.icon-small {
  width: 16px;
  height: 16px;
}
.icon-voice-left {
  background-image: url("../../assets/icon-voice-left.png");
}
.icon-voice-right {
  background-image: url("../../assets/icon-voice-right.png");
}
.icon-add {
  background-image: url("../../assets/icon-add.png");
}
.icon-edit {
  background-image: url("../../assets/icon-edit.png");
}
.icon-camera {
  background-image: url("../../assets/icon-camera.png");
}
.icon-album {
  background-image: url("../../assets/icon-album.png");
}
.icon-record {
  background-image: url("../../assets/icon-record.png");
}
.talker-action {
  flex: 0;
  padding: 0 4px;
  white-space: nowrap;
}
.talker-send {
  color: #333;
  padding: 4px 6px;
  font-size: 18px; /* no */
}
.self-talk {
  flex-direction: row-reverse;
  text-align: right;
}
.talker-toolbar {
  padding: 10px 0; /* no */
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.talker-toolbar .list-item {
  /* height: 90px; */
  box-sizing: border-box;
  width: 93.75px; /* no */
  height: 93.75px; /* no */
  padding: 10px; /* no */
}
.talker-toolbar .item-icon {
  display: flex;
  height: 53.75px; /* no */
  padding: 10px; /* no */
  border-radius: 6px; /* no */
  background-color: #e6e6e6;
}
.talker-toolbar .item-text {
  font-size: 14px; /* no */
  line-height: 1.5;
}
.rec-btn {
  padding: 6px 8px;
  // height:22px;
  text-align: center;
  border: 1px solid;
  width: 100%;
}
.member-avatar-wrapper {
  width: 20px;
  display: inline-block;
}
.member-avatar-wrapper .member-avatar {
  display: inline-block;
  height: 30px;
  width: 30px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.slide-fade-enter-active {
  transition: all 0.3s;
}
.slide-fade-leave-active {
  transition: all 0.3s;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(100%);
}
</style>
