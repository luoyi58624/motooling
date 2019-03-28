<!--  -->
<template>
  <div class="body">
    <myHeader title="设置"/>
    <div class="wrapper">
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
    </div>
    <div class="wrapper">
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
      <div class="list">
        <div>自动接收下道工序</div>
        <div>
          <cube-switch v-model="value"></cube-switch>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input } from "cube-ui";
import myHeader from "@/components/header";
export default {
  data() {
    return {};
  },

  components: {
    myHeader
  },

  computed: {},

  mounted: {},

  methods: {}
};
</script>
<style lang='less' scoped>
.body {
  background: #eee;
}

.wrapper {
  padding-left: 10px;
  margin-top: 10px;
  background: #fff;
}
.list {
  height: 50px;
  font-size: 18px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding: 0 10px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 200;
  > div:nth-child(2) {
    height: 20px;
    > div {
      height: 20px;
    }
  }
}
</style>