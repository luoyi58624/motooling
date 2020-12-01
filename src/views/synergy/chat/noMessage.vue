<template>
  <div class="no-message">
    <img :src="require('@/assets/message.png')" alt="">
  </div>
</template>
<script>
export default {
}
</script>

<style scoped>
.no-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f5f5f5;
}
</style>
