<template>
  <cube-page type="form" title="Form">
    <div slot="content">
      <cube-button-group>
        <cube-button @click="goTo('default')">Default</cube-button>
        <cube-button @click="goTo('custom')">Custom</cube-button>
        <cube-button @click="goTo('classic')">Classic style</cube-button>
        <cube-button @click="goTo('fresh')">Fresh style</cube-button>
      </cube-button-group>
      <cube-view></cube-view>
    </div>
  </cube-page>
</template>
