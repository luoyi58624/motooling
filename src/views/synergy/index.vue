<template>
  <div>
    <div class="member-list-wrap">
      <div class="member-list">
        <template v-for="item in memberList">
          <img :src="item.avatar" :key="item.id" />
          <!-- <div>{{item.nickname}}</div> -->
        </template>
      </div>
      <div class="add"><img src="../../assets/icon-add.png" alt="" /></div>
    </div>
    <scroll
      class="talk-contents"
      ref="scroll"
      :pulldown="true"
      @pulldown="pulldown"
      listenScroll
    >
      <div>
        <div
          class="talk-space"
          :class="uid != item.data.senderId?'user-talk':'self-talk'"
          v-for="item in recordList"
          :key="item.id"
        >
          <div
            class="talk-user-avatar"
            :style="'background-image: url('+item.data.avatar+')'"
          ></div>
          <div
            class="talk-info"
            v-if="item.data.contentType===1||item.data.contentType===2||item.data.contentType===3||item.data.contentType===4"
          >
            <div class="talk-user-name">
              {{ item.data.nickname }}
            </div>
            <div
              class="talk-content talk-word-content"
              v-if="item.data.contentType===1"
            >
              {{ item.data.content }}
            </div>
            <div class="talk-content" v-if="item.data.contentType===2">
              <img :src="item.data.content" />
            </div>
            <div class="talk-content" v-if="item.data.contentType===3">
              <audio :src="item.data.content" controls="controls"></audio>
            </div>
            <div class="talk-content" v-if="item.data.contentType===4">
              <video :src="item.data.content" controls="controls"></video>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="footer" ref="footer">
      <form class="talker" @submit="submitWord">
        <div class="input-toggle-button talker-icon-btn">
          <div class="icon icon-add" @click="showMoreBtn"></div>
        </div>
        <div class="talker-input-wrapper">
          <input
            class="talker-input"
            type="text"
            placeholder="请输入"
            v-model="content"
          />
        </div>
        <div class="talker-icon-btn">
          <div class="icon icon-voice-left"></div>
        </div>
        <div class="talker-action">
          <div class="talker-send" @click="submitWord">发送</div>
        </div>
      </form>
      <div class="talker-toolbar" v-show="moreBtnStatus">
        <div class="list-item">
          <div class="item-icon">
            <div class="icon icon-camera"></div>
          </div>
          <div class="center item-text">图片</div>
        </div>
        <div class="list-item">
          <router-link to="/synergy/summary/list">
            <div class="item-icon">
              <div class="icon icon-record"></div>
            </div>
            <div class="center item-text">纪要</div>
          </router-link>
        </div>
        <div class="list-item">
          <router-link :to="'/synergy/summary/new/'+this.synergyGroup.id+'/'+newestId">
            <div class="item-icon">
              <div class="icon icon-record"></div>
            </div>
            <div class="center item-text">生成纪要</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getOpenSynergy, synergyRecordPage } from '@/api/synergy/synergy.js'
import { getUser } from '@/api/Person/User.js'
// import { BetterScroll } from 'cube-ui'
import scroll from '@/components/BScroll.vue'
import shortid from 'shortid'

