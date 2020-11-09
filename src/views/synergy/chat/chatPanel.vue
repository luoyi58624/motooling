<template>
  <div class="chat-panel">
    <nav>瓦拉西</nav>
    <div class="chat-content">
      <div class="talk-wrapper">
        <div class="talk-content" ref="talkContent">
          <div class="talker" v-for="item in recordList" :key="item.id">
            <div :class="uid == item.data.senderId?'my-content':'others-content'" v-if="item.data.contentType === 1">
              <div class="talker-name">{{item.data.username}}</div>
              <div class="talker-info">{{item.data.content}}</div>
            </div>
            <div :class="uid == item.data.senderId?'my-content':'others-content'" v-if="item.data.contentType === 5">
              <div class="sys-notifacation"><span>{{item.data.content}}</span></div>
            </div>
          </div>
        </div>
        <div class="input-area">
          <textarea v-model="wordContent"></textarea>
          <div class="enter-message" @click="sendWordMessage(2)">发送</div>
        </div>
      </div>
      <div class="group-members">
        <p class="group-members-title">群成员 · 22</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getOpenSynergy, synergyRecordPage } from '@/api/synergy/synergy.js'
import shortid from 'shortid'
export default {
  data () {
    return {
      isClose: false,
      companyId: localStorage.companyId,
      socket: {},
      synergyGroup: {},
      uid: localStorage.uid,
      mainKeyId: '',
      wordContent: '',
      recordList: []
    }
  },
  computed: {
    // relationType(){
    //   return this.$router.params.relationType
    // },
    // relationId(){
    //   return this.$router.params.relationId
    // }
  },
  beforeRouteUpdate (to, from, next) {
    console.log('enter')
    // this.init().then(() => {
    //   this.loadMoreRecordList()
    // })
    next()
    // this.loadMoreRecordList()
  },
  async mounted () {
    this.imurl = localStorage.imurl
    await this.init()
    this.loadMoreRecordList()
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
      await getOpenSynergy({
        relationType: this.$route.query.relationType,
        // relationId: 2
        groupId: this.$route.query.groupId
      }).then(res => {
        console.log(res.recordList)
        this.synergyGroup = res.synergyGroup
        this.recordList = res.recordList.reverse()
        this.mainKeyId = res.recordList[0].data.id
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
      console.log('连接成功')
      let that = this
      let heartCheck = {
        timeout: 10000,
        timeoutObj: null,
        reset: function () {
          clearInterval(this.timeoutObj)
          return this
        },
        start: function () {
          this.timeoutObj = setInterval(() => {
            console.log('ping')
            that.sendMessage(1)
          }, this.timeout)
        }

      }
      heartCheck.reset().start()
    },
    websocketonerror () {
      console.log('link occur error')
    },
    websocketonmessage (e) {
      console.log('接收消息')
      this.receiveMessage(JSON.parse(e.data))
      this.wordContent = ''
    },
    websocketclose () {
      console.log('连接已关闭')
      if (this.isClose === false) {
        this.im()
      } else {
        this.websocketonopen.heartCheck.reset()
      }
    },
    receiveMessage (message) {
      console.log(message)
      let _message = [{ data: { ...message.data, username: localStorage.username } }]
      this.recordList = this.recordList.concat(_message)
      this.$nextTick(() => {
        this.$refs.talkContent.scrollTop = 9999
      })
    },
    // 发送消息
    sendMessage (type) {
      let message = {
        requestType: 'h5',
        serialNumber: 'h5' + shortid.generate(),
        data: {
          groupId: this.synergyGroup.id,
          senderId: this.uid,
          contentType: 1
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
        message.data.content = this.wordContent
      }
      if (this.socket.readyState === 1) {
        this.socket.send(JSON.stringify(
          message
        ))
      } else {
        this.im()
      }
    },
    // 发送文字消息
    sendWordMessage (type) {
      this.sendMessage(type)
    },
    // 获取聊天记录
    getRecordList () {
      synergyRecordPage({ pageSize: 10, id: this.mainKeyId, groupId: this.synergyGroup.id }).then(res => {
        const result = res.recordList
        console.log('chatRecord', res.recordList)
        if (result.length !== 0) {
          this.mainKeyId = result[0].data.id
          this.recordList = result.reverse().concat(this.recordList)
        }
      })
    },
    loadMoreRecordList () {
      if (this.$refs.talkContent.scrollTop === 0) {
        this.getRecordList()
        this.$refs.talkContent.scrollTo(0, 100)
      }
    }
  }
}
</script>

<style scoped lang="less">
/* 滚动条 */
::-webkit-scrollbar {
width: 6px;
height: 6px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
border-radius: 3px;
background: rgba(159, 162, 169);
}
.chat-panel {
  height: 100%;
  background-color: #fff;
}
nav{
  height: 59px;
  line-height: 60px;
  border-bottom: 1px solid #dadcdf;
  padding-left: 18px;
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
      height: calc(100% - 155px);
      overflow-y: auto;
      .talker {
        font-size: 14px;
      }
      .talker-info {
          background-color: #dee0e3;
          padding: 8px;
          margin: 8px 0;
          border-radius: 5px;
        }
      .my-content {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        margin-right: 18px;
      }
      .sys-notifacation {
        max-width: 80%;
        text-align: center;
        margin: 8px auto;
        span{
          display: inline-block;
          padding: 8px;
          background-color: #e4e7eb;
        }
      }
      .others-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 18px;
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
    padding: 10px;
  }
}
</style>
