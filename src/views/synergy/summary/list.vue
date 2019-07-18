<template>
  <div class="wrap">
    <template v-if="summaryList.length>0">
      <div class="list-item" v-for="item in summaryList" :key="item.id">
        <router-link :to="'detail/' + item.groupId + '/'+ item.id">
          <div class="item-meta">
            <div>
              {{ item.summaryNo }}
            </div>
            <div>
              {{ item.createdAt }}
            </div>
          </div>
          <div>
            {{ item.summarySubject }}
          </div>
        </router-link>
      </div>
    </template>
    <div class="list-item center" v-if="summaryList.length===0">
      没有记录
    </div>
  </div>
</template>
<script>
import { getSummaryList } from '@/api/synergy/synergy.js'
export default {
  data () {
    return {
      groupId: 25,
      summaryList: []
    }
  },
  created () {
    this.init()
  },
  mounted () {},
  methods: {
    init () {
      getSummaryList({
        groupId: this.groupId
      })
        .then(res => {
          console.log(res)
          this.summaryList = res.summaryList
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
  .center {
    text-align: center;
  }
  .wrap {
    background: #eaeaea;
    height: 100%;
    font-size: 16px; /* no */
  }
  .item-meta {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }
  .list-item {
    background: white;
    padding: 12px 10px;
    margin-bottom: 20px;
  }
</style>
