<template>
  <div style="border: 1px solid #ccc;">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
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
import { Boot } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { fileUpload, imgUpload } from '@/api/upload/upload'
import eventBus from '@/utils/mitt'
import { readFile } from '@/utils/utils'
import { Toast } from 'vant'

const editorConfig = {
  MENU_CONF: {}
}

editorConfig.MENU_CONF['uploadImage'] = {
  async customUpload (file) {
    imgUpload(file).then((res) => {
      let params = { contentType: 2, smallImg: res.imgUrl, content: res.rawUrl }
      eventBus.emit('handleMessage', params)
    })
  }
}

editorConfig.MENU_CONF['uploadVideo'] = {
  async customUpload (file) {
    if (/audio/.test(file.type)) {
      fileUpload(file).then((res) => {
        let params = { contentType: 3, smallImg: '', content: res.url }
        eventBus.emit('handleMessage', params)
      })
    } else if (/video/.test(file.type)) {
      fileUpload(file).then((res) => {
        let params = { contentType: 4, smallImg: '', content: res.url }
        eventBus.emit('handleMessage', params)
      })
    }
  }
}

class FileMenu {
  title = '上传文件'
  iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h6l2 2h8q.825 0 1.413.588Q22 7.175 22 8H4v10l2.4-8h17.1l-2.575 8.575q-.2.65-.737 1.038Q19.65 20 19 20Z"/></svg>`
  tag = 'button'

  getValue (editor) {
    return ''
  }

  isActive () {
    return false
  }

  isDisabled () {
    return false
  }

  async exec (editor, value) {
    readFile().then(res => {
      uploadFile(res)
    })
  }
}

class HistoryMenu {
  title = '历史记录'
  iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1024 1024"><path fill="currentColor" d="M536.1 273H488c-4.4 0-8 3.6-8 8v275.3c0 2.6 1.2 5 3.3 6.5l165.3 120.7c3.6 2.6 8.6 1.9 11.2-1.7l28.6-39c2.7-3.7 1.9-8.7-1.7-11.2L544.1 528.5V281c0-4.4-3.6-8-8-8zm219.8 75.2l156.8 38.3c5 1.2 9.9-2.6 9.9-7.7l.8-161.5c0-6.7-7.7-10.5-12.9-6.3L752.9 334.1a8 8 0 0 0 3 14.1zm167.7 301.1l-56.7-19.5a8 8 0 0 0-10.1 4.8c-1.9 5.1-3.9 10.1-6 15.1c-17.8 42.1-43.3 80-75.9 112.5a353 353 0 0 1-112.5 75.9a352.18 352.18 0 0 1-137.7 27.8c-47.8 0-94.1-9.3-137.7-27.8a353 353 0 0 1-112.5-75.9c-32.5-32.5-58-70.4-75.9-112.5A353.44 353.44 0 0 1 171 512c0-47.8 9.3-94.2 27.8-137.8c17.8-42.1 43.3-80 75.9-112.5a353 353 0 0 1 112.5-75.9C430.6 167.3 477 158 524.8 158s94.1 9.3 137.7 27.8A353 353 0 0 1 775 261.7c10.2 10.3 19.8 21 28.6 32.3l59.8-46.8C784.7 146.6 662.2 81.9 524.6 82C285 82.1 92.6 276.7 95 516.4C97.4 751.9 288.9 942 524.8 942c185.5 0 343.5-117.6 403.7-282.3c1.5-4.2-.7-8.9-4.9-10.4z"/></svg>`
  tag = 'button'

  getValue (editor) {
    return ''
  }

  isActive () {
    return false
  }

  isDisabled () {
    return false
  }

  async exec (editor, value) {
    eventBus.emit('showRecordPanel')
  }
}

const menu1Conf = {
  key: 'uploadFile', // 定义 menu key ：要保证唯一、不重复（重要）
  factory () {
    return new FileMenu() // 把 `YourMenuClass` 替换为你菜单的 class
  }
}

const menu2Conf = {
  key: 'history', // 定义 menu key ：要保证唯一、不重复（重要）
  factory () {
    return new HistoryMenu() // 把 `YourMenuClass` 替换为你菜单的 class
  }
}

const module = {
  menus: [menu1Conf, menu2Conf]
}

Boot.registerModule(module)

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
      editor: null,
      toolbarConfig: {
        toolbarKeys: ['uploadImage', 'uploadVideo', 'uploadFile', 'emotion', 'history', 'fullScreen']
      },
      wordContent: '',
      editorConfig,
      mode: 'default' // or 'simple'
    }
  },
  methods: {
    onCreated (editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
      this.editor.focus()
      const textDom = document.getElementsByClassName('w-e-text-container')
      if (textDom) {
        const buttonDom = document.createElement('div')
        buttonDom.className = 'chat-editor-button'
        buttonDom.innerText = '发送（ctrl+enter）'
        buttonDom.onclick = this.sendMsg
        textDom[0].appendChild(buttonDom)
      }
    },
    onChange (editor) {
      this.$emit('change', editor.getText())
    },
    sendMsg () {
      this.$emit('send')
    },
    keyupSendMsg (e) {
      if (e.ctrlKey && e.code === 'Enter') {
        this.sendMsg()
      }
    },
    customPaste (editor, event) {
      event.preventDefault()
      console.log(event.clipboardData.files)
      // uploadFile(event.clipboardData.files)
    }
  },
  mounted () {
    document.addEventListener('keyup', this.keyupSendMsg)
  },
  destroyed () {
    document.removeEventListener('keyup', this.keyupSendMsg)
  }
}

function uploadFile (files) {
  for (let i = 0; i < files.length; i++) {
    if (/image/.test(files[i].type)) {
      imgUpload(files[i]).then((res) => {
        let params = { contentType: 2, smallImg: res.imgUrl, content: res.rawUrl }
        eventBus.emit('handleMessage', params)
      })
    } else if (/audio/.test(files[i].type)) {
      fileUpload(files[i]).then((res) => {
        let params = { contentType: 3, smallImg: '', content: res.url }
        eventBus.emit('handleMessage', params)
      })
    } else if (/video/.test(files[i].type)) {
      fileUpload(files[i]).then((res) => {
        let params = { contentType: 4, smallImg: '', content: res.url }
        eventBus.emit('handleMessage', params)
      })
    } else {
      Toast.fail('暂未实现上传文件...')
    }
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

.chat-editor-button {
  position: absolute;
  bottom: 8px;
  right: 25px;
  width: 140px;
  height: 36px;
  font-size: 14px;
  border-radius: 6px;
  background-color: #dfe4ea;
  color: #34495e;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #16a085;
    color: #f1f2f6;
  }

  &:active {
    transform: scale(0.90);
  }
}
</style>
