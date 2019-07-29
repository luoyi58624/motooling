<template>
  <div class="wrap">
    <div>
      <div class="wrap-item">
        <div class="item-label">
          纪要编号
        </div>
        <div>{{ summary.summaryNo }}</div>
      </div>
      <div class="wrap-item">
        <div class="item-label">
          纪要主题
        </div>
        <div>{{ summary.summarySubject }}</div>
      </div>
      <div class="wrap-item">
        <div class="item-label">
          纪要内容
        </div>
        <div class="summary-recordlist">
          <template v-if="summaryRecordList.length>0">
          <div class="content-item" v-for="item in summaryRecordList" :key="item.id">
            <span> {{ item.username }} </span>:
            <template v-if="item.contentType===1">
              <span>
                {{ item.content }}
              </span>
            </template>
            <template v-if="item.contentType===2">
              <span @click="showImagePreview(fileAddressFormatFunc(item.content))">
                <img :src="fileAddressFormatFunc(item.smallImg)" />
              </span>
            </template>
            <template v-if="item.contentType===3">
              <span>
                <audio :src="fileAddressFormatFunc(item.content)" controls></audio>
              </span>
            </template>
            <template v-if="item.contentType===4">
              <video :src="fileAddressFormatFunc(item.content)" controls></video>
            </template>
            <div class="right">{{ item.senderTime }}</div>
          </div>
          </template>
          <template v-if="summaryRecordList.length===0">
            没有可供生成会议纪要的聊天记录
          </template>
        </div>
      </div>
    </div>
    <div class="bottom" v-if="type==='new' && summaryRecordList.length>0">
      <input
        type="text"
        placeholder="结论"
        v-model="summary.verdict"
        class="verdict-content"
      />
      <button class="sub-btn" @click="submit">提交</button>
    </div>
  </div>
</template>
<script>
import { fileAddressFormat } from '@/utils/utils.js'
import {
  generateSummaryInfo,
  generateSummary,
  getSummaryInfo
} from '@/api/synergy/synergy.js'

export default {
  data () {
    return {
      type: this.$route.params.type,
      // 纪要id
      summaryId: this.$route.params.id,
      // 最后记录id
      lastRecordId: this.$route.params.id,
      groupId: this.$route.params.groupId,
      summaryRecordList: [],
      summary: {
        groupId: 0,
        summarySubject: '',
        summaryNo: '',
        verdict: ''
      },
      contentList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    fileAddressFormatFunc (url) {
      return fileAddressFormat(url)
    },
    init () {
      if (this.type === 'new') {
        this.getGenerateSummaryInfo()
      } else if (this.type === 'detail') {
        this.getGenerateSummary()
      }
    },
    getGenerateSummaryInfo () {
      generateSummaryInfo({
        groupId: this.$route.params.groupId,
        lastRecordId: this.lastRecordId
      })
        .then(res => {
          this.summary = res.summary
          this.summaryRecordList = res.recordList
          this.contentList = res.recordList
        })
        .catch(
          (err) => {
            console.log(err)
            this.$createToast({
              time: 5000,
              txt: err.msg,
              type: 'error'
            }).show()
          }
        )
    },
    // 获取纪要详情
    getGenerateSummary () {
      getSummaryInfo({
        summaryId: this.summaryId
      })
        .then((res) => {
          console.log(res)
          this.summary = res.summary
          this.summaryRecordList = res.contentList
          this.contentList = res.contentList
        })
        .catch(
          (err) => {
            console.log(err)
            this.$createToast({
              time: 5000,
              txt: err.msg,
              type: 'error'
            }).show()
          }
        )
    },

    submit () {
      generateSummary({
        summary: this.summary,
        contentList: this.contentList
      })
        .then(() => {
          this.$createToast({
            time: 2000,
            txt: '生成纪要成功!',
            type: 'correct'
          }).show()
        })
        .catch(err => {
          console.log(err)
          this.$createToast({
            time: 2000,
            txt: err.msg,
            type: 'error'
          }).show()
        })
    }
  }
}
</script>
<style scoped lang="less">
  video,
  audio {
    max-width: 100%;
  }
  .right {
    text-align: right;
  }
  .wrap {
    padding-bottom: 60px;
  }
  .wrap-item {
    display: flex;
    margin: 0 20px;
    padding: 20px 0;
    border-bottom: 1px solid #e9e9e9;
    font-size: 16px; /* no */
  }
  .wrap-item:last-child {
    border: none;
  }
  .item-label {
    padding-right: 20px;
    flex: none;
  }
  .summary-recordlist {
    line-height: 1.3;
    word-break: break-all;
    .content-item {
      img{
        max-width: 100%;
      }
    }
  }

  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    background: #ffffff;
  }
  .verdict-content {
    background: #eeeeee;
    padding: 6px;
    margin-right: 10px;
    flex: auto;
    border-radius: 8px;
    font-size: 16px; /* no */
  }
  .sub-btn {
    background: #5797fc;
    color: #ffffff;
    font-size: 14px;
    padding: 6px 8px;
    border-radius: 8px;
    border: 1px solid #5797fc;
  }
</style>
