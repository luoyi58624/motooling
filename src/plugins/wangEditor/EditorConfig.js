import { fileUpload, imgUpload } from '@/api/upload/upload'
import eventBus from '@/utils/mitt'

// 返回聊天编辑器配置
export function getChatEditorConfig () {
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

  // 隐藏选中文字弹出的菜单控件
  editorConfig.hoverbarKeys = {
    'text': {
      match: () => {
      },
      menuKeys: []
    }
  }

  return editorConfig
}
