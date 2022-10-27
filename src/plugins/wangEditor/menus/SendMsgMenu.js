import eventBus from '@/utils/mitt'

class SendMsgMenu {
  title = '发送（Enter）'
  iconSvg = ''
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
    eventBus.emit('sendMsg')
  }
}

export const SendMsgConf = {
  key: 'mySendMsg',
  factory () {
    return new SendMsgMenu()
  }
}
