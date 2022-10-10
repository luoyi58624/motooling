<!--消息记录列表组件-->
<template>
  <van-popup style="height: 100vh;width: 300px" :value="showPanel" position="right" @open="openHandler"
             @click-overlay="closeHandler">
    <h2 class="title">历史记录</h2>
    <van-tabs v-model="active" type="card" color="#3498db">
      <van-tab title="聊天记录">
        <van-search v-model="searchValue" placeholder="搜索聊天记录"/>
        <div ref="talkContent" class="talk-content">
          <ul>
            <li v-for="(item, index) in recordList" :key="index">
              <template v-if="item.contentType === 5">
                <div class="system-message">{{ item.content }}</div>
              </template>
              <template v-else-if="item.contentType === 7">
                <div class="system-message" v-if="item.content.senderId == uid">
                  {{ item.content.sendeContent }}
                </div>
                <div class="system-message" v-else-if="item.content.receiverId == uid">
                  {{ item.content.receiverContent }}
                </div>
                <div class="system-message" v-else>
                  {{ item.content.otherContent }}
                </div>
              </template>
              <template v-else>
                <h3 class="name" :style="{color: uid===item.senderId ? '#3498db':'#34495e'}">{{ item.username }}
                  {{ item.sendTime }}
                </h3>
                <p class="content">{{ item.content }}</p>
              </template>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="文件">内容 2</van-tab>
      <van-tab title="图片/视频">内容 3</van-tab>
    </van-tabs>
  </van-popup>
</template>

<script>
import { mapState } from 'vuex'
import debounce from '@/utils/debounce'
import { synergyRecordPage } from '@/api/synergy/synergy'
import { time } from '@/utils/time'

export default {
  name: 'recordList',
  props: {
    showPanel: {
      type: Boolean,
      default: false
    },
    initDate: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      active: 0,
      searchValue: '',
      recordList: [],
      noMoreRecords: false
    }
  },
  computed: {
    ...mapState({
      uid: (state) => state.userInfo.uid,
      groupId: (state) => state.groupId
    })
  },
  methods: {
    loadMoreRecordList () {
      if (this.noMoreRecords) {
        return false
      } else {
        if (this.$refs.talkContent.scrollTop === 0) {
          synergyRecordPage({
            id: this.recordList[0].id,
            groupId: this.groupId
          }).then((res) => {
            const result = res.recordList
            if (result.length !== 0) {
              let recordList = result.reverse()
              recordList.forEach(item => {
                if (item.data.contentType === 7) {
                  item.data.content = JSON.parse(item.data.content)
                }
              })
              let _recordList = time(recordList)
              this.recordList = _recordList.concat(this.recordList)
            }
            if (result.length < 15) {
              this.noMoreRecords = true
            }
          })
        }
      }
    },
    openHandler () {
      this.$emit('update:showPanel', true)
      this.recordList = this.initDate
      this.$nextTick(() => {
        this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
        this.$refs.talkContent.addEventListener(
          'scroll',
          debounce(this.loadMoreRecordList, 500)
        )
      })
    },
    closeHandler () {
      this.$emit('update:showPanel', false)
      this.searchValue = ''
      this.$refs.talkContent.removeEventListener(
        'scroll',
        debounce(this.loadMoreRecordList, 500)
      )
    }
  }
}
</script>

<style scoped lang="less">
.title {
  padding: 12px 16px;
  font-weight: bold;
}

.talk-content {
  height: calc(100vh - 160px);
  overflow-y: auto;
  padding: 16px;

  & > ul > li {
    margin: 16px 0;
    font-size: 12px;
    text-align: center;

    & > .system-message {
      padding: 6px;
      border-radius: 4px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: #d0cece;
    }

    & > .name {
      font-weight: bold;
      text-align: left;
    }

    & > .content {
      margin-top: 4px;
      width: 100%;
      word-wrap: break-word;
      text-align: justify;
    }
  }
}
</style>
