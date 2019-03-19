<template>
  <div class="list">
    111
    <cube-page type="form" title="Form">
      <cube-index-list
      ref="indexList"
      :data="data"
      :title="title"
      :pullDownRefresh="pullDownRefresh"
      @select="selectItem"
      @title-click="clickTitle"
      @pulling-down="onPullingDown">
      </cube-index-list>
    </cube-page>
  </div>
</template>
<script>
export default {
  data () {
    return {
      data: {

      },
      title: '',
      ullDownRefresh: {
        stop: 55
      }

    }
  }
}

</script>
