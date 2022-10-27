import { Boot } from '@wangeditor/editor'
import ctrlEnterModule from '@wangeditor/plugin-ctrl-enter'
import { SendMsgConf } from '@/plugins/wangEditor/menus/SendMsgMenu'
import { HistoryConf } from '@/plugins/wangEditor/menus/HistoryMenu'
import { UploadFileConf } from '@/plugins/wangEditor/menus/UploadFileMenu'
import { UploadImageConf } from '@/plugins/wangEditor/menus/UploadImageMenu'
import { UploadVideoConf } from '@/plugins/wangEditor/menus/UploadVideoMenu'

const module = {
  menus: [SendMsgConf, HistoryConf, UploadFileConf, UploadImageConf, UploadVideoConf]
}

Boot.registerModule(module)
Boot.registerModule(ctrlEnterModule)
