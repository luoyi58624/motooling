<!--聊天历史-->
<template>
  <div class="chat-history-container">
    <h2 class="title">历史记录</h2>
    <van-tabs v-model="active" type="card" color="#3498db">
      <van-tab title="全部">
        <div class="search-wrapper">
          <el-input v-model="searchValue" size="mini" placeholder="搜索聊天记录" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div class="control-item" @click="switchMessageTimeSort">
            <span>时间</span>
            <i v-if="messageTimeSort" class="el-icon-arrow-up"></i>
            <i v-else class="el-icon-arrow-down"></i>
          </div>
        </div>
        <div ref="talkContent" class="talk-content">
          <div v-for="(item, index) in showMessage" :key="index" class="talk-item" @click="emitSkipEvent(item)">
            <!--渲染用户名和时间-->
            <h3 v-if="item.contentType!==5 && item.contentType!==7 && item.contentType!==8" class="username"
                :style="{color: uid===item.senderId ? '#3498db':'#34495e'}">
              <span v-html="item.username"/> {{ item.sendTime }}
            </h3>
            <!--渲染消息内容-->
            <template v-if="item.contentType === 1">
              <div v-if="item.replyData" class="reply-message">
                <blockquote @click.stop="emitSkipEvent(item.replyData)">
                  <p style="font-weight: bold;margin-bottom: 6px">{{ item.replyData.username }}:</p>
                  <p v-if="item.replyData.contentType==1" v-html="item.replyData.content"></p>
                  <el-image v-else-if="item.replyData.contentType==2||item.replyData.contentType==6"
                            style="width: 160px; height: 90px;text-align: left" fit="scale-down"
                            :src="fileAddressFormatFunc(item.replyData)"></el-image>
                  <audio v-else-if="item.replyData.contentType==3" :src="fileAddressFormatFunc(item.replyData)"
                         controls="controls" style="width: 245px;height: 40px"/>
                  <video-player v-else-if="item.replyData.contentType==4" :src="fileAddressFormatFunc(item.replyData)" width="245" height="140"/>
                  <div v-else-if="item.replyData.contentType==9" class="file-message">
                    <div class="file-info">
                      <div class="name">{{ item.replyData.content.fileName }}</div>
                      <div class="size">{{ item.replyData.content.fileSize }}</div>
                    </div>
                    <div class="file-icon">
                      <el-image style="width: 36px;height: 36px;"
                                :src="fileIcon(item.replyData.content.fileName)"/>
                    </div>
                  </div>
                </blockquote>
                <span class="word-message" v-html="item.content"></span>
              </div>
              <p v-else class="content" v-html="item.content"></p>
            </template>

            <div v-if="item.contentType === 2 || item.contentType === 6" style="text-align: left;">
              <el-image style="width: 160px; height: 90px;" fit="scale-down" :z-index="3000"
                        :src="fileAddressFormatFunc(item)"/>
            </div>
            <div v-else-if="item.contentType === 3" class="audio-message" style="text-align: left;">
              <audio :src="fileAddressFormatFunc(item)" controls="controls">
                Your browser does not support the audio element.
              </audio>
            </div>
            <div v-else-if="item.contentType === 4" style="text-align: left;">
              <video-player :src="fileAddressFormatFunc(item)" width="250" height="140" @click="$event.stopPropagation()"/>
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
          </div>
        </div>
      </van-tab>
      <van-tab title="图片">
        <div class="image-container">
          <div v-if="showImages.length===0">没有图片</div>
          <div v-for="(image,index) in showImages" :key="index">
            <div class="media-time">----- {{ image.time }} -----</div>
            <div class="images-array">
              <div v-for="(item,index) in image.datas" :key="index" class="image-item">
                <el-image style="width: 100%; height: 100%" fit="contain" :z-index="3000"
                          :src="fileAddressFormatFunc(item)"
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
                <video-player :src="fileAddressFormatFunc(item)" width="250" height="140" @click="$event.stopPropagation()"/>
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
                  <audio :src="fileAddressFormatFunc(item)" controls="controls">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </van-tab>
      <van-tab title="文件">
        <div class="search-wrapper">
          <el-input v-model="searchFileValue" size="mini" placeholder="搜索文件" clearable>
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
          <div class="control-item" @click="switchFileTimeSort">
            <span>时间</span>
            <i v-if="fileTimeSort" class="el-icon-arrow-up"></i>
            <i v-else class="el-icon-arrow-down"></i>
          </div>
        </div>
        <div class="file-container">
          <div v-if="allFiles.length===0">没有文件</div>
          <div v-for="item in showFiles" :key="item.id" class="file-item"
               @dblclick="downloadFile(fileAddressFormatFunc(item),item.content.fileName)">
            <div>
              <el-image style="width: 36px;height: 36px;" :src="fileIcon(item.content.fileName)"/>
            </div>
            <div style="width:100%; display: flex;justify-content: space-between;padding-left:8px;font-size: 12px;">
              <div style="display: flex;flex-direction: column">
                <div class="file-name" v-html="item.content.fileName"></div>
                <div style="display: flex;color: #7f8c8d">
                  <div>{{ item.content.fileSize }}</div>
                  <div style="margin-left: 4px" v-html="item.username"></div>
                </div>
              </div>
              <div style="width: 60px;display: flex;flex-direction: column;justify-content: space-between">
                <div style="margin-bottom: 4px;text-align: right">{{ item.showSendTime }}</div>
                <div class="show-source-message" @click.self.stop="emitSkipEvent(item)">查看原消息</div>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { synergyRecordPage } from '@/api/synergy/synergy'
