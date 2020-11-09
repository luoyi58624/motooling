<template>
  <div class="layout">
    <div class="message-list">
      <message-list />
    </div>
    <div class="chat-panel">
      <transition>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
// import chatPanel from './chatPanel'
import messageList from './messageList'
export default {
  components: {
    // chatPanel,
    messageList
  }
}
</script>

<style scoped lang="less">
.layout{
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
}
</style>
