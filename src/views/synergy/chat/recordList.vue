<!--消息记录列表组件-->
<template>
  <van-popup class="custom-popup"
             :value="showPanel" position="right" :overlay="false" closeable
             @open="openHandler"
             @click-close-icon="closeHandler">
    <h2 class="title">历史记录</h2>
    <van-tabs v-model="active" type="card" color="#3498db">
      <van-tab title="聊天记录">
        <van-search v-model="searchValue" placeholder="搜索聊天记录"/>
        <div ref="talkContent" class="talk-content">
          <ul>
            <li v-for="(item, index) in recordList" :key="index">
              <h3
                v-if="item.contentType!==5 && item.contentType!==7"
                class="username"
                :style="{color: uid===item.senderId ? '#3498db':'#34495e'}">
                {{ item.username }} {{ item.sendTime }}
              </h3>
              <div class="text-left" v-if="item.contentType === 2 || item.contentType === 6">
                <van-image
                  fit="contain"
                  style="cursor: pointer"
                  :src="item.content"
                  @click="reviewImage(item.content)"
                />
              </div>
              <div class="text-left audio-message" v-else-if="item.contentType === 3">
                <img style="cursor: pointer"
                     :src="require('@/assets/icon-voice-white.png')" alt=""
                     @click="playAudio(fileAddressFormatFunc(item.content))">
                <span>{{ item.duration }}"</span>
              </div>
              <div class="text-left" v-else-if="item.contentType === 4">
                <video
                  preload="meta"
                  :src="fileAddressFormatFunc(item.content)"
                  controls="controls"
                  width="250"
                  @click="playVideo($event)"
                ></video>
              </div>
              <template v-else-if="item.contentType === 5">
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
                <p class="content">{{ item.content }}</p>
              </template>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="文件">
        <div class="tag-container">
          待开发。。。
        </div>
      </van-tab>
      <van-tab title="图片/视频">
        <div class="tag-container">
          待开发。。。
        </div>
      </van-tab>
    </van-tabs>
    <audio :src="currentAudio" ref="audio"></audio>
  </van-popup>
</template>

<script>
import { mapState } from 'vuex'
import debounce from '@/utils/debounce'
import { synergyRecordPage } from '@/api/synergy/synergy'
import { time } from '@/utils/time'
import { ImagePreview } from 'vant'
import { fileAddressFormat } from '@/utils/utils'

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
      noMoreRecords: false,
      currentAudio: '',
      loadedScrollTop: 0,
      beforeLoadedScrollTop: 0,
      loading: false // 数据是否加载中
    }
  },
  computed: {
    ...mapState({
      uid: (state) => state.userInfo.uid,
      groupId: (state) => state.groupId
    })
  },
  methods: {
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
      this.noMoreRecords = false
      this.$refs.talkContent.removeEventListener(
        'scroll',
        debounce(this.loadMoreRecordList, 500)
      )
    },
    loadMoreRecordList () {
      // 如果没有更多数据或者数据数据还在加载中，则禁止发送请求
      if (this.noMoreRecords || this.loading) {
        return false
      } else {
        if (this.$refs.talkContent.scrollTop === 0) {
          this.beforeLoadedScrollTop = this.$refs.talkContent.scrollHeight
          this.loading = true
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

            this.$nextTick(() => {
              this.loadedScrollTop = this.$refs.talkContent.scrollHeight
              this.$refs.talkContent.scrollTop =
                this.loadedScrollTop - this.beforeLoadedScrollTop
            })
          }).finally(() => {
            this.loading = false
          })
        }
      }
    },
    fileAddressFormatFunc (url) {
      return fileAddressFormat(url)
    },
    reviewImage (img) {
      ImagePreview({
        images: [img],
        closeable: true
      })
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
    }
  }
}
</script>

<style scoped lang="less">
.custom-popup {
  height: 100vh;
  width: 360px;
  border-left: 1px solid #cccccc;
  box-shadow: 0 2px 5.3px rgba(0, 0, 0, 0.2),
  0 6.7px 17.9px rgba(0, 0, 0, 0.087),
  0 30px 80px rgba(0, 0, 0, 0.062);
}

.title {
  margin-top: 8px;
  padding: 12px 16px;
  font-weight: bold;
}

.tag-container {
  padding: 12px 16px;
}

.talk-content {
  height: calc(100vh - 180px);
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

    & > .username {
      font-weight: bold;
      text-align: left;
      margin: 4px 0;
    }

    & > .content {
      width: 100%;
      word-wrap: break-word;
      text-align: justify;
    }

    & > .audio-message {
      & > img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
  }
}

.text-left {
  text-align: left;
}
</style>
