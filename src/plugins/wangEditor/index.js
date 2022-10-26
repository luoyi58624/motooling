import { Boot } from '@wangeditor/editor'
import ctrlEnterModule from '@wangeditor/plugin-ctrl-enter'
import { SendMsgConf } from '@/plugins/wangEditor/menus/SendMsgMenu'
import { HistoryConf } from '@/plugins/wangEditor/menus/HistoryMenu'
import { UploadFileConf } from '@/plugins/wangEditor/menus/FileMenu'

const module = {
  menus: [SendMsgConf, HistoryConf, UploadFileConf]
}

Boot.registerModule(module)
Boot.registerModule(ctrlEnterModule)
