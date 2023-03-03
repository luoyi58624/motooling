<template>
  <Teleport to="body">
    <ul class="chat-message-context-menu" v-show="showMenu" :style="{left: left+'px',top: top+'px'}">
      <!--      <li class="chat-message-context-menu-copy"-->
      <!--          data-clipboard-action="copy" :data-clipboard-text="selectedMessage.content">-->
      <!--        <img :src="require('@/assets/svg/copy.svg')" alt=""/>-->
      <!--        <span>复制</span>-->
      <!--      </li>-->
      <!--      <li class="chat-message-context-menu-copy" @click="copyMsg">-->
      <!--        <img :src="require('@/assets/svg/copy.svg')" alt=""/>-->
      <!--        <span>复制</span>-->
      <!--      </li>-->
      <li @click="transpondMsg">
        <img :src="require('@/assets/svg/send.svg')" alt=""/>
        <span>转发</span>
      </li>
      <li v-if="selectedMessage.senderId!==$store.state.userInfo.uid" @click="replyMsg">
        <img :src="require('@/assets/svg/reply.svg')" alt=""/>
        <span>回复</span>
      </li>
      <li v-if="selectedMessage.contentType==4" @click="openVideo">
        <img :src="require('@/assets/svg/video.svg')" alt=""/>
        <span>在新窗口播放视频</span>
      </li>
      <li @click="revocationMsg" :class="{disabled: selectedMessage.loading}"
          v-if="selectedMessage.senderId===$store.state.userInfo.uid">
        <!--        <img :src="require('@/assets/svg/return.svg')" alt=""/>-->
        <svg t="1666174869020" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
             p-id="4356" width="16" height="16">
          <path
            d="M624 288H236.8l105.6-105.6c12.8-12.8 12.8-32 0-44.8s-32-12.8-44.8 0l-160 160c-3.2 3.2-6.4 6.4-6.4 9.6-3.2 9.6-3.2 16 0 25.6 3.2 3.2 3.2 6.4 6.4 9.6l160 160c6.4 6.4 12.8 9.6 22.4 9.6s16-3.2 22.4-9.6c12.8-12.8 12.8-32 0-44.8L236.8 352h387.2c115.2 0 208 92.8 208 208S739.2 768 624 768H252.8c-19.2 0-32 12.8-32 32s12.8 32 32 32h371.2c150.4 0 272-121.6 272-272S774.4 288 624 288z"
            p-id="4357"></path>
        </svg>
        <span>撤回</span>
      </li>
    </ul>
  </Teleport>
</template>

<script>
import Teleport from 'vue2-teleport'
import ClipboardJS from 'clipboard'
import { sendMessage } from '@/api/synergy/synergy'

export default {
  name: 'ContextMenu',
  components: {
    Teleport
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showMenu: false,
      left: 0,
      top: 0,
      selectedMessage: {},
      event: null
    }
  },
  model: {
    prop: 'value',
    event: 'closeMenu'
  },
  watch: {
    showMenu (newValue) {
      if (newValue) {
        document.addEventListener('click', this.closeContextMenu)
      }
    }
  },
  methods: {
    openContextMenu (event, selectedMessage) {
      this.event = event
      event.preventDefault()
      this.showMenu = true
      this.left = event.clientX + 192 > window.innerWidth ? event.clientX - 192 : event.clientX
      this.top = event.clientY + 112 > window.innerWidth ? event.clientY - 112 : event.clientY
      this.selectedMessage = selectedMessage
    },
    closeContextMenu () {
      this.showMenu = false
      document.removeEventListener('click', this.closeContextMenu)
    },
    copyMsg (e) {
      // navigator.clipboard.writeText(this.selectedMessage.content.replace(//))
    },
    transpondMsg () {
      this.$store.state.showTranspondMsgPanel = true
      this.$store.state.transpondMsg = this.selectedMessage
    },
    replyMsg () {
      this.$emit('replyMsg', this.selectedMessage)
    },
    openVideo(){
      window.open(this.selectedMessage.content)
    },
    // 撤回消息
    revocationMsg () {
      if (!this.selectedMessage.loading) {
        sendMessage({
          groupId: this.$store.state.groupId,
          senderId: this.$store.state.userInfo.uid,
          contentType: 8,
          content: '',
          id: this.selectedMessage.id
        }).then((res) => {
          this.$emit('revocationMsg', res)
        })
      }
    }
  },
  mounted () {
    // eslint-disable-next-line no-new
    new ClipboardJS('.chat-message-context-menu-copy')
  }
}
</script>

<style scoped lang="less">
.chat-message-context-menu {
  width: 180px;
  padding: 6px 6px 8px 6px;
  border-radius: 6px;
  position: absolute;
  z-index: 1000000;
  background: white;
  color: #2c3e50;
  box-shadow: 0 0 1.1px rgba(0, 0, 0, 0.065),
  0 0 3.6px rgba(0, 0, 0, 0.095),
  0 0 16px rgba(0, 0, 0, 0.16);

  & > li {
    width: 100%;
    height: 30px;
    border-radius: 4px;
    margin-top: 2px;
    padding-left: 10px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;

    &.disabled {
      color: #c2c2c2;
      cursor: not-allowed;

      & > svg {
        fill: #c2c2c2;
      }
    }

    &:hover {
      background-color: #f1f2f6;
    }

    & > img {
      width: 16px;
      height: 16px;
    }

    & > span {
      margin-left: 8px;
    }
  }
}
</style>
