<template>
  <div ref="charEditorContainer" style="border: 1px solid #ccc;">
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
  </div>
</template>

<script>
import eventBus from '@/utils/mitt'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { execUploadFile } from '@/utils/projectUtils'
import { getChatEditorConfig } from '@/plugins/wangEditor/EditorConfig'
import { fillHtmlBlank } from '@/utils/utils'

export default {
  name: 'ChatEditor',
  components: {
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
        toolbarKeys: ['myUploadImage', 'myUploadVideo', 'myUploadFile', 'emotion', 'myHistory', 'mySendMsg']
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
      let text = ''
      const userIds = [] // @用户id集合，如果是所有则是
      this.$store.state.editor.children.forEach(paragraph => {
        paragraph.children.forEach((item, index) => {
          if (item.type == null) {
            text += fillHtmlBlank(item.text)
          } else if (item.type === 'mention') {
            text += ('@' + item.value + ' ')
            userIds.push(item.info.id)
          }

          if (index === paragraph.children.length - 1) {
            text += '\n'
          }
        })
      })
      text = text.trim()
      // 当编辑器没有图片和文字时，弹窗提示框
      if ((images == null || images.length === 0) && text === '') {
        this.$createToast({
          time: 2000,
          txt: '请输入要发送的内容',
          type: 'error'
        }).show()
        return
      }

      // 当存在图片，触发发送文件事件
      if (images && images.length > 0) {
        images.forEach(image => {
          let params = { contentType: 2, smallImg: image.alt, content: image.src }
          eventBus.emit('handleMessage', params)
        })
      }
      // 当包含文字消息，触发发送文字事件
      if (text !== '') {
        eventBus.emit('sendWordMessage', {
          text,
          userIds: userIds.join(',')
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
    this.$refs.charEditorContainer.addEventListener('keyup', this.keyupSendMsg)
  },
  beforeDestroy () {
    eventBus.off('sendMsg', this.sendMsg)
    this.$refs.charEditorContainer.removeEventListener('keyup', this.keyupSendMsg)
    this.$store.state.editor.destroy()
  }
}
</script>

<style lang="less">
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
</style>
