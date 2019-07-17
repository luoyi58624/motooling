<!--  -->
<template>
  <div>
      <div class="top">
         <screen/>
      </div>
      <div class="scroll">
          <materiel/><materiel/><materiel/>

      </div>
  </div>
</template>

<script>
import screen from '../../components/screen'
import materiel from '../Order/Components/materiel'
export default {
  data () {
    return {
    }
  },
  components: {
    screen, materiel
  }

}

</script>
<style lang='less' scoped>
</style>
