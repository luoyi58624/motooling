<template>
  <div class="my-editor-container">
    <div id="default"></div>
    <EmotionPanel v-model="showEmotionPanel" @change="setEmotion"/>
    <MemberList ref="memberListRef" v-model="showMemberListPanel" @change="insertSelectUser"/>
  </div>
</template>

<script>
import tinymce from 'tinymce'
import 'tinymce/themes/silver/theme' // 主题文件
import 'tinymce/icons/default'
import 'tinymce/models/dom'
import 'tinymce/plugins/code'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'

import eventBus from '@/utils/mitt'
import EmotionPanel from './EmotionPanel.vue'
import MemberList from '@/views/synergy/chat/memberList'
import { hideLongText, loadFileIcon, readFile, renderSize, uuid } from '@/utils/utils'
import { cloneDeep } from 'lodash'

const imageMap = new Map() // 存放图片文件
const audioMap = new Map() // 存放音频文件
const videoMap = new Map() // 存放视频文件
const fileMap = new Map() // 存放其他类型文件
let editorInstance // 编辑器实例

export default {
  components: {
    EmotionPanel,
    MemberList
  },
  data () {
    return {
      showEmotionPanel: false,
      showMemberListPanel: false,
      groupId: ''
    }
  },
  methods: {
    insertReplyMsg (msg) {
      const text = msg.content.replace(/<p>/gi, '').replace(/<\/p>/gi, '')
      const html = `<blockquote class="mceNonEditable" data-id="${msg.id}"><h4>${msg.username}</h4><p style="font-size: 14px">${text}</p></blockquote><p>&nbsp;</p>`
      editorInstance.setContent(html)
    },
    setEmotion ({ url, index }) {
      editorInstance.insertContent(`<img src="${url}" alt="" style="width: 20px;height: 20px;vertical-align: middle;">`)
    },
    insertSelectUser (selectUser) {
      this.showMemberListPanel = false
      tinymce.activeEditor.execCommand('Delete')
      editorInstance.insertContent(`<span class="mceNonEditable" data-uid="${selectUser.uid}">@${selectUser.name} </span>`)
    },
    sendMsg () {
      const html = editorInstance.getContent()
      const frag = document.createElement('div')
      frag.innerHTML = html
      const nodes = frag.children
      let sendHtml = false // 是否拼接html文字消息,如果为false，则发送文字消息
      let textMessage = ''
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
                  file: imageMap.get(node.children[0].dataset.id)
                })
                break
              case 'video':
                eventBus.emit('sendMediaMessage', {
                  contentType: 4,
                  content: node.children[0].src,
                  file: videoMap.get(node.children[0].dataset.id)
                })
                break
            }
            sendHtml = false
            // 处理文字消息
          } else {
            textMessage += node.outerHTML
            // 如果已经是最后一条消息或者下一条消息是媒体类型消息，则发送文字消息
            if (i === nodes.length - 1 || isMediaNode(nodes[i + 1])) {
              sendHtml = true
            }
            if (sendHtml) {
              const text = filterBlankMessage(textMessage)
              const uids = getAllMentionUid(text)
              if (text !== '') {
                textMessage = ''
                eventBus.emit('sendWordMessage', {
                  text: text,
                  userIds: uids.join(',')
                })
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
            file: fileMap.get(node.dataset.id)
          })
        }
      }
      editorInstance.setContent('')
    }
  },
  mounted () {
    tinymce.init({
      selector: 'div#default',
      base_url: '/mthtml/tinymce',
      // skin_url: '/tinymce/skins/ui/oxide',
      // language_url: '/tinymce/langs/zh-Hans.js',
      content_css: '/mthtml/tinymce/custom/css/chat.css',
      noneditable_class: 'mceNonEditable', // 设置不可编辑元素class
      language: 'zh-Hans',
      height: 180,
      branding: false,
      menubar: false,
      statusbar: false,
      paste_data_images: false, // 禁止tinymce默认事件-粘贴图片
      plugins: 'code preview fullscreen',
      toolbar: 'myImage myVideo myFile myEmoticons myHistory code preview fullscreen mySendMessage',
      setup: (editor) => {
        editor.on('click', () => {
          this.showEmotionPanel = false
        })
        editor.on('paste', (event) => {
          if (event.clipboardData.files.length > 0) insertFile(editor, event.clipboardData.files)
        })
        editor.on('drop', event => {
          if (event.dataTransfer && event.dataTransfer.files.length > 0) insertFile(editor, event.dataTransfer.files)
        })
        editor.on('change', () => {
          // 保存草稿
          this.$store.commit('setDraftMessage', {
            groupId: this.groupId,
            message: editorInstance.getContent()
          })
        })
        editor.on('input', (event) => {
          if (event.data === '@' && this.$store.state.chattingTarget.type == 666) {
            this.showMemberListPanel = true
          }
        })
        editor.on('keydown', event => {
          if (event.code === 'Backspace') {
            this.showMemberListPanel = false
          } else if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
            event.preventDefault()
            this.$refs.memberListRef.keydownEvent(event)
          } else if ((!event.ctrlKey && !event.altKey) && event.code === 'Enter') {
            event.preventDefault()
            if (this.showMemberListPanel) {
              this.$refs.memberListRef.keydownEvent(event)
            } else {
              this.sendMsg()
            }
          } else if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
            if (this.showMemberListPanel) event.preventDefault()
          }
        })
        editor.ui.registry.addButton('myImage', {
          icon: 'image',
          tooltip: '上传图片',
          onAction: (e) => {
            readFile('image/*').then((files) => {
              insertFile(editor, files)
            })
          }
        })
        editor.ui.registry.addButton('myVideo', {
          icon: 'embed',
          tooltip: '上传视频',
          onAction: () => {
            readFile('video/*').then((files) => {
              insertFile(editor, files)
            })
          }
        })
        editor.ui.registry.addButton('myFile', {
          icon: 'document-properties',
          tooltip: '上传文件',
          onAction: () => {
            readFile().then((files) => {
              insertFile(editor, files)
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
          icon: 'insert-time',
          tooltip: '历史记录',
          onAction: () => {
            eventBus.emit('showChatHistoryPanel')
          }
        })
        editor.ui.registry.addButton('mySendMessage', {
          text: '发送（Enter）',
          onAction: () => {
            this.sendMsg()
          }
        })
      },
      init_instance_callback: (editor) => {
        editorInstance = editor
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
        })
      }
    })
  },
  destroyed () {
    editorInstance.destroy()
  }
}

