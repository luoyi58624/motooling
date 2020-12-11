import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'
const isiOS = function () {
  const u = navigator.userAgent
  return u.indexOf('iPhone') > -1 || u.indexOf('Mac OS') > -1
}

export default new Vuex.Store({
  state: {
    // 用户选择组件选中的值
    userSelectedList: [],
    founderList: [],
    founderManagerList: [],
    verifyerList: [],
    verifyerManagerList: [], // 检查通知list
    ratifyerList: [], // 特采人员list
    ratifyerManagerList: [],
    // 协同成员
    synergyMemberList: [],
    // 对部门发料
    wuliaoList: [],
    wxSignUrl: '', // 调用微信jssdk接口所需要的url地址
    // 当前聊天对象
    chatTargetInfo: {},
    newsList: [],
    latestMessageId: null,
    notReadCount: null,
    value: null,
    uid: null
  },
  mutations: {
    changeUserSelectedList (state, newArr) {
      state.userSelectedList = newArr
    },
    changeReciveList (state, newArr) {
      state.founderList = newArr
    },
    changeVerifyerList (state, newArr) {
      state.verifyerList = newArr
    },
    changeFounderManagerList (state, newArr) {
      state.founderManagerList = newArr
    },
    changeVerifyerManagerList (state, newArr) {
      state.verifyerManagerList = newArr
    },
    changeRatifyerList (state, newArr) {
      state.ratifyerList = newArr
    },
    changeRatifyerManagerList (state, newArr) {
      state.ratifyerManagerList = newArr
    },
    changeSynergyMemberList (state, newArr) {
      state.synergyMemberList = newArr
    },
    changeWuliaoList (state, newArr) {
      state.wuliaoList = newArr
    },
    setWechatSignUrl (state, wxSignUrl) {
      // 关键点
      // IOS仅记录第一次进入页面时的URL
      // IOS微信切换路由实际URL不变，只能使用第一进入页面的URL进行签名
      if (isiOS() && state.wxSignUrl !== '') {
        return
      }
      state.wxSignUrl = wxSignUrl
    },
    setChatTargetInfo (state, data) {
      state.chatTargetInfo = data
    },
    SET_NEWS_LIST: (state, list) => {
      state.newsList = list
    },
    LATEST_MESSAGE_ID: (state, id) => {
      state.latestMessageId = id
    },
    NOT_READ_COUNT: (state, count) => {
      state.notReadCount = count
    },
    VALUE: (state, value) => {
      state.value = value
    },
    USER_INFO: (state, uid) => {
      state.uid = uid
    }
  },
  actions: {
    getNewGroupMember ({ commit }, data) {
      commit('changeUserSelectedList', data)
    },
    newsList ({ commit }, list) {
      commit('SET_NEWS_LIST', list)
    },
    latestMessageId ({ commit }, id) {
      commit('LATEST_MESSAGE_ID', id)
    },
    notReadCount ({ commit }, count) {
      commit('NOT_READ_COUNT', count)
    },
    value ({ commit }, value) {
      commit('VALUE', value)
    },
    userInfo ({ commit }, uid) {
      commit('USER_INFO', uid)
    }
  },
  getters: {
    getWechatSignUrl: state => state.wxSignUrl
  }
})
