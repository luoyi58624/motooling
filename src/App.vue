<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
/**@import url("../static/iconfont/iconfont.css");**/
@import url("//at.alicdn.com/t/font_1109928_0bj316ek8gup.css");
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
.cube-switch .cube-switch-ui{
  height:25px;
}
.cube-switch .cube-switch-input:checked + .cube-switch-ui {
      border-color: #4e92ff;
    background-color: #4e92ff;
}
.swiper-pagination-bullet-active{
  width:10px !important;height:10px !important;
}
.cube-radio-group[data-horz="true"]::after{
  border:0;
}
.border-right-1px::after{
  border:0;
}
.cube-radio_selected .cube-radio-ui{
  background: #5495ff;
}
.cube-radio-group[data-horz="true"]{
  display:flex;flex-wrap: wrap;justify-content: flex-start;
}
.cube-radio-group[data-horz="true"] .cube-radio{
 white-space: normal;width:auto;
}
.cube-radio-label{
  white-space: nowrap;
}
.cube-radio-group[data-horz="true"] .cube-radio{
   flex-grow:0;
}
.word .cube-upload-file-state{
  background: url('../static/img/word.png');background-size:cover;
 .cube-upload-file-status.cubeic-right{
   display:none;

 }
}
.word .cube-upload-file-def{
    background: url('../static/img/word.png');background-size:cover;
 .cube-upload-file-status.cubeic-right{
   display:none;

 }
}
.pdf .cube-upload-file-state{
  background: url('../static/img/pdf.png');background-size:cover;
 .cube-upload-file-status.cubeic-right{
   display:none;

 }
}
.pdf .cube-upload-file-def{
  background: url('../static/img/pdf.png');background-size:cover;
 .cube-upload-file-status.cubeic-right{
   display:none;

 }
}
.cube-checkbox-group[data-horz="true"]::after {border:0}
.wrapper > div > div.option-wrapper{
  flex-wrap: wrap
}
.wrapper > div > div.option-wrapper{
  width:auto;
}
.cube-checkbox-label{
   white-space: nowrap;
}
.cube-checkbox-ui.cubeic-square-border{
  border-radius: 50%;
}
.cube-checkbox_checked .cube-checkbox-ui i{
  background: #fff;
}
.cube-checkbox_checked .cube-checkbox-ui i{
  color:#5495ff;
}

</style>
