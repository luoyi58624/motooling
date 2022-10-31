<template>
  <el-dialog title="人员选择" :visible.sync="$store.state.showUserSelectPanel" width="60%"
             @open="openHandler" @close="closeHandler">
    <el-tree ref="tree" node-key="id" show-checkbox accordion highlight-current
             :data="allData" :props="defaultProps"/>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { cloneDeep } from 'lodash'
import { Notify } from 'vant'

export default {
  data () {
    return {
      allData: [], // 全部数据
      initData: [], // 初始选中的群成员
      defaultProps: {
        children: 'childrenList',
        label: 'name'
      }
    }
  },
  computed: {
    selectedList () {
      return this.$store.state.userSelectedList
    }
  },
  methods: {
    confirm () {
      const selectUsers = []
      this.$refs.tree.getCheckedKeys(true).forEach(id => {
        this.$store.getters.allUser.forEach(item => {
          if (item.uid === id) selectUsers.push(item)
        })
      })
      if (selectUsers.length > 0) {
        this.$store.commit('changeUserSelectedList', selectUsers)
        this.$emit('confirm')
      } else {
        Notify({
          message: '请至少选择一位成员！',
          duration: 2000,
          type: 'warning'
        })
      }
    },
    cancel () {
      this.$emit('cancel')
    },
    openHandler () {
      this.allData = cloneDeep(this.$store.state.allDepUser)
      this.disabledSelectOneself()
      // 如果是从群聊里拉人，则勾选群成员
      if (this.$store.state.isChatAddUser) {
        this.setCheckedNodes()
      }
    },
    closeHandler () {
      this.allData = []
      this.initData = []
      // 关闭弹窗重置【是否从群聊拉人】
      this.$store.state.isChatAddUser = false
    },
    // 禁止选择自己，如果选择自己，接口便创建群聊，但要求你拉2个人
    disabledSelectOneself () {
      this.allData.forEach(dep => {
        dep.childrenList.forEach(user => {
          if (user.uid === this.$store.state.userInfo.uid) {
            user.disabled = true
          }
        })
      })
    },
    setCheckedNodes () {
      this.initData = cloneDeep(this.$store.state.userSelectedList).map(item => {
        item.id = item.uid // el-tree -> row-id
        item.name = item.username // el-tree -> prop展示名字
        return item
      })

      this.allData.forEach(dep => {
        dep.childrenList.forEach(user => {
          user.disabled = this.initData.some(item => item.id === user.id)
        })
      })

      this.$nextTick(() => {
        this.$refs.tree.setCheckedNodes(this.initData)
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
