<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// 控制刷新当前页面的组件
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="less">
/**@import url("../static/iconfont/iconfont.css");**/
@import url("//at.alicdn.com/t/font_1109928_0bj316ek8gup.css");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scrollbar-color: rgba(159, 162, 169, 0.7) #f7f7f9; /* 滑块颜色  滚动条背景颜色 */
  scrollbar-width: thin; /* 滚动条宽度有三种：thin、auto、none */
}

html,
body {
  height: 100%;
  background: #fff;
}

body {
  overflow: hidden;
  border: 1px solid #cccccc;
}

#app {
  height: 100%;
  color: #2c3e50;
}

.hidden {
  display: none;
}

@font-face {
  font-family: "iconfont";
  src: url("../static/iconfont.ttf") format("truetype");
}

.iconfont {
  font-family: iconfont;
  font-size: 18px;
}

/* 2倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 2) {
  .border-bottom::after {
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}

/* 3倍屏 */
@media only screen and (-webkit-min-device-pixel-ratio: 3) {
  .border-bottom::after {
    -webkit-transform: scaleY(0.33);
    transform: scaleY(0.33);
  }
}

.cube-pulldown-loaded {
  font-size: 16px;
}

.cube-dialog-btn_highlight, .cube-picker-confirm {
  color: #4e92ff;
}

.cube-switch .cube-switch-ui {
  height: 25px;
}

.cube-switch .cube-switch-input:checked + .cube-switch-ui {
  border-color: #4e92ff;
  background-color: #4e92ff;
}

.swiper-pagination-bullet-active {
  width: 10px !important;
  height: 10px !important;
}

.cube-radio-group[data-horz="true"]::after {
  border: 0;
}

.border-right-1px::after {
  border: 0;
}

.cube-radio_selected .cube-radio-ui {
  background: #5495ff;
}

.cube-radio-group[data-horz="true"] {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.cube-radio-group[data-horz="true"] .cube-radio {
  white-space: normal;
  width: auto;
}

.cube-radio-label {
  white-space: nowrap;
}

.cube-radio-group[data-horz="true"] .cube-radio {
  flex-grow: 0;
}

.word .cube-upload-file-state {
  background: url('../static/img/word.png');
  background-size: cover;

  .cube-upload-file-status.cubeic-right {
    display: none;

  }
}

.word .cube-upload-file-def {
  background: url('../static/img/word.png');
  background-size: cover;

  .cube-upload-file-status.cubeic-right {
    display: none;

  }
}

.pdf .cube-upload-file-state {
  background: url('../static/img/pdf.png');
  background-size: cover;

  .cube-upload-file-status.cubeic-right {
    display: none;

  }
}

.pdf .cube-upload-file-def {
  background: url('../static/img/pdf.png');
  background-size: cover;

  .cube-upload-file-status.cubeic-right {
    display: none;

  }
}

.cube-checkbox-group[data-horz="true"]::after {
  border: 0
}

.wrapper > div > div.option-wrapper {
  flex-wrap: wrap
}

.wrapper > div > div.option-wrapper {
  width: auto;
}

.cube-checkbox-label {
  white-space: nowrap;
}

.cube-checkbox-ui.cubeic-square-border {
  border-radius: 50%;
}

.cube-checkbox_checked .cube-checkbox-ui i {
  background: #fff;
}

.cube-checkbox_checked .cube-checkbox-ui i {
  color: #5495ff;
}

.table {
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  color: #b0b0b0;

  > div {
    display: flex;
    font-size: 14px;
    line-height: 20px;
    border-bottom: 1px solid #d8d8d8;

    > div {
      padding: 5px;
      display: flex;

      > input {
        border: none;
        flex: 1;
      }
    }

    > div:nth-child(2) {
      flex: 1;
    }

    > div:first-child {
      width: 100px;
      border-right: 1px solid #d8d8d8;
    }
  }

  > div:last-child {
    border-bottom: none;
  }
}

.cube-checkbox.cube-checkbox_checked {
  padding: 0 20px;
}

.cursor-pointer {
  cursor: pointer;
}

.van-popup {
  z-index: 4000 !important;
}
</style>
