<template>
  <div ref="memberListContainer" class="member-list-container" v-show="modelValue">
    <div v-for="(member,index) in groupMember" :key="member.uid" @click="groupAt(index)">
      <div class="username" :class="{active: index===selectUser.index}">{{ member.username }}</div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'

export default {
  props: {
    modelValue: {
      type: Boolean,
      defalut: false
    },
    groupMember: {
      type: Array,
      required: true
    },
    filterValue: {
      type: String,
      defalut: ''
    }
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  data () {
    return {
      selectUser: {
        index: 0,
        uid: 'AT_ALL',
        username: '所有人'
      }
    }
  },
  watch: {
    // 监听列表数据的变化，当用户输入拼音字符过滤列表，我们需要更新选中的用户
    groupMember (newValue) {
      const flag = newValue.find(item => item.uid === this.selectUser.uid)
      if (this.groupMember.length > 0) {
        if (flag == null) {
          this.selectUser = this.groupMember[0] // 当前选中的用户不在列表时，默认选中第一条
        } else {
          this.selectUser = cloneDeep(flag) // 设置最新索引（index）选中的用户
        }
      }
    },
    'selectUser.index': {
      deep: true,
      immediate: true,
      handler: function (newValue) {
        if (this.modelValue) {
          if (newValue < 10) {
            this.$refs.memberListContainer.scrollTo({
              top: 0
            })
          } else if (newValue >= 10) {
            this.$refs.memberListContainer.scrollTo({
              top: 26 * (newValue - 9)
            })
          } else if (newValue >= this.groupMember.length) {
            this.$refs.memberListContainer.scrollTo({
              top: this.$refs.memberListContainer.scrollHeight
            })
          }
        }
      }
    }
  },
  methods: {
    // 将@用户填充到聊天编辑器
    setEditorContent () {
      this.$emit('change', this.selectUser)
    },
    groupAt (index) {
      this.selectUser.index = index
      this.selectUser.uid = this.groupMember[index].uid
      this.selectUser.username = this.groupMember[index].username
      this.setEditorContent()
    },
    keydownEvent (e) {
      if (e.code === 'ArrowDown') {
        if (this.selectUser.index + 1 >= this.groupMember.length) {
          this.selectUser.index = 0
          this.selectUser.uid = this.groupMember[this.selectUser.index].uid
          this.selectUser.username = this.groupMember[this.selectUser.index].username
        } else {
          this.selectUser.index++
          this.selectUser.uid = this.groupMember[this.selectUser.index].uid
          this.selectUser.username = this.groupMember[this.selectUser.index].username
        }
      } else if (e.code === 'ArrowUp') {
        if (this.selectUser.index - 1 < 0) {
          this.selectUser.index = this.groupMember.length - 1
          this.selectUser.uid = this.groupMember[this.selectUser.index].uid
          this.selectUser.username = this.groupMember[this.selectUser.index].username
        } else {
          this.selectUser.index--
          this.selectUser.uid = this.groupMember[this.selectUser.index].uid
          this.selectUser.username = this.groupMember[this.selectUser.index].username
        }
      } else if (e.code === 'Enter') {
        this.setEditorContent()
      }
    }
  }
}
</script>

<style scoped lang="less">
.member-list-container {
  position: absolute;
  bottom: 190px;
  left: 8px;
  z-index: 10000;

  width: 160px;
  border: 1px solid #ccc;
  height: 280px;
  padding: 4px 0;
  overflow: auto;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 0 1.1px rgba(0, 0, 0, 0.065),
  0 0 3.6px rgba(0, 0, 0, 0.095),
  0 0 16px rgba(0, 0, 0, 0.16);

  .username {
    text-align: center;
    padding: 5px 0;
    cursor: pointer;

    &:hover {
      background-color: #ccc;
    }

    &.active {
      background-color: #ccc;
    }
  }
}
</style>
