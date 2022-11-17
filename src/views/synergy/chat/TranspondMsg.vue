<template>
  <el-dialog title='选择需要转发的群聊' :visible.sync="$store.state.showTranspondMsgPanel" width="60%"
             @open="openHandler" @close="colseHandler">
    <div class="container">
      <div class="user-group-container">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
          全选
        </el-checkbox>
        <el-checkbox-group class="user-group" v-model="checkList" @change="handleCheckedChange">
          <el-checkbox v-for="item in newsList" :key="item.groupId" :label="item" class="user-item">
            <div class="content">
              <img v-if="item.relationType === 66" :src="item.avatar"/>
              <img v-else :src="require('@/assets/group.png')"/>
              <span>{{ item.username || item.subject }}</span>
            </div>
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="selected-container">
        <div class="title">
          分别转发给 * 已选择 {{ checkList.length }} 个聊天
        </div>
        <ul :style="{height: (310-messageContentHeight)+'px'}">
          <li v-for="item in checkList" :key="item.groupId">
            <img v-if="item.relationType === 66" :src="item.avatar"/>
            <img v-else :src="require('@/assets/group.png')"/>
            <span>{{ item.username || item.subject }}</span>
          </li>
        </ul>
        <template v-if="transpondMsg != null">
          <div class="message-content" :style="{height: messageContentHeight+'px'}">
            <div v-if="transpondMsg.contentType == 1" v-html="transpondMsg.content"
                 class="word-message"
                 :style="{height: messageContentHeight+'px',lineHeight:messageContentHeight+'px'}"/>
            <div class="message" v-else-if="transpondMsg.contentType == 2 || transpondMsg.contentType == 6">
              <el-image style="width: 160px; height: 90px;" fit="scale-down"
                        :src="fileAddressFormatFunc(transpondMsg)"
                        :preview-src-list="[fileAddressFormatFunc(transpondMsg)]"/>
            </div>
            <div class="message" v-else-if="transpondMsg.contentType == 3">
              <audio :src="fileAddressFormatFunc(transpondMsg)" controls="controls"/>
            </div>
            <div class="message" v-else-if="transpondMsg.contentType == 4">
              <video :src="fileAddressFormatFunc(transpondMsg)" controls="controls" width="250" height="90"/>
            </div>
            <div class="message" v-else-if="transpondMsg.contentType == 9">
              <div class="file-message-container">
                <div class="file-message">
                  <div class="file-info">
                    <div class="name">{{ transpondMsg.content.fileName }}</div>
                    <div class="size">{{ transpondMsg.content.fileSize }}</div>
                  </div>
                  <div class="file-icon">
                    <el-image style="width: 36px;height: 36px;" :src="fileIcon(transpondMsg.content.fileName)"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <el-input placeholder="留言" v-model="leaveWord"/>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">发 送</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'
import { fileAddressFormatUtil, loadFileIcon } from '@/utils/utils'
import { cloneDeep } from 'lodash'
import { Notify } from 'vant'

export default {
  name: 'TranspondMsg',
  computed: {
    ...mapState({
      transpondMsg: (state) => state.transpondMsg,
    }),
    messageContentHeight () {
      return this.transpondMsg && this.transpondMsg.contentType == 1 ? 50 : 100
    }
  },
  data () {
    return {
      checkAll: false,
      isIndeterminate: false,
      checkList: [],
      newsList: [],
      leaveWord: ''
    }
  },
  methods: {
    openHandler () {
      this.newsList = cloneDeep(this.$store.state.newsList)
    },
    colseHandler () {
      this.checkAll = false
      this.isIndeterminate = false
      this.checkList = []
      this.$store.state.transpondMsg = null
    },
    confirm () {
      if (this.checkList.length > 0) {
        this.$emit('sendMsg', this.checkList, this.$store.state.transpondMsg, this.leaveWord)
        this.$store.state.showTranspondMsgPanel = false
      } else {
        Notify({
          message: '请选择需要转发的群聊',
          type: 'warning'
        })
      }
    },
    cancel () {
      this.$store.state.showTranspondMsgPanel = false
    },
    handleCheckAllChange (val) {
      this.checkList = val ? this.newsList : []
      this.isIndeterminate = false
    },
    handleCheckedChange (value) {
      let checkedCount = value.length
      this.checkAll = checkedCount === this.newsList.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.newsList.length
    },
    fileAddressFormatFunc (item) {
      return fileAddressFormatUtil(item)
    },
    fileIcon (fileName) {
      return loadFileIcon(fileName)
    },
  }
}
</script>

<style scoped lang="less">
.container {
  height: 400px;
  display: flex;

  .user-group-container {
    width: 50%;
    height: 100%;
    overflow-y: auto;

    .user-group {
      display: flex;
      flex-direction: column;

      .user-item {
        margin-top: 8px;
        display: flex;
        align-items: center;

        .content {
          display: flex;
          align-items: center;

          img {
            width: 24px;
            height: 24px;
          }

          span {
            margin-left: 12px;
          }
        }
      }
    }
  }

  .selected-container {
    width: 50%;
    height: 100%;
    margin-left: 2px;
    border-left: 1px solid #868e96;
    padding: 8px;

    .title {
      margin-bottom: 8px;
    }

    ul {
      width: 100%;
      overflow-y: auto;

      li {
        width: 98%;
        height: 36px;
        line-height: 36px;
        padding: 0 18px;
        margin: 6px 0;
        border-radius: 36px;
        background-color: #dee2e6;
        display: flex;
        align-items: center;

        img {
          width: 24px;
          height: 24px;
        }

        span {
          margin-left: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .message-content {
      width: 100%;
      margin-top: 12px;
      margin-bottom: 8px;

      .word-message {
        width: 100%;
        padding: 0 12px;
        box-sizing: border-box;
        background-color: rgb(222, 224, 227);
        border-radius: 6px;
        overflow: hidden;

        /deep/ img {
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
      }

      .message {
        width: 100%;
        height: 100%;
        padding: 5px 12px;
        box-sizing: border-box;
        background-color: rgb(250, 249, 249);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .file-message {
        width: 250px;
        margin-top: 4px;
        padding: 12px 10px;
        background-color: white;
        border: 1px solid #cccccc;
        border-radius: 6px;
        display: flex;
        justify-content: space-between;
        position: relative;

        & > .file-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          & > .name {
            width: 180px;
            padding: 2px 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          & > .size {
            color: #636e72;
            margin-top: 8px;
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
}


</style>
