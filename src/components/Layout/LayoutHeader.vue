<template>
  <div class="layout-header">
    header
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class LayoutHeader extends Vue {

}
</script>

<style lang="scss" scoped>
.layout-header {
  line-height: 67px;
  height: 67px;
}

</style>
