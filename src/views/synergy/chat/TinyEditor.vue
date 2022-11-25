<template>
  <div class="my-editor-container">
    <textarea class="tinymce-editor"></textarea>
    <EmotionPanel v-model="showEmotionPanel" @change="insertEmotion"/>
    <MemberList ref="memberListRef"
                v-model="showMemberListPanel"
                :group-member="groupMember"
                :filter-value="usernamePinyin"
                :position="memberListPostion"
                @change="insertSelectUser"/>
  </div>
</template>

<script>
import tinymce from 'tinymce'
import 'tinymce/themes/silver/theme' // 主题文件
import 'tinymce/icons/default'
import 'tinymce/models/dom'
import 'tinymce/plugins/link'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/code'
import 'tinymce/plugins/fullscreen'

import eventBus from '@/utils/mitt'
import EmotionPanel from './EmotionPanel.vue'
import PinyinMatch from 'pinyin-match'
import MemberList from '@/views/synergy/chat/memberList'
import { hideLongText, loadFileIcon, readFile, renderSize, uuid } from '@/utils/utils'
import { cloneDeep } from 'lodash'
import { Notify } from 'vant'

export default {
  components: {
    EmotionPanel,
    MemberList
  },
  data () {
    return {
      showEmotionPanel: false, // 是否显示表情面板
      showMemberListPanel: false, // 是否显示@弹窗
      showContextMenu: false, // 是否显示右键菜单
      contextMenuPosition: { // 右键菜单定位
        left: 0,
        top: 0
      },
      groupId: '', // 当前聊天分组id
      replyData: null, // 回复的消息
      usernamePinyin: '', // 用户名字拼音搜索过滤
      memberListPostion: {} // @弹窗定位属性，包含left、top、right、bottom等属性
    }
  },
  computed: {
    // 计算@可选用户列表，支持拼音搜索过滤
    groupMember () {
      const datas = [
        {
          uid: 'AT_ALL',
          username: '所有人'
        },
        ...this.$store.state.userSelectedList.filter(item => item.uid !== this.$store.state.userInfo.uid)
      ]
      if (this.usernamePinyin === '') {
        return datas.map((item, index) => {
          return {
            ...item,
            index // 列表需要添加index下标索引，方便键盘控制上一个下一个
          }
        })
      } else {
        return datas.filter(item => {
          // 匹配名字拼音以及中文名字
          return PinyinMatch.match(item.username, this.usernamePinyin) !== false ||
            item.username.indexOf(this.usernamePinyin) !== -1
        }).map((item, index) => {
          return {
            ...item,
            index
          }
        })
      }
    }
  },
  methods: {
    // 插入表情
    insertEmotion (url) {
      this.$store.state.editorInstance.insertContent(`<img src="${url}" style="width: 20px;height: 20px;vertical-align: middle;">`)
    },
    // 插入选中的用户
    insertSelectUser (selectUser) {
      for (let i = 0; i <= this.usernamePinyin.length; i++) {
        tinymce.activeEditor.execCommand('Delete')
      }
      this.usernamePinyin = ''
      this.showMemberListPanel = false
      this.$store.state.editorInstance.insertContent(`<span class="mceNonEditable" data-uid="${selectUser.uid}">@${selectUser.username} </span>`)
    },
    // 插入回复消息，设置引用样式
    insertReplyMsg (item) {
      let text = ''
      switch (item.contentType) {
        case 1:
          text = item.content
          break
        case 2:
        case 6:
          text = `<p><img src="${item.content}" alt="" style="width: 56px;height:56px;object-fit: contain"></p>`
          break
        case 3:
          text = `<p><audio src="${item.content}" controls></p>`
          break
        case 4:
          text = `<p><video src="${item.content}" style="width: 100px;aspect-ratio: 16/9;"></p>`
          break
        case 9:
          text = `<div class="file-wrapper" data-name="${hideLongText(item.content.fileName, 20, 'center')}" data-size="${item.content.fileSize}"><img src="${loadFileIcon(item.content.fileName)}" alt=""></div>`
          break
      }
      this.replyData = item
      const html = `<blockquote class="mceNonEditable" data-id="${item.id}"><h4>${item.username}</h4>${text}</blockquote><p>&nbsp;</p>`
      this.$store.state.editorInstance.setContent(html)
      this.endFocus()
    },
    // 插入各种文件
    insertFile (editor, files) {
      if (this.hasReplyData()) {
        Notify({
          message: '编辑器存在回复消息，禁止插入文件！',
          type: 'warning'
        })
        return
      }
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const id = uuid()
        if (/image/.test(file.type)) {
          this.$store.state.imageFiles[id] = file
          const blobUrl = window.URL.createObjectURL(file)
          editor.insertContent(`<img src="${blobUrl}" alt="" data-id="${id}">`)
        } else if (/audio/.test(file.type)) {
          this.$store.state.audioFiles[id] = file
          const blobUrl = window.URL.createObjectURL(file)
          editor.insertContent(`<p class="mceNonEditable"><audio src="${blobUrl}" controls data-id="${id}"></p>`)
        } else if (/video/.test(file.type)) {
          this.$store.state.videoFiles[id] = file
          const blobUrl = window.URL.createObjectURL(file)
          editor.insertContent(`<p class="mceNonEditable"><video src="${blobUrl}" controls data-id="${id}"></p>`)
        } else {
          this.$store.state.otherFiles[id] = file
          const name = hideLongText(file.name, 20, 'center')
          const size = renderSize(file.size)
          const img = loadFileIcon(file.name)
          editor.insertContent(`<div class="file-wrapper mceNonEditable" data-name="${name}" data-size="${size}" data-id="${id}"><img src="${img}" alt=""></div>`)
        }
        if (i === files.length - 1 && !(/image/.test(file.type))) {
          this.endFocus()
          editor.insertContent('<p>&nbsp;</p>')
        }
      }
    },
    // 解析html代码，获取内容节点
    getDomNodes (html) {
      // 如果没有输入html代码，则默认获取编辑器的html文本
      if (html == null) {
        html = this.$store.state.editorInstance.getContent()
      }
      const frag = document.createElement('div')
      frag.innerHTML = html
      return frag.children
    },
    // 判断编辑器消息是否是否存在回复消息
    hasReplyData () {
      const nodes = this.getDomNodes()
      let flag = false
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].localName === 'blockquote' && nodes[i].dataset.id) {
          flag = true
          break
        }
      }
      return flag
    },
    // 判断编辑器是否存在消息。如果没有则弹出警告
    hasMsg () {
      let hasMedia = false
      const html = this.$store.state.editorInstance.getContent()
      const frag = document.createElement('div')
      frag.innerHTML = html
      const nodes = frag.children
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.localName === 'p' && isMediaNode(node)) {
          hasMedia = true
          break
        } else if (node.localName === 'div' && node.className.indexOf('file-wrapper') !== -1) {
          hasMedia = true
          break
        }
      }
      if (hasMedia) {
        return true
      } else {
        return html
          .replace(/\n/g, '')
          .replace(/<blockquote.*<\/blockquote>/g, '')
          .replace(/<(?!img).*?>/g, '')
          .replace(/(&nbsp;)*/g, '')
          .trim() != ''
      }
    },
    // 在最后一行获得焦点
    endFocus () {
      this.$store.state.editorInstance.execCommand('selectAll')
      this.$store.state.editorInstance.selection.getRng().collapse(false)
      this.$store.state.editorInstance.focus()
    },
    sendMsg () {
      if (!this.hasMsg()) {
        Notify({
          message: '不能发送空白消息',
          type: 'warning'
        })
        this.endFocus()
        return
      }
      if (
        this.$parent.synergyGroup
        && Object.keys(this.$parent.synergyGroup).length > 0
        && this.$parent.synergyGroup.workState == 0
      ) {
        Notify({
          message: '该员工已离职，无法发送消息',
          type: 'warning'
        })
        return
      }
      const nodes = this.getDomNodes()
      // 是否发送文字信息，如果为false，则对文字消息进行拼接
      // 由于tinymce是以p标签进行换行，所以我们需要对其进行遍历
      // 如果当前p标签包含了媒体，则需要对其进行单独处理，直接发送
      // 下面逻辑仿造企业微信，如果用户输入两端文字，中间插着其他文件，则进行三段处理，拆分成3条消息依次发送
      let sendTextMessage = false
      let textMessage = '' // 文字信息
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.localName === 'p') {
          // 如果当前节点只包含一个子节点同时有data-id属性，则判定为图片、视频、音频
          if (isMediaNode(node)) {
            switch (node.children[0].localName) {
              case 'img':
                eventBus.emit('sendMediaMessage', {
                  contentType: 2,
                  content: node.children[0].src,
                  file: this.$store.state.imageFiles[node.children[0].dataset.id]
                })
                delete this.$store.state.imageFiles[node.children[0].dataset.id]
                break
              case 'audio':
                eventBus.emit('sendMediaMessage', {
                  contentType: 3,
                  content: node.children[0].src,
                  file: this.$store.state.audioFiles[node.children[0].dataset.id]
                })
                delete this.$store.state.audioFiles[node.children[0].dataset.id]
                break
              case 'video':
                eventBus.emit('sendMediaMessage', {
                  contentType: 4,
                  content: node.children[0].src,
                  file: this.$store.state.videoFiles[node.children[0].dataset.id]
                })
                delete this.$store.state.videoFiles[node.children[0].dataset.id]
                break
            }
            sendTextMessage = false
          } else {
            // 处理文字消息
            textMessage += node.outerHTML
            // 如果已经是最后一条消息或者下一条消息是媒体类型、其他文件类型消息，则发送文字消息
            if (i === nodes.length - 1 || isMediaNode(nodes[i + 1]) || isOtherFileNode(nodes[i + 1])) {
              sendTextMessage = true
            }
            // 开始发送文字消息
            if (sendTextMessage) {
              let text = filterBlankMessage(textMessage) // 过滤掉首尾空白消息的p标签，防止出现空白消息体
              const uids = getAllMentionUid(text) // 拿到所有的@用户id
              if (text !== '') {  // 如果消息体不为空
                textMessage = '' // 重置累计拼接的消息
                if (!this.hasReplyData()) { // 如果没有回复消息，则将回复消息对象置为空
                  this.replyData = null
                }
                text = resetLink(text)
                eventBus.emit('sendWordMessage', {
                  text,
                  userIds: uids.join(','),
                  replyData: this.replyData
                })
                this.replyData = null  // 重置回复的消息对象
              }
            }
          }
        } else if (node.localName === 'div' && node.className.indexOf('file-wrapper') !== -1) {
          eventBus.emit('sendMediaMessage', {
            contentType: 9,
            content: {
              fileName: node.dataset.name,
              fileSize: node.dataset.size
            },
            file: this.$store.state.otherFiles[node.dataset.id]
          })
          delete this.$store.state.otherFiles[node.dataset.id]
        }
      }
      this.$store.state.editorInstance.setContent('')
    },
    bindGlobalKeyword (event) {
      if (event.altKey && event.code === 'KeyH') {
        eventBus.emit('showChatHistoryPanel')
      }
    }
  },
  mounted () {
    let plugins
    let toolbar
    if (process.env.NODE_ENV === 'development') {
      plugins = 'link autolink code fullscreen'
      toolbar = 'myEmoticons link myImage myVideo myFile myHistory code fullscreen mySendMessage'
    } else {
      plugins = 'link autolink fullscreen'
      toolbar = 'myEmoticons link myImage myVideo myFile myHistory fullscreen mySendMessage'
    }
    tinymce.init({
      selector: '.tinymce-editor',
      base_url: '/mthtml/tinymce',
      content_css: '/mthtml/tinymce/custom/css/chat.css',
      icons_url: '/mthtml/tinymce/icons/custom/icons.js',
      icons: 'custom',
      noneditable_class: 'mceNonEditable', // 设置不可编辑元素class
      language: 'zh-Hans',
      height: 180,
      branding: false,
      menubar: false, // 禁止显示菜单栏
      statusbar: false, // 禁止显示状态栏
      contextmenu: false, // 禁止编辑器右键菜单
      object_resizing: false, // 禁止拉伸图片、视频
      paste_data_images: false, // 禁止tinymce默认事件-粘贴图片
      paste_webkit_styles: 'width height vertical-align', // 粘贴html代码保留的样式
      keep_styles: false, // 不要保持样式
      convert_urls: false, // 不要转换url
      link_target_list: false, // 去除选择跳转行为
      link_title: false, // 去除用户输入title属性输入框
      plugins,
      toolbar,
      paste_preprocess: (editor, args) => {
        // console.log(args.content)
        args.content = args.content
          .replace(/(<div>)/g, '<p>')
          .replace(/(<\/div>)/g, '</p>')
          .replace(/(<h\d>)/g, '<p>')
          .replace(/(<\/h\d>)/g, '</p>')
          .replace(/(<li>)/g, '<p>')
          .replace(/(<\/li>)/g, '<p>')
          .replace(/<(?!img|br|a|p>|\/p|\/a).*?>/g, '')
          .replace(/(\s\w+-\w+?=["|']?.*?["|'])|(\s(?!(style|src|href))\w+=["|']?.*?["|'])/g, '')
          .replace(/<img[^>]*? (src)=['"][^(http)].*?>/g, '[图片]')
          .replace(/\n/g, '<br>')
          .replaceAll('  ', '&nbsp; ')
        // console.log('================')
        console.log(args.content)
      },
      setup: (editor) => {
        editor.on('click', () => {
          this.showEmotionPanel = false
          this.showContextMenu = false
        })
        editor.on('paste', (event) => {
          let flag = true
          const pasteHtml = event.clipboardData.getData('text/html')
          // 如果粘贴的html包含了图片标签，则禁止插入文件，因为 paste_preprocess 会插入html网络图片地址
          if (pasteHtml.indexOf('<img') !== -1) flag = false
          if (flag && event.clipboardData.files.length > 0) this.insertFile(editor, event.clipboardData.files)
        })
        editor.on('drop', event => {
          if (event.dataTransfer && event.dataTransfer.files.length > 0) this.insertFile(editor, event.dataTransfer.files)
        })
        editor.on('FullscreenStateChanged', value => {
          this.$store.state.editorFullScreen = value.state
        })
        editor.on('change', () => {
          // 保存草稿
          this.$store.commit('setDraftMessage', {
            groupId: this.groupId,
            message: this.$store.state.editorInstance.getContent()
          })
        })
        editor.on('input', (event) => {
          if (this.showMemberListPanel) {
            const text = this.$store.state.editorInstance.getContent({ format: 'text' })
            const index = text.lastIndexOf('@') + 1
            this.usernamePinyin = text.substring(index, text.length)
            this.memberListPostion = editor.selection.getRng().getBoundingClientRect()
          } else if (event.data === '@' && this.$store.state.chattingTarget.type == 666) {
            this.showMemberListPanel = true
            this.memberListPostion = editor.selection.getRng().getBoundingClientRect()
          }
        })
        // 编辑器键盘事件处理
        editor.on('keydown', event => {
          if (event.code === 'Backspace') {
            const text = this.$store.state.editorInstance.getContent({ format: 'text' }).replace(/\n/g, '')
            if (text.endsWith('@')) {
              this.showMemberListPanel = false
            } else if (text.substring(0, text.length - 1).endsWith('@') && this.showMemberListPanel === false) {
              this.showMemberListPanel = true
            }
          } else if (event.code === 'Escape' || event.code === 'Space') {
            this.showMemberListPanel = false
          } else if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            if (this.showMemberListPanel) {
              event.preventDefault()
              this.$refs.memberListRef.keydownEvent(event)
            }
          } else if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
            if (this.showMemberListPanel) event.preventDefault()
          } else if ((!event.ctrlKey && !event.altKey) && event.code === 'Enter') {
            event.preventDefault()
            if (this.showMemberListPanel) {
              this.$refs.memberListRef.keydownEvent(event)
            } else {
              this.sendMsg()
            }
          } else if (event.altKey && event.code === 'KeyH') {
            eventBus.emit('showChatHistoryPanel')
          }
        })
        editor.ui.registry.addButton('myImage', {
          icon: 'image',
          tooltip: '上传图片',
          onAction: () => {
            this.showEmotionPanel = false
            readFile('image/*').then((files) => {
              this.insertFile(editor, files)
            })
          }
        })
        editor.ui.registry.addButton('myVideo', {
          icon: 'video',
          tooltip: '上传视频',
          onAction: () => {
            this.showEmotionPanel = false
            readFile('audio/*,video/*').then((files) => {
              this.insertFile(editor, files)
            })
          }
        })
        editor.ui.registry.addButton('myFile', {
          icon: 'fold',
          tooltip: '上传文件',
          onAction: () => {
            this.showEmotionPanel = false
            readFile().then((files) => {
              this.insertFile(editor, files)
            })
          }
        })
        editor.ui.registry.addButton('myEmoticons', {
          icon: 'emoji',
          tooltip: '表情包',
          onAction: () => {
            this.showEmotionPanel = !this.showEmotionPanel
          }
        })
        editor.ui.registry.addButton('myHistory', {
          icon: 'history',
          tooltip: '历史记录 Alt+H',
          onAction: () => {
            this.showEmotionPanel = false
            eventBus.emit('showChatHistoryPanel')
          }
        })
        editor.ui.registry.addButton('mySendMessage', {
          icon: 'send',
          tooltip: '发送消息 Enter',
          onAction: () => {
            this.sendMsg()
          }
        })
      },
      init_instance_callback: (editor) => {
        if (this.$store.state.editorInstance != null) {
          this.$store.state.editorInstance.destroy()
          this.$store.state.editorInstance = null
        }
        this.$store.state.editorInstance = editor
        // 插入草稿信息
        this.$nextTick(() => {
          // 拷贝当前群聊分组id，防止点击其他分组触发change事件设置草稿时插入的是新groupId
          this.groupId = cloneDeep(this.$store.state.groupId)
          const messageDraft = this.$store.state.messageDraft.find(item => {
            return item.groupId == this.groupId
          })
          if (messageDraft) {
            editor.setContent(messageDraft.message)
          }
          this.endFocus()
        })
      }
    })
    document.addEventListener('keydown', this.bindGlobalKeyword)
  },
  destroyed () {
    if (this.$store.state.editorInstance != null) {
      this.$store.state.editorInstance.destroy()
      this.$store.state.editorInstance = null
    }
    document.removeEventListener('keydown', this.bindGlobalKeyword)
  }
}

// 判断当前节点是否是包含媒体文件
function isMediaNode (node) {
  return node.childNodes.length === 1 && node.children.length === 1 && node.children[0].dataset.id
}

// 判断当前节点是否是其他文件类型节点
function isOtherFileNode (node) {
  return node.localName === 'div' && node.className.indexOf('file-wrapper') !== -1
}

// 过滤掉【&nbsp;】空格，排除首尾空白消息
function filterBlankMessage (html) {
  let newHtml = ''
  const frag = document.createElement('div')
  frag.innerHTML = html
  const nodes = frag.children
  const length = nodes.length - 1
  let firstIndex = 0
  let endIndex = nodes.length - 1
  for (let i = 0; i <= length; i++) {
    const node = nodes[i]
    if (node.localName === 'p') {
      const content = node.innerHTML.replace(/&nbsp;/ig, '').trim()
      if (content === '') {
        firstIndex++
      } else {
        break
      }
    }
  }
  for (let i = length; i >= 0; i--) {
    const node = nodes[i]
    if (node.localName === 'p') {
      const content = node.innerHTML.replace(/&nbsp;/ig, '').trim()
      if (content === '') {
        endIndex--
      } else {
        break
      }
    }
  }
  for (let i = firstIndex; i <= endIndex; i++) {
    newHtml += nodes[i].outerHTML
  }
  return newHtml
}

// 获取所有@用户的id
function getAllMentionUid (html) {
  const uids = []
  const frag = document.createElement('div')
  frag.innerHTML = html
  const doms = frag.querySelectorAll('span')
  for (let i = 0; i < doms.length; i++) {
    if (doms[i].dataset.uid) uids.push(doms[i].dataset.uid)
  }
  return uids
}

// 重置a标签跳转行为
function resetLink (html) {
  return html.replace(/<a.*?>/, function (item) {
    return item.replace('>', ' target="_blank">')
  })
}
</script>

<style lang="less">
.my-editor-container {
  width: 100%;
  position: relative;
}

.tox.tox-tinymce {
  border: none !important;
  border-radius: 0 !important;
}

.tox-editor-header {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04) !important;
  padding: 0 !important;

  svg {
    fill: #504e4e !important;
  }
}

.tox-toolbar__group {
  width: 100% !important;
  padding: 0 8px 0 8px !important;

  .tox-tbtn {
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: rgb(235, 235, 235) !important;
    }
  }

  & > .tox-tbtn:nth-last-child(1) {
    margin-left: auto;
    margin-right: 8px;
    width: 48px;
    cursor: pointer;
  }
}

.tox-notifications-container {
  display: none;
}

.tox-tbtn:hover {
  background-color: rgb(241, 241, 241) !important;
}
</style>
