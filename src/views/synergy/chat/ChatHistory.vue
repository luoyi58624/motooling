<!--聊天历史-->
<template>
  <div class="chat-history-container">
    <h2 class="title">历史记录</h2>
    <van-tabs v-model="active" type="card" color="#3498db">
      <van-tab title="全部">
        <van-search v-model="searchValue" placeholder="搜索聊天记录"/>
        <div ref="talkContent" class="talk-content">
          <ul>
            <li v-for="(item, index) in showMessage" :key="index" @click="emitSkipEvent(item)">
              <!--渲染用户名和时间-->
              <h3 v-if="item.contentType!==5 && item.contentType!==7 && item.contentType!==8" class="username"
                  :style="{color: uid===item.senderId ? '#3498db':'#34495e'}">
                {{ item.username }} {{ item.sendTime }}
              </h3>
              <!--渲染消息内容-->
              <div v-if="item.contentType === 2 || item.contentType === 6" style="text-align: left;">
                <el-image style="width: 160px; height: 90px;" fit="scale-down" :z-index="3000"
                          :src="fileAddressFormatFunc(item.content)"/>
              </div>
              <div v-else-if="item.contentType === 3" class="audio-message" style="text-align: left;">
                <img style="cursor: pointer" :src="require('@/assets/icon-voice-white.png')" alt=""
                     @click="playAudio(fileAddressFormatFunc(item.content))">
                <span>{{ item.duration }}"</span>
              </div>
              <div v-else-if="item.contentType === 4" style="text-align: left;">
                <video preload="meta" :src="fileAddressFormatFunc(item.content)" controls="controls"
                       width="200" height="112" @click="playVideo($event)"></video>
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
              <div class="file-message" v-else-if="item.contentType === 9">
                <div class="file-info">
                  <div class="name">{{ item.content.fileName }}</div>
                  <div class="size">{{ item.content.fileSize }}</div>
                </div>
                <div class="file-icon">
                  <el-image style="width: 36px;height: 36px;" :src="fileIcon(item.content.fileName)"/>
                </div>
              </div>
              <template v-else>
                <p class="content">{{ item.content }}</p>
              </template>
            </li>
          </ul>
        </div>
      </van-tab>
      <van-tab title="图片">
        <div class="image-container">
          <div v-if="allImage.length===0">没有图片</div>
          <div v-for="(image,index) in allImage" :key="index">
            <div class="media-time">----- {{ image.time }} -----</div>
            <div class="images-array">
              <div v-for="item in image.datas" :key="item.id" class="image-item">
                <el-image style="width: 100%; height: 100%" fit="contain" :z-index="3000"
                          :src="fileAddressFormatFunc(item.content)"
                          :preview-src-list="imagePreviews"/>
                <div class="show-source-message" @click="emitSkipEvent(item)">查看原消息</div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="视频">
        <div class="media-container">
          <div class="empty-data" v-if="allVideo.length===0">没有视频</div>
          <div v-for="(video,index) in allVideo" :key="index">
            <div class="media-time">----- {{ video.time }} -----</div>
            <ul>
              <li v-for="item in video.datas" :key="item.id" @click="emitSkipEvent(item)">
                <h3 class="username" :style="{color: uid===item.senderId ? '#3498db':'#34495e'}">
                  {{ item.username }} {{ item.sendTime }}
                </h3>
                <video preload="meta" :src="fileAddressFormatFunc(item.content)"
                       width="200" height="112" controls="controls"></video>
              </li>
            </ul>
          </div>
        </div>
      </van-tab>
      <van-tab title="语音">
        <div class="media-container">
          <div v-if="allAudio.length===0">没有语音</div>
          <div v-for="(audio,index) in allAudio" :key="index">
            <div class="media-time">----- {{ audio.time }} -----</div>
            <ul>
              <li v-for="item in audio.datas" :key="item.id" @click="emitSkipEvent(item)">
                <h3 class="username" :style="{color: uid===item.senderId ? '#3498db':'#34495e'}">
                  {{ item.username }} {{ item.sendTime }}
                </h3>
                <div class="audio-message" style="text-align: left;">
                  <audio :src="fileAddressFormatFunc(item.content)" controls="controls">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </van-tab>
      <van-tab title="文件">
        <ul class="file-container">
          <div v-if="allFiles.length===0">没有文件</div>
          <li v-for="item in allFiles" :key="item.id"
              @click="downloadFile(fileAddressFormatFunc(item.content.fileUrl),item.content.fileName)">
            <div>
              <el-image style="width: 36px;height: 36px;" :src="fileIcon(item.content.fileName)"/>
            </div>
            <div style="width:100%; display: flex;justify-content: space-between;padding-left:8px;font-size: 12px;">
              <div style="display: flex;flex-direction: column">
                <div style="margin-bottom: 4px">{{ item.content.fileName }}</div>
                <div style="display: flex;color: #7f8c8d">
                  <div>{{ item.content.fileSize }}</div>
                  <div style="margin-left: 4px">{{ item.username }}</div>
                </div>
              </div>
              <div style="width: 60px;display: flex;flex-direction: column;justify-content: space-between">
                <div style="margin-bottom: 4px;text-align: right">{{ item.sendTime }}</div>
                <div class="show-source-message" @click.self.stop="emitSkipEvent(item)">查看原消息</div>
              </div>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
    <audio :src="currentAudio" ref="audio"></audio>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { synergyRecordPage } from '@/api/synergy/synergy'
