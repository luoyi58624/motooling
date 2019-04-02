<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
@import url("../static/iconfont/iconfont.css");
html,
body {
  height: 100%;
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
.cube-dialog-btn_highlight,.cube-picker-confirm{
  color:#4e92ff;
}
.cube-switch .cube-switch-input:checked + .cube-switch-ui {
      border-color: #4e92ff;
    background-color: #4e92ff;
}
.swiper-pagination-bullet-active{
  width:10px !important;height:10px !important;

}
</style>
