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
        toolbarKeys: ['uploadImage', 'uploadVideo', 'uploadFile', 'emotion', 'history', 'sendMsg']
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
      this.$store.commit('setDraftMessage', editor.getText())
      this.$emit('change', editor.getText())
    },
    keyupSendMsg (e) {
      if (!e.ctrlKey && e.key === 'Enter') {
        eventBus.emit('sendWordMessage')
      }
    },
    customPaste (editor, event) {
      if (event.clipboardData.files.length > 0) {
        const files = event.clipboardData.files
        for (let i = 0; i < files.length; i++) {
          if (!/image/.test(files[i].type)) {
            execUploadFile(files[i])
          }
        }
      }
    }
  },
  mounted () {
    this.$refs.charEditorContainer.addEventListener('keyup', this.keyupSendMsg)
  },
  beforeDestroy () {
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
