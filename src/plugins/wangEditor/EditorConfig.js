import { imgUpload } from '@/api/upload/upload'
import store from '@/store'

// 返回聊天编辑器配置
export function getChatEditorConfig () {
  const editorConfig = {
    MENU_CONF: {},
    EXTEND_CONF: {
      // @提及配置
      mentionConfig: {
        // 显示群聊组员列表
        showModal: () => {
          if (store.state.chattingTarget.type === 666) store.state.groupAt = true
        },
        // 隐藏群聊组员列表
        hideModal: () => {
          store.state.groupAt = false
        }
      }
    }
  }

  editorConfig.MENU_CONF['uploadImage'] = {
    async customUpload (file, insertFn) {
      imgUpload(file).then((res) => {
        store.state.editor.dangerouslyInsertHtml(`<p><img src="${res.rawUrl}" alt='${res.imgUrl}' style='width: 50px;height: 50px;'></p>`)
      })
    }
  }

  // 隐藏选中文字弹出的菜单控件
  editorConfig.hoverbarKeys = {
    'text': {
      match: () => {
      },
      menuKeys: []
    },
    'image': {
      match: () => {
      },
      menuKeys: []
    }
  }

  return editorConfig
}
