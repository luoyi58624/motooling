<template>
  <div ref="memberListContainer" class="member-list-container">
    <div v-for="(member,index) in groupMember" :key="member.id" @click="groupAt(member)">
      <div class="user-name" :class="{active: index===selectUser.index}">{{ member.username }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      selectUser: {
        index: 0,
        name: '所有人'
      }
    }
  },
  computed: {
    ...mapState({
      groupMember: state => {
        return [
          {
            username: '所有人'
          },
          ...state.userSelectedList.filter(item => item.uid !== state.userInfo.uid)
        ]
      }
    })
  },
  watch: {
    '$store.state.groupAt': {
      deep: true,
      immediate: true,
      handler: function (newValue) {
        if (newValue) {
          document.addEventListener('keydown', this.keydownEvent)
          setTimeout(() => {
            this.$store.state.editor.blur()
          })
        } else {
          document.removeEventListener('keydown', this.keydownEvent)
        }
      }
    },
    'selectUser.index': {
      deep: true,
      immediate: true,
      handler: function (newValue) {
        if (this.$store.state.groupAt) {
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
    groupAt (member) {
      this.$emit('handleAt', member)
    },
    keydownEvent (e) {
      this.$store.state.editor.blur()
      setTimeout(() => {
        if (e.code === 'ArrowDown') {
          if (this.selectUser.index + 1 >= this.groupMember.length) {
            this.selectUser.index = 0
            this.selectUser.name = this.groupMember[this.selectUser.index].username
          } else {
            this.selectUser.index++
            this.selectUser.name = this.groupMember[this.selectUser.index].username
          }
        } else if (e.code === 'ArrowUp') {
          if (this.selectUser.index - 1 < 0) {
            this.selectUser.index = this.groupMember.length - 1
            this.selectUser.name = this.groupMember[this.selectUser.index].username
          } else {
            this.selectUser.index--
            this.selectUser.name = this.groupMember[this.selectUser.index].username
          }
        } else if (e.code === 'Enter') {
          this.$store.state.wordContent += this.selectUser.name + ' '
          setTimeout(() => {
            this.$store.state.editor.focus(true)
          }, 200)
        } else if (e.code === 'Backspace' || e.code === 'Delete') {
          this.$store.state.wordContent = this.$store.state.wordContent.slice(0, -1)
          setTimeout(() => {
            this.$store.state.editor.focus(true)
          })
        }
      }, 10)
    }
  }
}
</script>

<style scoped lang="less">
.member-list-container {
  width: 160px;
  border: 1px solid #ccc;
  height: 280px;
  padding: 4px 0;
  overflow: auto;
  background-color: #ffffff;
  box-shadow: 6.7px 6.7px 5.3px rgba(0, 0, 0, 0.028),
  22.3px 22.3px 17.9px rgba(0, 0, 0, 0.042),
  100px 100px 80px rgba(0, 0, 0, 0.07);

  .user-name {
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
