<template>
  <div>
    <el-input></el-input>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Api from '@/api'

@Component
export default class Login extends Vue {
  created () {
    this.login()
  }

  login () {
    const data: object = {
      account: '13200000000',
      password: '111111'
    }
    Api.user.login(data).then((res: any) => {
      console.log(res)
    })
  }
}
</script>
<style scoped lang="scss">
</style>