import { Dialog } from 'vant'
import {
  chatDataHandler,
  fileAddressFormatUtil, filterHtmlTag,
  heightLight,
  loadFileIcon
} from '@/utils/utils'
import { formatDate, timeToFullTime } from '@/utils/time'
import { saveAs } from 'file-saver'
import { cloneDeep } from 'lodash'
import VideoPlayer from '@/components/VideoPlayer'

export default {
  name: 'ChatHistory',
  components: { VideoPlayer },
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
      allMessage: [],         // 所有的聊天记录
      allFiles: [],            // 所有的文件
      showMessage: [],        // 过滤后显示的聊天记录
      showFiles: [],          // 过滤后显示的文件
      searchValue: '',        // 搜索聊天记录关键字
      searchFileValue: '',    // 搜索文件名
      messageTimeSort: true,  // 聊天记录时间排序
      fileTimeSort: true      // 文件时间排序
    }
  },
  computed: {
    ...mapState({
      uid: (state) => state.userInfo.uid,
      groupId: (state) => state.groupId
    }),
    allImage () {
      const imageItems = []
      this.allMessage
        .forEach(item => {
          if (item.contentType == 1) {
            item.content.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, function (match, capture) {
              if (match.indexOf('emotions') == -1) {
                imageItems.push({
                  ...item,
                  content: capture
                })
              }
            })
          } else if (item.contentType == 2 || item.contentType == 6) {
            imageItems.push({
              ...item,
              content: this.fileAddressFormatFunc(item)
            })
          }
        })
      return imageItems
    },
    showImages () {
      return this.mediaDataHandler(this.allImage)
    },
    allVideo () {
      return this.mediaDataHandler(this.allMessage.filter(item => item.contentType === 4))
    },
    allAudio () {
      return this.mediaDataHandler(this.allMessage.filter(item => item.contentType === 3))
    },
    imagePreviews () {
      return this.allImage.map(item => this.fileAddressFormatFunc(item)).reverse()
    }
  },
  watch: {
    active (newValue) {
      if (newValue == 0) {
        this.$nextTick(() => {
          if (this.messageTimeSort) {
            setTimeout(() => {
              this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
            }, 0)
          } else {
            this.$refs.talkContent.scrollTop = 0
          }
        })
      }
    },
    searchValue (newValue) {
      if (newValue === '') {
        this.showMessage = this.allMessage
      } else {
        // 过滤出搜索关键字内容，同时对关键字进行高亮处理
        this.showMessage = cloneDeep(this.allMessage)
          .filter(item =>
            (item.contentType === 1 && filterHtmlTag(item.content).indexOf(newValue) !== -1) ||
            (item.username && item.username.indexOf(newValue) !== -1)
          )
          .map(item => {
            if (item.contentType === 1) {
              item.content = heightLight(filterHtmlTag(item.content, {
                excludeImg: true
              }), newValue)
            }
            if (item.username) item.username = heightLight(item.username, newValue)
            return item
          })
      }
      this.$nextTick(() => {
        if (this.messageTimeSort) {
          this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
        } else {
          this.$refs.talkContent.scrollTop = 0
        }
      })
    },
    searchFileValue (newValue) {
      let data
      if (newValue === '') {
        data = this.allFiles
      } else {
        // 过滤出搜索关键字内容，同时对关键字进行高亮处理
        data = cloneDeep(this.allFiles)
          .filter(item =>
            item.content.fileName.indexOf(newValue) !== -1 ||
            (item.username && item.username.indexOf(newValue) !== -1)
          )
          .map(item => {
            item.content.fileName = heightLight(item.content.fileName, newValue)
            if (item.username) item.username = heightLight(item.username, newValue)
            return item
          })
      }
      if (this.fileTimeSort) {
        data.sort((a, b) => a.sendTime < b.sendTime ? 1 : -1)
      } else {
        data.sort((a, b) => a.sendTime < b.sendTime ? -1 : 1)
      }
      this.showFiles = data
    }
  },
  methods: {
    // 获取全部数据
    openPanel () {
      if (
        this.currentGroupId === ''
        || this.currentGroupId !== this.$store.state.groupId
        || this.$store.state.hasNewMessage
      ) {
        this.currentGroupId = this.$store.state.groupId
        synergyRecordPage({
          id: this.initDate[this.initDate.length - 1].id,
          groupId: this.currentGroupId,
          pageSize: 1000000
        }).then(res => {
          chatDataHandler(res.recordList)
          const data = res.recordList.map(item => item.data).reverse()
          const lastData = cloneDeep(this.initDate[this.initDate.length - 1])
          lastData.sendTime = timeToFullTime(lastData.sendTime)
          data.push(lastData)
          data.forEach(item => {
            if (item.contentType == 1) {
              item.content = item.content.replace(/href=["|'].*?["|']/, '')
            }
          })
          this.showMessage = cloneDeep(data)
          this.allMessage = cloneDeep(data)
          this.setAllFile()
          this.$nextTick(() => {
            this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
          })
        })
      }
    },
    setAllFile () {
      const data = cloneDeep(this.allMessage)
        .filter(item => item.contentType === 9)
        .map(item => {
          if (item.sendTime && item.sendTime.length > 5) {
            if (new Date(item.sendTime).getFullYear() < new Date().getFullYear()) {
              item.showSendTime = formatDate(item.sendTime, 'YYYY/MM/DD')
            } else {
              item.showSendTime = formatDate(item.sendTime, 'MM/DD')
            }
          }
          return item
        }).reverse()
      this.showFiles = cloneDeep(data)
      this.allFiles = cloneDeep(data)
    },
    // 媒体类型数据处理
    mediaDataHandler (datas) {
      const newDatas = []
      datas.forEach(item => {
        let flag = false
        let index = -1
        const time = formatDate(item.sendTime, 'YYYY-MM-DD')
        for (let i = 0; i < newDatas.length; i++) {
          if (time === formatDate(newDatas[i].time, 'YYYY-MM-DD')) {
            flag = true
            index = i
            break
          }
        }
        if (flag) {
          newDatas[index].datas.push(item)
        } else {
          newDatas.push({
            time,
            datas: [item]
          })
        }
      })
      newDatas.forEach(item => {
        item.datas.reverse()
      })
      return newDatas.reverse()
    },
    switchMessageTimeSort () {
      this.messageTimeSort = !this.messageTimeSort
      this.$nextTick(() => {
        if (this.messageTimeSort) {
          this.$refs.talkContent.scrollTop = this.$refs.talkContent.scrollHeight
        } else {
          this.$refs.talkContent.scrollTop = 0
        }
      })
    },
    switchFileTimeSort () {
      this.fileTimeSort = !this.fileTimeSort
      this.showFiles.reverse()
    },
    closePanel () {
      this.searchValue = ''
    },
    fileAddressFormatFunc (item) {
      return fileAddressFormatUtil(item)
    },
    fileIcon (fileName) {
      return loadFileIcon(fileName)
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
  --hover-bg: #faf9f9;
  width: 320px;
  height: 100%;
  border-left: 1px solid #dadcdf;
}

.title {
  margin-top: 8px;
  padding: 12px 16px;
  font-weight: bold;
}

.search-wrapper {
  padding: 8px 16px;
  display: flex;
  align-items: center;

  .control-item {
    width: 54px;
    font-size: 12px;
    margin-left: 12px;
    color: #0078d4;
    cursor: pointer;
  }
}

.talk-content {
  height: calc(100vh - 195px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 8px 8px 16px;
  content-visibility: auto;
  contain-intrinsic-size: 1000px;

  & > .talk-item {
    font-size: 12px;
    text-align: center;
    padding: 8px 6px;
    border-radius: 6px;

    &:hover {
      background-color: var(--hover-bg);
    }

    & > .system-message {
      padding: 6px;
      border-radius: 4px;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      background-color: #e5e3e3;
    }

    /deep/ .el-image__inner {
      width: auto !important;
    }

    .reply-message {
      margin: 4px 0;
      padding: 8px 10px 6px 10px;
      border-radius: 6px;
      background-color: rgb(230, 233, 237);
      text-align: left;

      blockquote {
        margin-bottom: 6px;
        padding: 4px 4px 4px 8px;
        border-left: 2px solid #ccc;
        font-size: 12px;
        color: #57606f;
        cursor: pointer;

        &:hover {
          color: #0078d4;
        }

        .word-message {
          background-color: transparent;
          padding: 0;
          color: black;
          border-radius: 0;
        }

        /deep/ .el-image {
          display: flex;
          justify-content: flex-start;

          img {
            width: 160px;
            height: 90px;
          }
        }
      }

      /deep/ img {
        max-height: 72px;
        object-fit: contain;
        cursor: pointer;
      }

      /deep/ img.emotion {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        pointer-events: none;
      }
    }

    & > .content {
      width: 100%;
      text-align: left;
      user-select: text;
      word-break: break-all;
      white-space: pre-line;
      line-height: 1.2;

      /deep/ a {
        text-decoration: underline;
        color: rgb(36, 64, 179);

        &:visited {
          color: rgb(119, 28, 170);
        }
      }

      /deep/ img {
        max-height: 72px;
        object-fit: contain;
        cursor: pointer;
      }

      /deep/ img.emotion {
        width: 20px;
        height: 20px;
        vertical-align: middle;
        pointer-events: none;
      }
    }
  }
}

.image-container {
  height: calc(100vh - 150px);
  overflow-y: auto;
  overflow-x: hidden;
  margin-top: 10px;
  padding: 8px 16px;

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
  padding: 8px 16px;

  ul {
    font-size: 12px;

    & > li {
      width: 100%;
      margin-top: 4px;
      padding: 8px;
      border-radius: 6px;
      position: relative;

      &:hover {
        background-color: var(--hover-bg);
      }
    }
  }
}

.file-container {
  height: calc(100vh - 185px);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 8px 10px 8px 16px;

  & > .file-item {
    min-height: 50px;
    display: flex;
    align-items: center;
    padding: 8px;

    .file-name {
      width: 160px;
      margin-bottom: 4px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .show-source-message {
      color: #3498db;
      opacity: 0;
      cursor: pointer;
      transition: opacity 0.28s;
      white-space: nowrap;
    }

    &:hover {
      background-color: var(--hover-bg);

      .show-source-message {
        opacity: 1;
      }
    }
  }
}

.file-message {
  width: 245px;
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
      //width: 100%;
      padding: 2px 0;
      //display: flex;
      //align-items: center;
      //// 文字超出换行
      //word-wrap: break-word;
      //word-break: break-all;
      //overflow: hidden;
      width: 180px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
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

audio {
  width: 250px;
  height: 48px;
}
</style>
