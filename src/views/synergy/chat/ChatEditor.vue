<template>
  <div ref="chatEditorContainer" class="chat-editor-container">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="$store.state.editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 112px; overflow-y: hidden;"
      :value="value"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
      @customPaste="customPaste"
    />
    <emotion-panel/>
  </div>
</template>

<script>
import eventBus from '@/utils/mitt'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { execUploadFile } from '@/utils/projectUtils'
import { getChatEditorConfig } from '@/plugins/wangEditor/EditorConfig'
import EmotionPanel from '@/views/synergy/chat/EmotionPanel'

export default {
  name: 'ChatEditor',
  components: {
    EmotionPanel,
    Editor,
    Toolbar
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      toolbarConfig: {
        toolbarKeys: ['myUploadImage', 'myUploadVideo', 'myUploadFile', 'myEmotions', 'myHistory', 'mySendMsg']
      },
      editorConfig: getChatEditorConfig(),
      mode: 'default'
    }
  },
  methods: {
    onCreated (editor) {
      this.$store.state.editor = Object.seal(editor)
    },
    onChange (editor) {
      this.$store.commit('setDraftMessage', editor.getHtml())
      this.$emit('change', editor.getHtml())
    },
    sendMsg () {
      const images = this.$store.state.editor.getElemsByType('image')
      const text = this.$store.state.editor.getText().trim() // 纯文字
      // let sendText = '' // 发送的文字消息
      // const userIds = [] // @用户id集合，如果是所有则是

      // 当编辑器没有图片和文字时，弹窗提示框
      if ((images == null || images.length === 0) && text === '') {
        this.$createToast({
          time: 2000,
          txt: '请输入要发送的内容'
        }).show()
        return
      }

      // 当存在图片，触发发送文件事件
      // if (images && images.length > 0) {
      //   images.forEach(image => {
      //     let params = { contentType: 2, smallImg: image.alt, content: image.src }
      //     eventBus.emit('handleMessage', params)
      //   })
      // }
      // 有文字消息，触发发送文字事件
      if (text !== '') {
        // this.$store.state.editor.children.forEach(paragraph => {
        //   paragraph.children.forEach((item, index) => {
        //     if (item.type == null) {
        //       sendText += fillHtmlBlank(item.text)
        //     } else if (item.type === 'mention') {
        //       sendText += ('@' + item.value + ' ')
        //       userIds.push(item.info.id)
        //     }
        //
        //     if (index === paragraph.children.length - 1) {
        //       sendText += '\n'
        //     }
        //   })
        // })
        // eventBus.emit('sendWordMessage', {
        //   text: sendText,
        //   userIds: userIds.join(',')
        // })
        eventBus.emit('sendWordMessage', {
          text: this.$store.state.editor.getHtml()
          // userIds: userIds.join(',')
        })
      }
      // 清空编辑器
      this.$store.state.wordContent = ''
    },
    keyupSendMsg (e) {
      if (!e.ctrlKey && e.key === 'Enter') this.sendMsg()
    },
    // 如果粘贴的是视频、音频、文件，则直接发送
    customPaste (editor, event) {
      if (event.clipboardData.files.length > 0) {
        const files = event.clipboardData.files
        for (let i = 0; i < files.length; i++) {
          // 排除图片，图片要先在编辑框显示，不能直接发送到聊天框
          if (!/image/.test(files[i].type)) {
            execUploadFile(files[i])
          }
        }
      }
    }
  },
  mounted () {
    eventBus.on('sendMsg', this.sendMsg)
    this.$refs.chatEditorContainer.addEventListener('keyup', this.keyupSendMsg)
  },
  beforeDestroy () {
    eventBus.off('sendMsg', this.sendMsg)
    this.$refs.chatEditorContainer.removeEventListener('keyup', this.keyupSendMsg)
    this.$store.state.editor.destroy()
  }
}
</script>

<style lang="less">
.chat-editor-container {
  border: 1px solid #ccc;
  position: relative;
}

.w-e-drop-panel {
  top: -430px !important;
}

.w-e-text-container [data-slate-editor] p {
  margin: 4px 0;
}

.w-e-bar-item, .w-e-bar-item button {
  border-radius: 6px;
}

// 移除菜单tooltip
.w-e-menu-tooltip-v5:before {
  content: none;
}

.w-e-menu-tooltip-v5:after {
  content: none;
}

// 发送按钮右对齐
.w-e-bar.w-e-bar-show.w-e-toolbar {
  & > .w-e-bar-item:nth-last-child(1) {
    margin-left: auto;
  }
}

.w-e-image-container {
  //transform: translateY(4px);
}
</style>