export default {
  components: {
    scroll
  },
  data () {
    return {
      socket: {},
      uid: localStorage.uid - 0,
      username: '',
      avatar: localStorage.avatar,
      // 关联类型
      relationType: '1',
      // 关联id
      relationId: '1001',
      // 公司id
      companyId: 1,
      // 输入的文字内容
      content: '',
      recordList: [{
        data: { id: 0 }
      }],
      memberList: [],
      synergyGroup: {},
      contentType: {
        word: 1
      },
      // 用于下拉翻页获取消息，请求id
      oldestId: 0,
      moreBtnStatus: false
    }
  },
  computed: {
    newestId () {
      return this.recordList[this.recordList.length - 1].data.id
    }
  },
  mounted () {
    setTimeout(() => {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.$refs.scroll.scroll.maxScrollY)
    }, 1000)
  },
  destroyed () {
    this.socket.close()
  },
  methods: {
    // 获取用户信息
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
    init () {
      getOpenSynergy({
        relationType: this.relationType,
        relationId: this.relationId
      })
        .then(res => {
          this.synergyGroup = res.synergyGroup
          this.memberList = res.memberList
          this.recordList = res.recordList.reverse()
          if (this.recordList.length > 0) {
            this.oldestId = this.recordList[0].data.id
          }
          // 开启群聊通信
          this.im()
        })
        .catch(err => {
          console.log(err)
        })
    },
    show () {
      console.log(this.socket.readyState)
    },
    // 下拉加载
    pulldown () {
      this.getRecordPage(this.oldestId)
    },
    // 获取群聊分页记录
    getRecordPage (id) {
      synergyRecordPage({
        pageSize: 10,
        id: id,
        groupId: this.synergyGroup.id
      }).then(res => {
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
            txt: '没有更多记录啦',
            type: 'warn'
          }).show()
        }
      })
    },
    im () {
      console.log(12222)
      this.socket = new WebSocket(
        'ws://im.motooling.com/mtwebsocket/' +
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
    },
    websocketonopen () {
      this.socket.send('Hello')
    },
    websocketonerror () {
      console.error('websocketonerror')
      this.$createToast({
        time: 2000,
        txt: '网络正在重连',
        type: 'loading'
      }).show()
      this.im()
    },
    websocketonmessage (e) {
      console.log('websocketonmessage')
      this.receiveMessage(JSON.parse(e.data))
    },
    websocketclose () {
      console.log('websocketclose')
    },
    sendMessage ({ contentType, content, smallImg, duration }) {
      var message = {
        requestType: 'h5',
        serialNumber: shortid.generate(),
        // msg: message,
        data: {
          groupId: this.synergyGroup.id,
          senderId: this.uid,
          contentType: contentType
        }
      }
      // 内容
      if (content) {
        message.data.content = content
      }
      // 小图
      if (smallImg) {
        message.data.smallImg = smallImg
      }
      // 语音时长
      if (duration) {
        message.data.duration = duration
      }
      console.log(this.socket)
      this.socket.send(JSON.stringify(message))
    },
    receiveMessage (msg) {
      if (msg.data.senderId !== this.uid) {
        this.recordList.push({ data: msg.data })
      }
    },

    submitWord (e) {
      e.preventDefault()
      if (this.content.trim() !== '') {
        this.sendMessage({
          contentType: 1,
          content: this.content
          // contentType: 2,
          // smallImg:,
          // duration:3,
        })

        this.recordList.push({
          data: {
            groupId: this.synergyGroup.id,
            senderId: this.uid,
            contentType: 1,
            content: this.content,
            avatar: this.avatar,
            nickname: this.username
          }
        })
        this.content = ''
      } else {
        this.$createToast({
          time: 2000,
          txt: '请输入要发送的内容',
          type: 'error'
        }).show()
      }
      this.$refs.scroll.refresh()
      setTimeout(() => {
        this.$refs.scroll.scrollTo(0, this.$refs.scroll.scroll.maxScrollY)
      }, 100)
    },
    showMoreBtn () {
      this.moreBtnStatus = !this.moreBtnStatus
    }
  },
  created () {
    this.init()
    this.getUserInfo()
  }
}
</script>
<style lang="less" scoped>
  input {
    width: 100%;
    outline: none;
  }
  .center {
    text-align: center;
  }
  .member-list-wrap {
    padding: 5px 30px;

    display: flex;
    justify-content: center;
    img {
      width: 30px;
      height: 30px;
      margin: 0 4px;
    }
  }

  .member-list {
    text-align: center;
    background: #fff;
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
  }
  .talk-contents {
    position: fixed;
    top: 45px;
    left: 0;
    bottom: 48px;
    right: 0;
    background: #eaeaea;
  }
  .talk-contents .talk-space {
    display: flex;
    padding: 10px;
  }
  .talk-contents .talk-space .talk-user-avatar {
    height: 40px;
    width: 40px;
    border-radius: 6px;
    flex-shrink: 0;
  }
  .talk-contents .talk-space .talk-user-name {
    font-size: 14px;
    line-height: 1.5;
    padding: 0 0 2px;
  }
  .talk-contents .talk-space .talk-info {
    position: relative;
    padding: 0 6px;
    width: 100%;
  }
  .talk-contents .talk-space .talk-content {
    background: #fff;
    display: inline-block;
    padding: 6px 8px;
    border-radius: 6px;
    font-size: 16px;
  }
  .talk-contents .talk-space .talk-content img {
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
    color: #2a2a2a;
  }
  .talker {
    border: 1px solid #ccc;
    display: flex;
    padding: 4px 0;
    align-items: center;
    font-size: 24px;
  }
  .talker-input-wrapper {
    flex: 1;
    padding: 0 6px;
  }
  .talker-input {
    box-sizing: border-box;
    border: none;
    padding: 6px 8px;
    border-radius: 6px;
    background-color: #ebebeb;
  }
  .talker-icon-btn {
    flex: 0 0 30px; /*no*/
  }
  .talker-send {
    font-size: 25px;
    border-radius: 4px;
  }
  .talker .icon {
    height: 30px;
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
    border: 1px solid #ccc;
  }
  .self-talk {
    flex-direction: row-reverse;
    text-align: right;
  }
  .talker-toolbar {
    padding: 10px 0;
    width: 100%;
    display: flex;
  }
  .talker-toolbar .list-item {
    /* height: 90px; */
    width: 25%;
    padding: 0 10px;
  }
  .talker-toolbar .item-icon {
    display: flex;
    height: 70px;
    padding: 10px;
    border-radius: 6px;
    background-color: #e6e6e6;
  }
  .talker-toolbar .item-text {
    font-size: 18px; /* no */
    line-height: 1.5;
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
</style>
