<template>
  <div class="my-editor-container">
    <div id="default"></div>
    <EmotionPanel v-model="showEmotionPanel" @change="setEmotion"/>
  </div>
</template>

<script>
import tinymce from 'tinymce'
import 'tinymce/themes/silver/theme' // 主题文件
import 'tinymce/icons/default'
import 'tinymce/models/dom'
import 'tinymce/plugins/fullscreen'

import eventBus from '@/utils/mitt'
import EmotionPanel from './EmotionPanel2.vue'
import { hideLongText, loadFileIcon, readFile, renderSize, uuid } from '@/utils/utils'

const imageMap = new Map() // 存放图片文件
const videoMap = new Map() // 存放视频文件
const fileMap = new Map() // 存放其他类型文件
let editorInstance // 编辑器实例

export default {
  components: {
    EmotionPanel
  },
  data () {
    return {
      showEmotionPanel: false
    }
  },
  methods: {
    setEmotion ({ url, index }) {
      editorInstance.insertContent(`<img src="${url}" alt="" style="width: 20px;height: 20px;vertical-align: middle;">`)
    }
  },
  mounted () {
    tinymce.init({
      selector: 'div#default',
      base_url: '/tinymce',
      skin_url: '/tinymce/skins/ui/oxide',
      language_url: '/tinymce/langs/zh-Hans.js',
      content_css: '/tinymce/custom/css/chat.css',
      noneditable_class: 'mceNonEditable', // 设置不可编辑元素class
      language: 'zh-Hans',
      height: 180,
      branding: false,
      menubar: false,
      statusbar: false,
      paste_data_images: false, // 禁止tinymce默认事件-粘贴图片
      plugins: 'fullscreen',
      toolbar: 'myImage myVideo myFile myEmoticons myHistory fullscreen mySendMessage',
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
            const html = editor.getContent()
            const frag = document.createElement('div')
            frag.innerHTML = html
            console.log(frag.children)
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
                    if (text !== '') {
                      textMessage = ''
                      eventBus.emit('sendWordMessage', {
                        text: text
                        // userIds: userIds.join(',')
                      })
                    }
                  }
                }
              } else if (node.localName === 'div' && node.className.indexOf('file-wrapper') !== -1) {
                console.log(node)
                console.log(fileMap.get(node.dataset.id))
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
            editor.setContent('')
            // const imageDoms = frag.querySelectorAll('img')
            // for (let i = 0; i < imageDoms.length; i++) {
            //   if (imageDoms[i].dataset.id) images.push(imageMap.get(imageDoms[i].dataset.id))
            // }
            //
            // const videoDoms = frag.querySelectorAll('video')
            // for (let i = 0; i < videoDoms.length; i++) {
            //   if (videoDoms[i].dataset.id) videos.push(videoMap.get(videoDoms[i].dataset.id))
            // }
            //
            // const fileDoms = frag.getElementsByClassName('file-wrapper')
            // for (let i = 0; i < fileDoms.length; i++) {
            //   if (fileDoms[i].dataset.id) files.push(fileMap.get(fileDoms[i].dataset.id))
            // }
            //
            // console.log(images)
            // console.log(videos)
            // console.log(files)
          }
        })
        editorInstance = editor
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
