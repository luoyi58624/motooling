<template>
  <div ref="containerRef" class="chat-editor-emotion-panel" v-show="modelValue">
    <div v-for="item in emotions" :key="item" class="emotion-item" @click="setEmotion(item)">
      <img :src="item"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmotionPanel',
  props: {
    modelValue: {
      type: Boolean,
      defalut: false
    }
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  data () {
    return {
      emotions: []
    }
  },
  watch: {
    modelValue (newValue) {
      if (newValue) {
        document.addEventListener('click', this.closePanel)
      } else {
        document.removeEventListener('click', this.closePanel)
      }
    }
  },
  methods: {
    setEmotion (item) {
      this.$emit('change', item)
      this.$emit('update:modelValue', false)
    },
    closePanel (e) {
      if (this.$refs.containerRef) {
        let isSelf = this.$refs.containerRef.contains(e.target)
        if (!isSelf) {
          this.$emit('update:modelValue', false)
        }
      }
    }
  },
  created () {
    const i = []
    const images = require.context('@/assets/emotions/bibi/', false, /\.png$/)
    images.keys().forEach(k => {
      i.push(require('@/assets/emotions/bibi' + k.slice(1, k.length)))
    })
    this.emotions = i
  }
}
</script>

<style lang="less">
html.tox-fullscreen {
  .chat-editor-emotion-panel {
    position: fixed;
    top: 50px;
    left: 120px;
    z-index: 10000;
  }
}

.chat-editor-emotion-panel {
  position: absolute;
  bottom: 190px;
  left: 125px;
  width: 300px;
  height: 300px;
  padding: 4px 4px 4px 4px;
  background-color: white;
  overflow-y: auto;
  box-shadow: 0 0 1.1px rgba(0, 0, 0, 0.065),
  0 0 3.6px rgba(0, 0, 0, 0.095),
  0 0 16px rgba(0, 0, 0, 0.16);

  .emotion-item {
    width: 32px;
    height: 32px;
    margin: 4px;
    border-radius: 6px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
      background-color: rgb(245, 242, 240);
    }

    & > img {
      width: 24px;
      height: 24px;
    }
  }
}
</style>