// 判断当前节点是否是包含媒体文件
function isMediaNode (node) {
  return node.childNodes.length === 1 && node.children.length === 1 && node.children[0].dataset.id
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

// 插入各种文件
function insertFile (editor, files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const id = uuid()
    if (/image/.test(file.type)) {
      imageMap.set(id, files[i])
      const blobUrl = window.URL.createObjectURL(files[i])
      editor.insertContent(`<p><img src="${blobUrl}" alt="" data-id="${id}" style="width: 64px;object-fit: contain"></p>`)
    } else if (/audio/.test(file.type)) {
      audioMap.set(id, files[i])
      const blobUrl = window.URL.createObjectURL(files[i])
      editor.insertContent(`<p><audio src="${blobUrl}" controls data-id="${id}"></p>`)
    } else if (/video/.test(file.type)) {
      videoMap.set(id, files[i])
      const blobUrl = window.URL.createObjectURL(files[i])
      editor.insertContent(`<p><video src="${blobUrl}" controls data-id="${id}" style="width: 320px;aspect-ratio: 16/9;"></p>`)
    } else {
      fileMap.set(id, files[i])
      const name = hideLongText(files[i].name, 20, 'center')
      const size = renderSize(files[i].size)
      const img = loadFileIcon(files[i].name)
      editor.insertContent(`<div class="file-wrapper mceNonEditable" data-name="${name}" data-size="${size}" data-id="${id}"><img src="${img}" alt=""></div>`)
    }
    editor.execCommand('selectAll')
    editor.selection.getRng().collapse(false)
    editor.focus()
    if (i === files.length - 1) {
      editor.insertContent('<p>&nbsp;</p>')
    }
  }
}
</script>

<style lang="less">
.my-editor-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.tox.tox-tinymce {
  border-radius: 0 !important;
}

.tox-editor-header {
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.04) !important;
  padding: 0 !important;

  svg {
    fill: #504e4e !important;
  }
}

.tox-toolbar__group {
  width: 100% !important;

  & > .tox-tbtn:nth-last-child(1) {
    margin-left: auto;
  }
}

.tox-notifications-container {
  display: none;
}

.tox-tbtn:hover {
  background-color: rgb(241, 241, 241) !important;
}
</style>
