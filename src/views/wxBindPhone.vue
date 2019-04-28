<template>
  <div class="login">
    <div class="group">
      <div class="logo-wrapper">
        <img class="logo" alt="logo" src="../assets/logo.png">
      </div>
    </div>
    <div class="text-bindphone">绑定手机号码</div>
    <div class="group">
      <cube-input v-model="submitmodel.mobile" placeholder="请输入手机号码" type="text" :maxlength="11" :autocomplete="true"></cube-input>
      <cube-input v-model="submitmodel.phoneCode" placeholder="请输入验证码" type="tel" :maxlength="6" :autocomplete="false">
      <cube-button slot="append" :inline="true" @click="getCode" :disabled="timeDisabled">{{timeContent}}</cube-button>
      </cube-input>
    </div>
    <div class="hidden">
      <cu-input label="企业域名" v-model="submitmodel.webUrl" placeholder="输入">
      </cu-input>
      <cu-input label="微信头像" v-model="submitmodel.headImgUrl" placeholder="输入">
      </cu-input>
      <cu-input label="昵称" v-model="submitmodel.nickname" placeholder="输入">
      </cu-input>
      <cu-input label="unionid" v-model="submitmodel.unionid" placeholder="输入">
      </cu-input>
      <cu-input label="openId" v-model="submitmodel.openId" placeholder="输入">
      </cu-input>
      <cu-input label="性别" v-model="submitmodel.sex" placeholder="输入">
      </cu-input>
      <cu-input label="类型" v-model="submitmodel.type" placeholder="输入">
      </cu-input>
    </div>
    <div class="group">
      <cube-button @click="submit">进入</cube-button>
    </div>
    <!-- <cube-button class="submit-btn" type="button" @click="submit">提交保存</cube-button> -->

  </div>
</template>

<script>
import { getUrlQueryString } from '@/utils/utils.js'
import { getPhoneCode, wxBindPhone } from '@/api/login'
import CuInput from '@/components/input/input'
export default {
  data () {
    return {
      timeContent: '获取验证码',
      timeDisabled: false,
      totalTime: 60,
      state: '',
      companyid: '',
      appid: 'wx70214a3c12e8e576',
      wxLinkBase: 'https://open.weixin.qq.com/connect/oauth2/authorize',
      redirect_uri: 'http://www.motooling.com/mthtml/wxloginSuccess',
      submitmodel: {
        mobile: '',
        city: '',
        country: '',
        headImgUrl: '',
        nickname: '',
        openId: '',
        privilege: '',
        province: '',
        sex: '',
        unionid: '',
        type: 0
      }
    }
  },
  computed: {
    wxLoginLink () {
      return this.wxLinkBase + '?appid=' + this.appid + '&redirect_uri=' + encodeURIComponent(this.redirect_uri) + '&response_type=code&scope=snsapi_userinfo&state=' + encodeURIComponent(this.state) + '#wechat_redirect'
    }
  },
  methods: {
    countDown () {
      this.timeDisabled = true
      let clock = setInterval(() => {
        this.timeContent = this.totalTime + 's 后重新获取'
        this.totalTime--
        if (this.totalTime < 0) { // 当倒计时小于0时清除定时器
          window.clearInterval(clock)
          this.timeContent = '重新获取'
          this.totalTime = 60
          this.timeDisabled = false
        }
      }, 1000)
    },
    getCode () {
      let self = this
      this.countDown()
      getPhoneCode(this.submitmodel.mobile, 1)
        .then(function (res) {
          console.log(res)
          // TODO 处理验证码倒计时
          const toast = self.$createToast({
            time: 2000,
            txt: '获取验证码成功',
            type: 'correct'
          })
          toast.show()
        })
        .catch(err => {
          console.log(err)
        })
    },
    submit () {
      let self = this
      console.log('提交')
      wxBindPhone(this.submitmodel)
        .then(function (res) {
          let rdata = res.data
          console.log(rdata)
          if (rdata.status === 0) {
            alert('提交成功')
            localStorage.removeItem('type')
            self.$router.replace('/wxlogin?redirectURL=' + getUrlQueryString('redirectURL'))
          } else {
            alert('提交失败' + rdata.msg)
          }
        }).catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    // this.companyid = getUrlQueryString('companyid')
    // if (this.companyid) {
    //   this.state = this.companyid
    // }else{
    //   this.state =  1
    // }
    // self.resString = res.data.resultData
    console.log(sessionStorage)
    if (sessionStorage.getItem('wechatInfo')) {
      this.submitmodel = JSON.parse(sessionStorage.getItem('wechatInfo'))
    }
    // 邀请类型
    if (sessionStorage.getItem('type')) {
      this.submit.type = parseInt(sessionStorage.getItem('type'))
    }
    if (localStorage.getItem('WEBURL')) {
      this.submitmodel.webUrl = localStorage.getItem('WEBURL')
    }
  },
  components: {
    CuInput
  }
}

</script>

<style scoped>
  .title {
    text-align: center;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
  }

  .constom-input {
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
  }

  .constom-input_label {
    font-size: 16px;
    width: 100px;
    padding-right: 10px;
    display: flex;
    align-items: center;
    word-wrap: break-word;
    word-break: break-word;
  }

  .constom-input_content {
    flex: 1
  }

  .cube-input::after {
    display: none
  }

  .logo-wrapper {
    margin: auto;
    text-align: center;
    padding-top: 20px;
  }

  .logo {
    width: 100px;
    height: 100px;
  }

  .login {
    height: 100%;
    background: #efeff4;
  }

  .group {
    margin-bottom: 16px;
  }

  .code-input {
    display: flex
  }

  .code-btn {
    width: 100px;
  }

  .submit-btn {
    margin-top: 10px;
  }

  .text-bindphone{
    text-align: center;
    font-size: 20px;
    padding-bottom: 8px;
    color: #444444;
  }

</style>
