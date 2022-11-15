<template>
  <div :class="['v-split-panel',mode]" :style="{'user-select': isActive?'none':'auto'}" ref="SplitPanelRef">
    <div :style="{
      width: mode==='vertical'?size+'px':'100%',
      height: mode==='vertical'?'100%':size,
    }">
      <slot name="left"></slot>
    </div>
    <div :style="controlStyle" @mousedown="mousedownHandler">
      <div :style="controlStripStyle"></div>
    </div>
    <div :style="{
      width: mode==='vertical'?`calc(100% - ${size}px)`:'100%',
      height: mode==='vertical'?'100%':`calc(100% - ${size})`,
    }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplitPanel',
  props: {
    // 布局模式, 可选：horizontal
    mode: {
      type: String,
      default: 'vertical'
    },
    // 控制器尺寸, 鼠标允许拖拽的范围
    controlSize: {
      type: Number,
      default: 8
    },
    // 控制条尺寸, 屏幕显示的尺寸
    controlStripSize: {
      type: Number,
      default: 1
    },
    // 默认尺寸/位置, 支持单位：100, 100px, 100%, 'leftMinSize', 'leftMaxSize', 'rightMinSize', 'rightMaxSize'
    defaultSize: {
      type: String,
      default: 'leftMinSize'
    },
    // 左边容器拖拽范围最小尺寸, 支持单位：100, 100px, 100%
    leftMinSize: {
      type: String,
      default: '100'
    },
    // 左边容器拖拽范围最大尺寸, 支持单位：100, 100px, 100%
    leftMaxSize: {
      type: String,
      default: '80%'
    },
    // 右边容器拖拽范围最小尺寸, 支持单位：100, 100px, 100%, 如果设置该属性将会覆盖 leftMaxSize
    rightMinSize: {
      type: String,
      default: null
    },
    // 右边容器拖拽范围最大尺寸, 支持单位：100, 100px, 100%, 如果设置该属性将会覆盖 leftMinSize
    rightMaxSize: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      size: 0,
      min: 0,
      max: 0,
      isActive: false, // 控制器是否处于激活状态
      containerAttr: {
        width: 0,
        height: 0
      }
    }
  },
  computed: {
    containerSize() {
      return this.mode === 'vertical' ? this.containerAttr.width : this.containerAttr.height
    },
    // 控制器样式
    controlStyle() {
      return this.mode === 'vertical'
        ? {width: this.controlSize + 'px', height: '100%', cursor: 'ew-resize'}
        : {width: '100%', height: this.controlSize + 'px', cursor: 'ns-resize'}
    },
    // 控制条样式
    controlStripStyle() {
      return this.mode === 'vertical'
        ? {width: this.controlStripSize + 'px', height: '100%', backgroundColor: '#cccccc'}
        : {width: '100%', height: this.controlStripSize + 'px', backgroundColor: '#cccccc'}
    }
  },
  methods: {
    mousedownHandler() {
      this.isActive = true
      window.addEventListener('mousemove', this.mousemoveHandler)
      window.addEventListener('mouseup', this.mouseupHandler)
    },
    mousemoveHandler(e) {
      if (this.isActive) {
        const coord = this.mode === 'vertical' ? e.pageX : e.pageY
        if (coord >= this.min && coord <= this.max) this.size = coord
      }
    },
    mouseupHandler() {
      this.isActive = false
      window.removeEventListener('mousemove', this.mousemoveHandler)
      window.removeEventListener('mouseup', this.mouseupHandler)
    },
    // 设置容器
    setContainer() {
      this.containerAttr.width = this.$refs.SplitPanelRef.clientWidth
      this.containerAttr.height = this.$refs.SplitPanelRef.clientHeight
      this.setRang()
      this.setSize()
    },
    /**
     * 格式化尺寸, 将 px、% 转化成数字
     * @param size       接收的尺寸，支持：px、%
     * @returns {number}
     */
    formatSize(size) {
      let newSize
      if (size.indexOf('px') !== -1) {
        newSize = Number(size.replace('px', '').trim())
      } else if (size.indexOf('%') !== -1) {
        newSize = this.containerSize / 100 * Number(size.replace('%', '').trim())
      } else {
        newSize = Number(size)
      }
      return newSize
    },
    // 设置最大、最小区间
    setRang() {
      let min, max
      if (this.rightMinSize == null) {
        max = this.formatSize(this.leftMaxSize.toString())
      } else {
        max = this.containerSize - this.formatSize(this.rightMinSize.toString())
      }
      if (this.rightMaxSize == null) {
        min = this.formatSize(this.leftMinSize.toString())
      } else {
        min = this.containerSize - this.formatSize(this.rightMaxSize.toString())
      }
      if (min < 0) min = 0
      if (max > this.containerSize) max = this.containerSize

      this.min = min
      this.max = max
    },
    setSize() {
      if (this.size <= this.min) this.size = this.min
      if (this.size >= this.max) this.size = this.max
    }
  },
  mounted() {
    this.containerAttr.width = this.$refs.SplitPanelRef.clientWidth
    this.containerAttr.height = this.$refs.SplitPanelRef.clientHeight
    this.setRang()
    let size
    if (['leftMinSize', 'leftMaxSize'].includes(this.defaultSize)) {
      size = this[this.defaultSize]
    } else if (['rightMinSize', 'rightMaxSize'].includes(this.defaultSize)) {
      if (this[this.defaultSize] == null) {
        throw new Error('defaultSize指定的属性为null')
      }
      size = this.containerSize - this.formatSize(this[this.defaultSize].toString())
    } else if (this.defaultSize.indexOf('px') !== -1) {
      size = Number(this.defaultSize.replace('px', '').trim())
    } else if (this.defaultSize.indexOf('%') !== -1) {
      size = this.containerSize / 100 * Number(this.defaultSize.replace('%', '').trim())
    } else {
      size = Number(this.defaultSize)
    }
    this.size = size
    this.setSize()
    window.addEventListener('resize', this.setContainer)
  },
  destroyed() {
    window.removeEventListener('resize', this.setContainer)
  }
}
</script>

<style>
.v-split-panel {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
}

.v-split-panel.vertical {
  flex-direction: row;
}

.v-split-panel.horizontal {
  flex-direction: column;
}
</style>
