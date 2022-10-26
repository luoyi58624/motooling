import { readFile } from '@/utils/utils'
import { execUploadFile } from '@/utils/projectUtils'

class UploadFileMenu {
  title = '上传文件'
  iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587Q2 18.825 2 18V6q0-.825.588-1.412Q3.175 4 4 4h6l2 2h8q.825 0 1.413.588Q22 7.175 22 8H4v10l2.4-8h17.1l-2.575 8.575q-.2.65-.737 1.038Q19.65 20 19 20Z"/></svg>`
  tag = 'button'
  alwaysEnable = true

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
      for (let i = 0; i < res.length; i++) {
        execUploadFile(res[i])
      }
    })
  }
}

export const UploadFileConf = {
  key: 'uploadFile', // 定义 menu key ：要保证唯一、不重复（重要）
  factory () {
    return new UploadFileMenu() // 把 `YourMenuClass` 替换为你菜单的 class
  }
}
