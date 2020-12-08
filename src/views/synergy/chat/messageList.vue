<template>
  <div class="list">
    <div class="search">
      <div class="enter-keyword">
        <van-search
        v-model="value"
        background="#e6e8eb"
        placeholder="搜索"
        :clearable="false"
        @input="search"/>
        <img :src="require('@/assets/icon-add.png')" alt="" @click="$emit('add-user')">
      </div>
    </div>
    <div class="message-list">
        <router-link class="message-list-wrapper" tag='div' v-for="item in newsList" :key="item.groupId"
        :to="{path:'chatPanel', query:{groupId:item.groupId,relationType:item.relationType}}">
        <div class="message-list-item" @click.left="startChatting(item)" @click.right="handleGroup(item,$event)" v-clickoutside="visible">
          <div class="file-picture">
            <img :src="item.avatar" v-if="item.relationType===66">
            <img :src="require('@/assets/group.png')" v-else>
            <div class="no-read-count" v-if="item.notReadCount <= 99 && item.notReadCount > 0">{{item.notReadCount}}</div>
            <div class="no-read-count" v-else-if="item.notReadCount !== 0">...</div>
          </div>
          <div class="user-name"><p>{{item.username || item.subject}}</p>
          <p>{{item.newMsg}}</p></div>
        </div>
        <div class="popover" v-if="item.groupId === groupId && item.relationType === 666">
          <p @click.stop="clearChattingRecords(item)">清空聊天记录</p>
          <p @click.stop="signOutGroup(item.groupId)">退出群聊</p>
        </div>
        </router-link>
    </div>
    <div class="search-contacts" v-show="value">
      <ul>
        <li class="message-list-wrapper" v-for="item in contacts" :key="item.groupId" @click="enterChatting(item)">
          <div class="message-list-item">
            <div class="file-picture">
              <img :src="item.avatar" v-if="item.relationType===66">
              <img :src="require('@/assets/group.png')" v-else>
            </div>
            <div class="user-name"><p>{{item.username || item.subject}}</p>
            <p>{{item.depName}}</p></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {
  getNewsList,
  signOutGroup,
  clearChatRecords,
  getOpenSynergy,
  alreadyRead
} from '@/api/synergy/synergy.js'
import clickoutside from '@/utils/clickoutside'

