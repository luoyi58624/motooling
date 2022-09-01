<template>
  <div class="member-list-container">
    <div v-for="member in groupMember" :key="member.id" @click="groupAt(member)">
      <div class="user-name">{{member.nickname || member.nickname}}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      groupMember: state => state.userSelectedList
    })
  },
  methods: {
    groupAt (member) {
      this.$emit('handleAt', member)
    }
  }
}
</script>

<style scoped lang="less">
.member-list-container {
  width: 160px;
  border: 1px solid #ccc;
  height: 280px;
  overflow: auto;
  .user-name {
    text-align: center;
    padding: 5px 0;
    &:hover {
      background-color: #ccc;
    }
  }
}
</style>
