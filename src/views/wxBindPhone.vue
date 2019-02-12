<template>
    <div>
      <div class="title">
        绑定手机
      </div>
      <cu-input label="手机号" v-model="submitmodel.mobile" placeholder="输入" >
      </cu-input>
      <cu-input label="手机验证码" v-model="submitmodel.phoneCode" placeholder="输入" >
      </cu-input>
      <cube-button type="button" @click="getCode">获取手机验证码</cube-button>
      <cu-input label="企业域名" v-model="submitmodel.webUrl" placeholder="输入" >
      </cu-input>
      <cu-input label="微信头像" v-model="submitmodel.headImgUrl" placeholder="输入" >
      </cu-input>
      <cu-input label="昵称" v-model="submitmodel.nickname" placeholder="输入" >
      </cu-input>
      <cu-input label="unionid" v-model="submitmodel.unionid" placeholder="输入" >
      </cu-input>
      <cu-input label="openId" v-model="submitmodel.openId" placeholder="输入" >
      </cu-input>
      <cu-input label="性别" v-model="submitmodel.sex" placeholder="输入" >
      </cu-input>

      <cube-button type="button" @click="submit">提交保存</cube-button>

    </div>
  </template>

<script>
// import { getUrlQueryString } from '@/utils/utils.js'
import { getPhoneCode, wxBindPhone } from '@/api/login'
import CuInput from '@/components/input/Input'
export default {
  data () {
    return {
      state: '',
      companyId: '',
      appid: 'wx70214a3c12e8e576',
      wxLinkBase: 'https://open.weixin.qq.com/connect/oauth2/authorize',
      redirect_uri: 'http://www.motooling.com/mthtml/wxloginSuccess',
      submitmodel: {
        mobile: '18565705036',
        city: '',
        country: '',
        headImgUrl: '',
        nickname: '',
        openId: '',
        privilege: '',
        province: '',
        sex: '',
        unionid: ''
      }
    }
  },
  computed: {
    wxLoginLink () {
      return this.wxLinkBase + '?appid=' + this.appid + '&redirect_uri=' + encodeURIComponent(this.redirect_uri) + '&response_type=code&scope=snsapi_userinfo&state=' + encodeURIComponent(this.state) + '#wechat_redirect'
    }
  },
  methods: {
    getCode () {
      getPhoneCode(this.submitmodel.mobile, 1)
        .then(function (res) {
          console.log(res)
          // TODO 处理验证码倒计时
        })
        .catch(err => {
          console.log(err)
        })
    },
    submit () {
      console.log('提交')
      wxBindPhone(this.submitmodel)
        .then(function (res) {
          let rdata = JSON.parse(res.data.resultData)
          console.log(rdata)
          if (rdata.status === 0) {
            self.$router.replace('/person/add')
          } else {
            alert(rdata.msg)
          }
        }).catch(err => {
          console.log(err)
        })
    }
  },
  created () {
    // this.companyId = getUrlQueryString('companyId')
    // if (this.companyId) {
    //   this.state = this.companyId
    // }else{
    //   this.state =  1
    // }
    // self.resString = res.data.resultData
    if (sessionStorage.getItem('wechatInfo')) {
      this.submitmodel = JSON.parse(sessionStorage.getItem('wechatInfo'))
    }
    if (sessionStorage.getItem('weburl')) {
      this.submitmodel.webUrl = sessionStorage.getItem('weburl')
    }
  },
  components: {
    CuInput
  }
}

</script>

  <style scoped>
    .title{
      text-align: center
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

  </style>
