<!--聊天历史-->
<template>
  <div class="chat-history-container">
    <h2 class="title">历史记录</h2>
    <van-tabs v-model="active" type="card" color="#3498db">
      <van-tab title="聊天记录">
        <van-search v-model="searchValue" placeholder="搜索聊天记录"/>
        <div ref="talkContent" class="talk-content">
          <ul>
            <li v-for="(item, index) in recordList" :key="index">
              <!--渲染用户名和时间-->
              <h3 v-if="item.contentType!==5 && item.contentType!==7 && item.contentType!==8"
                  class="username" :style="{color: uid===item.senderId ? '#3498db':'#34495e'}">
                {{ item.username }} {{ item.sendTime }}
              </h3>
              <!--渲染消息内容-->
              <div class="text-left" v-if="item.contentType === 2 || item.contentType === 6">
                <el-image style="width: 160px; height: 90px;"
                          fit="scale-down"
                          :z-index="3000"
                          :src="fileAddressFormatFunc(item.content)"
                          :preview-src-list="[fileAddressFormatFunc(item.content)]"/>
              </div>
              <div class="text-left audio-message" v-else-if="item.contentType === 3">
                <img style="cursor: pointer"
                     :src="require('@/assets/icon-voice-white.png')" alt=""
                     @click="playAudio(fileAddressFormatFunc(item.content))">
                <span>{{ item.duration }}"</span>
              </div>
              <div class="text-left" v-else-if="item.contentType === 4">
                <video preload="meta" :src="fileAddressFormatFunc(item.content)" controls="controls"
                  width="250" height="140" @click="playVideo($event)"></video>
              </div>
              <div v-else-if="item.contentType === 5" class="system-message">{{ item.content }}</div>
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
              <template v-else-if="item.contentType === 8">
                <div class="system-message" v-if="uid === item.senderId">你撤回了一条消息</div>
                <div v-else class="system-message">{{ `${item.username}撤回了一条消息` }}</div>
              </template>
              <div class="file-message-container" v-else-if="item.contentType === 9">
                <div class="file-message">
                  <div class="file-info">
                    <div class="name">{{ item.content.fileName }}</div>
                    <div class="size">{{ item.content.fileSize }}</div>
                  </div>
                  <div class="file-icon">
                    <el-image style="width: 36px;height: 36px;" :src="fileIcon(item.content.fileName)"/>
                  </div>
                </div>
              </div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { synergyRecordPage } from '@/api/synergy/synergy'
import { ImagePreview } from 'vant'
import { fileAddressFormat, loadFileIcon } from '@/utils/utils'

export default {
  name: 'ChatHistory',
  props: {
    initDate: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      currentGroupId: '',
      active: 0,
      searchValue: '',
      recordList: [],
      currentAudio: ''
    }
  },
  computed: {
    ...mapState({
      uid: (state) => state.userInfo.uid,
      groupId: (state) => state.groupId
    })
  },
  methods: {
    openPanel () {
      if (this.currentGroupId === '' || this.currentGroupId !== this.$store.state.groupId) {
        this.currentGroupId = this.$store.state.groupId
        synergyRecordPage({
          id: this.initDate[this.initDate.length - 1].id,
          groupId: this.currentGroupId,
          pageSize: 1000000
        }).then(res => {
          this.recordList = res.recordList.map(item => {
            if (item.data.contentType === 7 || item.data.contentType === 9) {
              item.data.content = JSON.parse(item.data.content)
            }
            return item.data
          }).reverse()
          this.recordList.push(this.initDate[this.initDate.length - 1])
          this.$nextTick(() => {
            this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
          })
        })
      }
    },
    closePanel () {
      this.searchValue = ''
    },
    fileAddressFormatFunc (url) {
      return fileAddressFormat(url)
    },
    fileIcon (fileName) {
      return loadFileIcon(fileName)
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
.chat-history-container {
  height: 100%;
  width: 100%;
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
  height: calc(100vh - 230px);
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
      background-color: #e5e3e3;
    }

    & > .username {
      font-weight: bold;
      text-align: left;
      margin: 4px 0;
    }

    & > .content {
      width: 100%;
      text-align: left;
      user-select: text;
      word-break: break-all;
      white-space: pre-line;
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

.file-message {
  width: 200px;
  margin-top: 4px;
  padding: 10px 8px;
  background-color: white;
  border: 1px solid #cccccc;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;

  & > .file-info {
    & > .name {
      height: 50%;
      display: flex;
      align-items: center;
    }

    & > .size {
      height: 50%;
      color: #636e72;
      font-size: 12px;
      margin-top: 4px;
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
}
</style>
