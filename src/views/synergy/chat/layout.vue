<template>
  <div class="layout">
    <div class="message-list">
      <message-list @add-user="show = true" />
    </div>
    <div class="chat-panel">
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
    <div class="add-user" v-show="show">
      <UserSelect @confirm="confirm" :visible.sync="show" @cancel="show=false" />
    </div>
  </div>
</template>

<script>
// import chatPanel from './chatPanel'
import { getOpenSynergy } from '@/api/synergy/synergy.js'
import UserSelect from '@/components/UserSelect.vue'
import messageList from './messageList'
export default {
  components: {
    // chatPanel,
    messageList,
    UserSelect
  },
  data () {
    return {
      show: false
    }
  },
  methods: {
    confirm () {
      // userSelectedList
      this.show = false
      let userCount = this.$store.state.userSelectedList
      let parameter = this.shiftParameter(userCount)
      getOpenSynergy(
        parameter
      ).then(res => {
        console.log('userlist', res)
      })
    },
    shiftParameter (data) {
      let relationType = ''
      let relationId = ''
      let uList = []
      if (data.length === 1) {
        relationType = '66'
        relationId = data[0].uid
        return {
          relationId, relationType
        }
      } else {
        relationType = '666'
        uList = data.map(item => {
          return { uid: item.uid, userName: item.username }
        })
        return {
          relationType, uList
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.layout{
  position: relative;
  height: 100%;
  font-size: 16px;
  display: flex;
  .message-list {
    width: 260px;
    flex: 0 0 auto;
    overflow-y: auto;
    background-color: #e6e8eb;
  }
  .chat-panel {
    flex: 1;
  }
  .add-user {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 70%;
  }
}
</style>
