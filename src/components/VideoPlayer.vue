<template>
  <div @click="clickHandler" @contextmenu="contextmenuHandler">
    <video ref="videoPlayer" class="video-js" :width="width" :height="height"></video>
  </div>
</template>

<script>
import videojs from 'video.js'

export default {
  name: 'VideoPlayer',
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: String,
      default: '640'
    },
    height: {
      type: String,
      default: '320'
    }
  },
  data () {
    return {
      player: null
    }
  },
  methods: {
    clickHandler ($event) {
      this.$emit('click', $event)
    },
    contextmenuHandler ($event) {
      this.$emit('contextmenu', $event)
    }
  },
  mounted () {
    this.player = videojs(this.$refs.videoPlayer, {
      controls: true,
      sources: [
        {
          src: this.src
        }
      ]
    }, () => {
      // this.player.log('onPlayerReady', this)
    })
  },
  beforeDestroy () {
    if (this.player) {
      this.player.dispose()
    }
  }
}
</script>
