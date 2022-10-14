<template>
  <Teleport to="body">
    <ul class="chat-message-context-menu"
        v-show="showMenu"
        :style="{left: left+'px',top: top+'px'}">
      <li class="chat-message-context-menu-copy"
          data-clipboard-action="copy"
          :data-clipboard-text="messageItem.content">
        <img :src="require('@/assets/svg/copy.svg')"/>
        <span>复制</span>
      </li>
      <li>
        <img :src="require('@/assets/svg/send.svg')"/>
        <span>转发</span>
      </li>
      <li @click="revocationMsg">
        <img :src="require('@/assets/svg/return.svg')"/>
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
      messageItem: {},
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
    openContextMenu (event, messageItem) {
      // console.log(messageItem)
      this.event = event
      event.preventDefault()
      this.showMenu = true
      this.left = event.clientX + 192 > window.innerWidth ? event.clientX - 192 : event.clientX
      this.top = event.clientY + 112 > window.innerWidth ? event.clientY - 112 : event.clientY
      this.messageItem = messageItem
    },
    closeContextMenu () {
      this.showMenu = false
      document.removeEventListener('click', this.closeContextMenu)
    },
    // 撤回消息
    revocationMsg () {
      sendMessage({
        groupId: this.$store.state.groupId,
        senderId: this.$store.state.userInfo.uid,
        contentType: 8,
        content: '',
        id: this.messageItem.id
      }).then((res) => {
        this.$emit('revocationMsg', res)
      })
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
  padding: 8px 6px;
  border-radius: 6px;
  position: absolute;
  background: white;
  color: #2c3e50;
  box-shadow: 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
  22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
  100px 100px 80px rgba(0, 0, 0, 0.07);

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
