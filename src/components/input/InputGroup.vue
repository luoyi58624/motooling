<template>
    <div>
        <div v-for="(item,index) in fields" :key="index">
          <cu-input :label="item.label" :placeholder="item.placeholder">
          </cu-input>
        </div>
    </div>
</template>

<script>
import CuInput from '@/components/input/Input'

export default {
  name: 'InputGroup',
  props: {
    fields: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  components: {
    CuInput
  }
}

</script>