export default {
  directives: { clickoutside },
  data () {
    return {
      socket: {},
      value: '',
      groupId: null,
      group_id: null,
      interval: null,
      timeout: null,
      isClose: false,
      signOut: '',
      contacts: [],
      imurl: localStorage.imurl,
      companyId: localStorage.companyId,
      uid: localStorage.uid
    }
  },
  computed: {
    newsList () {
      return this.$store.state.newsList
    },
    latestMessageId () {
      return this.$store.state.latestMessageId
    }
  },
  mounted () {
    getNewsList().then(res => {
      this.$store.dispatch('newsList', res.newsList)
    }).catch(err => {
      this.$createToast({
        time: 2000,
        txt: err.msg || '获取消息列表失败',
        type: 'error'
      }).show()
    })
    this.im()
  },
  beforeDestroy () {
    this.isClose = true
    this.socket.close()
  },
  methods: {
    im () {
      let prefix = location.protocol === 'https:' ? 'wss://' : 'ws://'
      if (this.isClose === false || (this.socket && this.socket.readyState === 3)) {
        this.socket = new WebSocket(`${prefix}${this.imurl}/MtMsgWebSocket/${this.companyId}/H5/${this.uid}`)
        this.socket.onopen = () => {
          this.interval = setInterval(() => {
            if (this.socket.readyState === 1) {
              this.socket.send(JSON.stringify({ requestType: 'ping', serialNumber: null }))
            } else {
              this.im()
            }
          }, 10000)
        }
        this.socket.onclose = () => {
          if (this.isClose === false) {
            this.im()
          } else {
            clearInterval(this.socket)
          }
        }
        this.socket.onmessage = async msg => {
          let receivedMessage = JSON.parse(msg.data)
          this.socket.send(JSON.stringify({
            requestType: '555555',
            serialNumber: `${receivedMessage.serialNumber}`
          }))

          if (this.latestMessageId) {
            await alreadyRead({ lastRecordId: this.latestMessageId, groupId: this.$route.query.groupId })
          }

          getNewsList().then(res => {
            this.$store.dispatch('newsList', res.newsList)
          }).catch(err => {
            this.$createToast({
              time: 2000,
              txt: err.msg || '获取消息列表失败',
              type: 'error'
            }).show()
          })
        }
      }
    },
    handleGroup (data, e) {
      if (e) {
        e.preventDefault()
      }
      this.groupId = data.groupId
      this.group_id = data.groupId
    },
    visible () {
      this.groupId = null
    },
    // 清空聊天记录
    clearChattingRecords (data) {
      getOpenSynergy({ relationType: data.relationType, groupId: data.groupId }).then(item => {
        return item.recordList[0].data.id
      })
        .then(key => {
          clearChatRecords({ groupId: data.groupId, lastRecordId: `${key}` }).then((item) => {
            this.groupId = null
            getNewsList().then(res => {
              this.$store.dispatch('newsList', res.newsList)
            })
          })
        })
    },
    // 退出群聊
    signOutGroup (groupId) {
      signOutGroup({ groupId }).then(item => {
        this.groupId = null
        getNewsList().then(res => {
          this.$store.dispatch('newsList', res.newsList)
        })
      })
    },
    // 搜索
    search (e) {
      if (!e) return
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        getNewsList({ queryValues: e }).then(res => {
          this.contacts = res.newsList
          console.log({ contacts: this.contacts })
        })
      }, 500)
    },
    enterChatting (data) {
      this.$router.push({
        path: 'chatPanel',
        query: {
          groupId: data.groupId,
          relationType: data.relationType
        }
      })
      this.value = ''
    },
    // 选择聊天对象，开启聊天
    startChatting (data) {
      this.$store.dispatch('notReadCount', data.notReadCount)
    }
  }
}
</script>

<style scoped lang="less">
@import url('./common.less');
.router-link-exact-active {
  background-color: #c3c5c7;
}
.list {
  position: relative;
  height: 100%;
  overflow: hidden;
  background-color: #e6e8eb;
  .search-contacts {
    position: absolute;
    top: 47px;
    left: 12px;
    width: 210px;
    border: 1px solid skyblue;
    & > ul {
      background-color: #fff;
    }
  }
  .search {
    position: fixed;
    left: 0;
    top: 0;
    height: 60px;
    background-color: #e6e8eb;
    .enter-keyword {
      display: flex;
      align-items: center;
    }
    img{
      width: 21px;
      height: 21px;
      cursor: pointer;
    }
  }
}
.message-list {
  margin-top: 60px;
  height: calc(100% - 60px);
  overflow-y: auto;
}
    .message-list-wrapper{
      position: relative;
      height: 64px;
      font-size: 14px;
      padding: 12px 0 12px 12px ;
      box-sizing: border-box;
      border-bottom: 1px solid #dadcdf;
      cursor: pointer;
      &:hover {
        background-color: #d8ecff;
      }
      .message-list-item {
      display: flex;
      flex-wrap: nowrap;
      .file-picture {
        position: relative;
        .no-read-count {
          position: absolute;
          right: -8px;
          top: -8px;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          border-radius: 50%;
          background-color: #fa5151;
          font-size: 12px;
          color: #fff;
        }
          img {
          width: 40px;
          height: 40px;
        }
      }
    }
    .user-name {
      padding-left: 10px;
      flex: 0 0 150px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 40px;
      p:last-child {
        width: 150px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: #8c8d8f;
      }
    }
  }
</style>
