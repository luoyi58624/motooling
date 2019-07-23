import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    founderList: [],
    founderManagerList: [],
    verifyerList: [],
    verifyerManagerList: [], // 检查通知list
    ratifyerList: [], // 特采人员list
    ratifyerManagerList: [],
    // 协同成员
    synergyMemberList: []
  },
  mutations: {
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
    }
  }
})