import { Dialog } from 'vant'
import { chatDataHandler, fileAddressFormat, loadFileIcon } from '@/utils/utils'
import { formatDate, timeToFullTime } from '@/utils/time'
import { saveAs } from 'file-saver'
import { cloneDeep } from 'lodash'

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
      allMessage: [], // 所有的聊天记录
      showMessage: [], // 需要展示的聊天记录
      currentAudio: ''
    }
  },
  computed: {
    ...mapState({
      uid: (state) => state.userInfo.uid,
      groupId: (state) => state.groupId
    }),
    allFiles () {
      return cloneDeep(this.allMessage).filter(item => item.contentType === 9).map(item => {
        if (item.sendTime.length > 5) {
          if (new Date(item.sendTime).getFullYear() < new Date().getFullYear()) {
            item.sendTime = formatDate(item.sendTime, 'YYYY/MM/DD')
          } else {
            item.sendTime = formatDate(item.sendTime, 'MM/DD')
          }
        }
        return item
      }).reverse()
    },
    allImage () {
      const images = []
      this.allMessage
        .filter(item => item.contentType === 2 || item.contentType === 6)
        .forEach(item => {
          let flag = false
          let index = -1
          const time = formatDate(item.sendTime, 'YYYY-MM-DD')
          for (let i = 0; i < images.length; i++) {
            if (time === formatDate(images[i].time, 'YYYY-MM-DD')) {
              flag = true
              index = i
              break
            }
          }
          if (flag) {
            images[index].datas.push(item)
          } else {
            images.push({
              time,
              datas: [item]
            })
          }
        })
      images.forEach(item => {
        item.datas.reverse()
      })
      return images.reverse()
    },
    imagePreviews () {
      return this.allMessage
        .filter(item => item.contentType === 2 || item.contentType === 6)
        .map(item => this.fileAddressFormatFunc(item.content)).reverse()
    },
    allVideo () {
      const videos = []
      this.allMessage
        .filter(item => item.contentType === 4)
        .forEach(item => {
          let flag = false
          let index = -1
          const time = formatDate(item.sendTime, 'YYYY-MM-DD')
          for (let i = 0; i < videos.length; i++) {
            if (time === formatDate(videos[i].time, 'YYYY-MM-DD')) {
              flag = true
              index = i
              break
            }
          }
          if (flag) {
            videos[index].datas.push(item)
          } else {
            videos.push({
              time,
              datas: [item]
            })
          }
        })
      videos.forEach(item => {
        item.datas.reverse()
      })
      return videos.reverse()
    },
    allAudio () {
      const audios = []
      this.allMessage
        .filter(item => item.contentType === 3)
        .forEach(item => {
          let flag = false
          let index = -1
          const time = formatDate(item.sendTime, 'YYYY-MM-DD')
          for (let i = 0; i < audios.length; i++) {
            if (time === formatDate(audios[i].time, 'YYYY-MM-DD')) {
              flag = true
              index = i
              break
            }
          }
          if (flag) {
            audios[index].datas.push(item)
          } else {
            audios.push({
              time,
              datas: [item]
            })
          }
        })
      audios.forEach(item => {
        item.datas.reverse()
      })
      return audios.reverse()
    }
  },
  watch: {
    searchValue (newValue) {
      if (newValue === '') {
        this.showMessage = this.allMessage
      } else {
        this.showMessage = this.allMessage.filter(item => item.contentType === 1 && item.content.indexOf(newValue) !== -1)
        this.$nextTick(() => {
          this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
        })
      }
    }
  },
  methods: {
    // 获取全部数据
    openPanel () {
      if (this.currentGroupId === '' || this.currentGroupId !== this.$store.state.groupId) {
        this.currentGroupId = this.$store.state.groupId
        synergyRecordPage({
          id: this.initDate[this.initDate.length - 1].id,
          groupId: this.currentGroupId,
          pageSize: 1000000
        }).then(res => {
          const data = chatDataHandler(res.recordList).reverse()
          const lastData = cloneDeep(this.initDate[this.initDate.length - 1])
          lastData.sendTime = timeToFullTime(lastData.sendTime)
          data.push(lastData)
          this.showMessage = data
          this.allMessage = data
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
    emitSkipEvent (item) {
      let index
      for (let i = 0; i < this.allMessage.length; i++) {
        if (item.id === this.allMessage[i].id) {
          index = i
          break
        }
      }
      if (index + 15 > this.allMessage.length) index = this.allMessage.length - 15
      this.$emit('skip-target-message', item, this.allMessage.slice(index, this.allMessage.length))
    },
    downloadFile (url, fileName) {
      Dialog.confirm({
        title: '文件下载',
        message: '确定要下载该文件吗'
      }).then(() => {
        saveAs(url, fileName)
      })
    }
  }
}
</script>

<style scoped lang="less">
@import url("./common.less");

.chat-history-container {
  height: 100%;
  width: 100%;
}

.title {
  margin-top: 8px;
  padding: 12px 16px;
  font-weight: bold;
}

.talk-content {
  height: calc(100vh - 195px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 16px;

  & > ul > li {
    font-size: 12px;
    text-align: center;
    padding: 8px 6px;
    border-radius: 6px;

    &:hover {
      background-color: #f1f2f6;
    }

    & > .system-message {
      padding: 6px;
      border-radius: 4px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: #e5e3e3;
    }

    & > .content {
      width: 100%;
      text-align: left;
      user-select: text;
      word-break: break-all;
      white-space: pre-line;
    }

    & > .file-message {
      width: 200px;
      margin-top: 4px;
      padding: 6px 8px;
      background-color: white;
      border: 1px solid #cccccc;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;

      & > .file-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        & > .name {
          text-align: left;
          width: 100%;
          padding: 2px 0;
          display: flex;
          align-items: center;
          // 文字超出换行
          word-wrap: break-word;
          word-break: break-all;
          overflow: hidden;
        }

        & > .size {
          color: #636e72;
          font-size: 12px;
          margin-top: 2px;
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
  }
}

.file-container {
  height: calc(100vh - 150px);
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 10px;
  padding: 8px;

  & > li {
    min-height: 50px;
    display: flex;
    align-items: center;
    padding: 8px;

    .show-source-message {
      color: #3498db;
      opacity: 0;
      cursor: pointer;
      transition: opacity 0.28s;
      white-space: nowrap;
    }

    &:hover {
      background-color: #f1f2f6;

      .show-source-message {
        opacity: 1;
      }
    }
  }
}

.image-container {
  height: calc(100vh - 150px);
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 10px;
  padding: 8px;

  .images-array {
    display: flex;
    flex-wrap: wrap;

    & > .image-item {
      width: 48%;
      aspect-ratio: 1/1;
      margin: 1%;
      padding: 4px;
      border: 1px solid #b7b7b7;
      position: relative;

      & > .show-source-message {
        width: 100%;
        height: 24px;
        font-size: 12px;
        position: absolute;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.4);
        opacity: 0;
        color: white;
      }

      &:hover {
        .show-source-message {
          opacity: 1;
        }
      }
    }
  }
}

.media-container {
  height: calc(100vh - 150px);
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 10px;
  padding: 8px;

  ul {
    font-size: 12px;

    & > li {
      width: 100%;
      margin-top: 4px;
      padding: 8px;
      border-radius: 6px;
      position: relative;

      &:hover {
        background-color: #faf9f9;
      }
    }
  }
}

.username {
  font-weight: bold;
  text-align: left;
  margin: 4px 0;
}

.audio-message {
  & > img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }
}

.media-time {
  text-align: center;
  margin: 8px 0;
  font-weight: bold;
}
</style>
