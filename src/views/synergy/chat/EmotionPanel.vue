<template>
  <div class="my-emotion" v-show="$store.state.showChatEmotionPanel">
    <div v-for="item in emotions" :key="item" class="emotion-item" @click="setEmotion(item)">
      <img :src="item"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmotionPanel',
  data () {
    return {
      emotions: []
    }
  },
  methods: {
    setEmotion (item) {
      this.$store.state.editor.dangerouslyInsertHtml(
        `<img class="emotion-image" src="${item}" alt='${item}' style='width: 20px;height: 20px; '>`
      )
      this.$store.state.showChatEmotionPanel = false
      this.$nextTick(() => {
        this.$store.state.editor.focus(true)
      })
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

<style scoped lang="less">
.my-emotion {
  position: absolute;
  bottom: 160px;
  left: 130px;
  width: 290px;
  height: 405px;
  padding: 4px 4px 4px 4px;
  background-color: white;
  box-shadow: 0 0 1.1px rgba(0, 0, 0, 0.065),
  0 0 3.6px rgba(0, 0, 0, 0.095),
  0 0 16px rgba(0, 0, 0, 0.16);
}

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
</style>
