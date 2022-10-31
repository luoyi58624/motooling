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
    showUserSelectPanel: false, // 是否显示用户选择弹窗
    isChatAddUser: false, // 是否从群聊里拉人，如果true，UserSelect.vue将进行初始化群员
    allDepUser: [], // 所有部门用户 -> 部门数组嵌套用户
    userSelectedList: [], // 用户选择组件选中的值 - 群聊所有群成员
    founderList: [],
    founderManagerList: [],
    verifyerList: [],
    verifyerManagerList: [], // 检查通知list
    ratifyerList: [], // 特采人员list
    ratifyerManagerList: [],
    synergyMemberList: [], // 协同成员
    wuliaoList: [], // 对部门发料
    wxSignUrl: '', // 调用微信jssdk接口所需要的url地址
    chatTargetInfo: {}, // 当前聊天对象
    newsList: [],
    userInfo: {},
    latestMessageId: null,
    notReadCount: null,
    value: null,
    relationType: null,
    groupAt: false, // 输入@后是否显示用户列表
    wordContent: '', // 聊天编辑器输入的内容
    editor: null, // 编辑器对象
    groupId: null, // 当前群组ID
    messageDraft: [], // 消息草稿
    chattingTarget: {}, // 聊天目标
    /**
     * 保存所有群聊消息
     * messageRecord: [
     *   {
     *     groupId: Number  // 群组ID
     *     messages: []     // 当前群聊所有消息
     *     historyMessages: []
     *   }
     * ]
     */
    messageRecord: []
  },
  getters: {
    getWechatSignUrl: state => state.wxSignUrl,
    // 根据部门成员返回成员列表
    allUser: state => {
      const users = []
      state.allDepUser.forEach(dep => {
        dep.childrenList.forEach(item => {
          users.push(item)
        })
      })
      return users
    }
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
    USER_INFO: (state, data) => {
      state.userInfo = data
    },
    currentConversation: (state, { groupId, relationType }) => {
      state.groupId = groupId
      state.relationType = relationType
    },
    // 创建草稿消息分租，只创建不存在的草稿组
    createMessageDraftGroup: (state, data) => {
      const index = state.messageDraft.findIndex(item => {
        return item.groupId === data.groupId
      })
      if (index === -1) {
        state.messageDraft.push(data)
      }
    },
    // 设置草稿消息
    setDraftMessage: (state, message) => {
      state.messageDraft.forEach(item => {
        if (item.groupId === state.groupId) item.message = message
      })
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
    }
  }
})
