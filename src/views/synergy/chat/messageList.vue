<template>
  <div class="list">
    <div class="search">
      <div class="enter-keyword">
        <van-search v-model="value" background="#e6e8eb" placeholder="搜索" />
        <img src="../../../assets/icon-add.png" alt="" @click="$emit('add-user')">
      </div>
    </div>
    <div class="message-list">
        <router-link class="message-list-item" tag='div' v-for="item in newsList" :key="item.groupId"
        :to="{path:'chatPanel', query:{groupId:item.groupId,relationType:item.relationType}}">
        <div @click="shiftChatTarget(item)">
          <div><img :src="item.avatar" alt=""></div>
          <div class="user-name"><p>{{item.username || item.subject}}</p>
          <p>{{item.newMsg}}</p></div>
        </div>
        </router-link>
    </div>
  </div>
</template>
<script>
import { getNewsList } from '@/api/synergy/synergy.js'
export default {
  data () {
    return {
      value: '',
      newsList: []
    }
  },
  mounted () {
    getNewsList().then(res => {
      this.newsList = res.newsList
      console.log('newsList', this.newsList)
      // this.$store.commit(groupMembers,)
    })
  },
  methods: {
    shiftChatTarget (item) {
      console.log({ members: item })
      let currentGroupMembers = item.memberList
      let chatTargetName = item.subject || item.username
      this.$store.commit('setChatTargetName', chatTargetName)
      this.$store.commit('groupMembers', currentGroupMembers)
    }
  }
}
</script>

<style scoped lang="less">
.router-link-exact-active {
  background-color: #c3c5c7;
}
.list {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  background-color: #e6e8eb;
  .search {
    position: fixed;
    left: 0;
    top: 0;
    height: 60px;
    .enter-keyword {
      display: flex;
      align-items: center;
    }
    img{
      width: 21px;
      height: 21px;
      cursor: pointer;
    }
  }
}
.message-list {
  margin-top: 60px;
    .message-list-item{

      height: 64px;
      font-size: 14px;
      padding: 12px 0 12px 12px ;
      box-sizing: border-box;
      border-bottom: 1px solid #dadcdf;
      & > div {
      display: flex;
      flex-wrap: nowrap;
      }
      img {
        width: 40px;
        height: 40px;
      }
    .user-name {
      padding-left: 10px;
      flex: 0 0 150px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 40px;
      p:last-child {
        width: 150px; //必须指定宽度
        text-overflow: ellipsis; //超出部分显示为省略号
        overflow: hidden; //隐藏超出部分
        white-space: nowrap; //不换行
        color: #8c8d8f;
      }
    }
    }
}
</style>
