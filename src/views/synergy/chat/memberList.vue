<template>
  <div class="member-list-container">
    <div v-for="member in groupMember" :key="member.id" @click="groupAt(member)">
      <div class="user-name">{{member.username}}</div>
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
  background-color: #ffffff;
  box-shadow:
    6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
    22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
    100px 100px 80px rgba(0, 0, 0, 0.07);
  .user-name {
    text-align: center;
    padding: 5px 0;
    &:hover {
      background-color: #ccc;
    }
  }
}
</style>
