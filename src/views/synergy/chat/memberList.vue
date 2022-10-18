<template>
  <div class="member-list-container">
    <div v-for="(member,index) in groupMember" :key="member.id" @click="groupAt(member)">
      <div class="user-name" :class="{active: index===selectUser.index}">{{ member.username }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { globalVar } from '@/store'

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
          ...state.userSelectedList
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
          document.addEventListener('click', this.closePanel)
        }
      }
    }
  },
  methods: {
    groupAt (member) {
      this.$emit('handleAt', member)
    },
    keyupEvent (e) {
      // e.stopPropagation()
      // e.preventDefault()
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
        this.closePanel()
        globalVar.disableEditorEvent = true
        console.log(this.$store.state.editor)
        this.$store.state.wordContent.splice(this.$store.state.wordContent.length - 2, 2)
        // this.$store.state.editor.blur()
        this.$store.state.wordContent += this.selectUser.name + ' '
        // this.$emit('selectUser', this.selectUser.name)
      }
    },
    closePanel () {
      document.removeEventListener('click', this.closePanel)
      this.$store.state.groupAt = false
    }
  }
  // mounted () {
  //   document.addEventListener('keyup', this.keyupEvent, true)
  // },
  // destroyed () {
  //   document.removeEventListener('keyup', this.keyupEvent)
  // }
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
