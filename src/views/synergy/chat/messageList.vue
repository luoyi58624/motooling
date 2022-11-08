<template>
  <div class="chat-left-list">
    <div class="search">
      <div class="enter-keyword">
        <div>
          <el-input placeholder="搜索" prefix-icon="el-icon-search" size="mini" v-model="value" :clearable="true"
                    @input="search"></el-input>
        </div>
        <i class="el-icon-plus" @click="$emit('add-user')"></i>
      </div>
    </div>
    <div class="message-list">
      <div class="message-list-wrapper" :class="{ active: item.groupId == currentConversation }"
           v-for="item in newsList" :key="item.groupId">
        <div class="message-list-item" v-clickoutside="visible"
             @click.left="startChatting(item)" @click.right="handleGroup(item, $event)">
          <div class="file-picture">
            <img :src="item.avatar" v-if="item.relationType === 66"/>
            <img :src="require('@/assets/group.png')" v-else/>
            <div class="no-read-count" v-if="item.notReadCount <= 99 && item.notReadCount > 0">
              {{ item.notReadCount }}
            </div>
            <div class="no-read-count" v-else-if="item.notReadCount !== 0">...</div>
          </div>
          <div class="user-name">
            <p class="group-name">{{ item.username || item.subject }}</p>
            <div class="group-content">
              <span v-html="filterHtmlTag(item.newMsg)"></span>
              <span>{{ formatNewMsgTime(item.newsTime) }}</span>
            </div>
          </div>
        </div>
        <div class="popover" v-if="item.groupId === groupId && item.relationType === 666">
          <p @click.stop="clearChattingRecords(item)">清空聊天记录</p>
          <p @click.stop="signOutGroup(item)">退出群聊</p>
        </div>
        <div class="popover"
             v-if="item.groupId == groupId && item.groupId == currentConversation && item.relationType === 66">
          <p @click.stop="handleBeat(item)">找一找</p>
        </div>
      </div>
    </div>
    <div class="search-contacts" v-if="value" v-clickoutside="showSearch">
      <ul v-if="contacts.length">
        <li class="message-list-wrapper" v-for="item in contacts" :key="item.groupId" @click="enterChatting(item)">
          <div class="message-list-item">
            <div class="file-picture">
              <img :src="item.avatar" v-if="item.relationType === 66"/>
              <img :src="require('@/assets/group.png')" v-else/>
            </div>
            <div class="user-name">
              <p>{{ item.username || item.subject }}</p>
              <p>{{ item.depName }}</p>
            </div>
          </div>
        </li>
      </ul>
      <p class="no-result" v-else>无查询结果</p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  getNewsList,
  clearChatRecords,
  getOpenSynergy,
  alreadyRead,
  getUserInfo
} from '@/api/synergy/synergy.js'
import clickoutside from '@/utils/clickoutside'
import { formatDate } from '@/utils/time'
import { htmlToText } from '@/utils/utils'

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
      newList: [],
      imurl: localStorage.imurl
    }
  },
  computed: {
    ...mapState({
      currentConversation: (state) => state.groupId,
      newsList: (state) => state.newsList,
      latestMessageId: (state) => state.latestMessageId,
      companyId: (state) => state.userInfo.companyId,
      uid: (state) => state.userInfo.uid
    })
  },
  created () {
    getUserInfo().then((res) => {
      this.$store.commit('USER_INFO', res)
      localStorage.setItem('fileServerUrl', res.fileServerUrl)
    })
  },
  mounted () {
    getNewsList()
      .then((res) => {
        this.newList = res.newList
        this.$store.dispatch('newsList', res.newsList)
      })
    setInterval(() => {
      getNewsList()
        .then((res) => {
          this.newList = res.newList
          this.$store.dispatch('newsList', res.newsList)
        })
    }, 3000)
    // this.im()
  },
  beforeDestroy () {
    this.isClose = true
    // this.socket.close()
  },
  methods: {
    im () {
      let prefix = location.protocol === 'https:' ? 'wss://' : 'ws://'
      if (this.isClose === false || (this.socket && this.socket.readyState === 3)) {
        this.socket = new WebSocket(
          `${prefix}${this.imurl}/MtMsgWebSocket/${this.companyId}/H5/${this.uid * 1}`
        )
        this.socket.onopen = () => {
          console.log('开启消息列表socket')
          this.interval = setInterval(() => {
            if (this.socket.readyState === 1) {
              this.socket.send(
                JSON.stringify({ requestType: 'ping', serialNumber: null })
              )
            } else {
              this.im()
            }
          }, 10000)
        }
        this.socket.onclose = () => {
          if (this.isClose === false) {
            this.im()
          } else {
            clearInterval(this.interval)
          }
        }
        this.socket.onmessage = async (msg) => {
          console.log('收到消息：消息列表socket')
          console.log(msg)
          let receivedMessage = JSON.parse(msg.data)
          if (this.socket.readyState === 1) {
            this.socket.send(
              JSON.stringify({
                requestType: '555555',
                serialNumber: `${receivedMessage.serialNumber}`
              })
            )
          }
          if (this.latestMessageId) {
            await alreadyRead({
              lastRecordId: this.latestMessageId,
              groupId: this.$store.state.groupId
            })
          }

          getNewsList()
            .then((res) => {
              this.$store.dispatch('newsList', res.newsList)
            })
            .catch((err) => {
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
    showSearch () {
      this.value = ''
    },
    // 清空聊天记录
    clearChattingRecords (data) {
      getOpenSynergy({ relationType: data.relationType, groupId: data.groupId })
        .then((item) => {
          return item.recordList[0].data.id
        })
        .then((key) => {
          clearChatRecords({ groupId: data.groupId, lastRecordId: `${key}` }).then(
            () => {
              this.groupId = null
              getNewsList().then((res) => {
                this.$store.dispatch('newsList', res.newsList)
              })
            }
          )
        })
    },
    // 退出群聊
    signOutGroup (item) {
      this.$eventBus.$emit('quit', item.groupId)
    },
    // 搜索
    search (e) {
      this.$store.dispatch('value', e)
      if (!e) return
      if (this.timeout) {
        clearTimeout(this.timeout)
        this.timeout = null
      }
      this.timeout = setTimeout(() => {
        getNewsList({ queryValues: e }).then((res) => {
          const users = []
          let depName = ''
          // 过滤出部门用户
          this.$store.state.allDepUser.forEach(dep => {
            depName = dep.name
            dep.childrenList.forEach(user => {
              if (user.username != this.$store.state.userInfo.username && user.username.indexOf(e) !== -1) {
                let flag = true
                for (let i = 0; i < res.newsList.length; i++) {
                  if (res.newsList[i].username == user.username) {
                    flag = false
                  }
                }
                if (flag) {
                  users.push({
                    ...user,
                    depName,
                    noChat: true // 没有开启聊天，点击此用户将创建新的聊天
                  })
                }
              }
            })
          })
          this.contacts = res.newsList.concat(users)
        })
      }, 200)
    },
    enterChatting (data) {
      if (data.noChat) {
        getOpenSynergy(
          {
            relationType: '66',
            relationId: data.uid
          }
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
      } else {
        this.$store.commit('currentConversation', {
          groupId: data.groupId,
          relationType: data.relationType
        })
        this.value = ''
      }
    },
    // 选择聊天对象，开启聊天
    startChatting (data) {
      this.groupId = data.groupId
      // 初始化草稿
      this.$store.commit('createMessageDraftGroup', {
        groupId: data.groupId,
        message: ''
      })
      this.$store.commit('currentConversation', {
        groupId: data.groupId,
        relationType: data.relationType
      })
      this.$store.dispatch('notReadCount', data.notReadCount)
    },
    // 拍一拍
    handleBeat ({ memberList }) {
      console.log(memberList)
      const receiver = memberList.find((item) => {
        return item.uid !== +this.uid
      })

      this.$eventBus.$emit('beat', {
        senterID: +this.uid,
        senderName: this.$store.state.userInfo.username || this.$store.state.userInfo.nickname,
        receiverID: receiver.uid,
        username: receiver.username || receiver.nickname
      })
      this.groupId = null
    },
    // 格式化新消息最近时间
    formatNewMsgTime (time) {
      const day = formatDate(time, 'YYYY-MM-DD')
      if (day === formatDate(new Date(), 'YYYY-MM-DD')) {
        return formatDate(time, 'HH:mm:ss')
      } else {
        return day
      }
    },
    filterHtmlTag (val) {
      return val.replace(/<p>/gi, '').replace(/<\/p>/gi, '')
    }
  }
}
</script>

<style lang="less">
@import url("./common.less");

.active {
  background-color: #c3c5c7;
}

.chat-left-list {
  position: relative;
  height: 100%;
  overflow: hidden;
  background-color: #e6e8eb;

  .search-contacts {
    position: absolute;
    top: 50px;
    left: 9px;
    width: 210px;
    max-height: 80%;
    border-radius: 6px;
    overflow-y: auto;
    background-color: white;

    & > ul {
      background-color: #fff;
    }

    .no-result {
      text-align: center;
      color: #ccc;
      background-color: #fff;
      padding: 10px 0;
    }
  }

  .search {
    position: fixed;
    left: 0;
    top: 0;
    margin: 20px 0 0 10px;
    background-color: #e6e8eb;

    .enter-keyword {
      display: flex;
      align-items: center;
    }

    i {
      margin-left: 8px;
      cursor: pointer;
    }
  }
}

.message-list {
  margin-top: 60px;
  height: calc(100% - 60px);
  overflow-y: auto;
  overflow-x: hidden;
}

.message-list-wrapper {
  position: relative;
  height: 64px;
  font-size: 14px;
  padding: 12px 0 12px 12px;
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

    & > .group-name {
      width: 160px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & > .group-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      color: #8c8d8f;
      font-size: 12px;

      & > span:nth-child(1) {
        width: 120px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        & > img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
      }

      & > span:nth-child(2) {
        width: 64px;
        padding: 0 4px;
        box-sizing: content-box;
      }

    }
  }
}
</style>
