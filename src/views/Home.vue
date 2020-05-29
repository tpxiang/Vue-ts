<template>
  <div class="appMainBox">
    <!-- 头部 -->
    <layout-header></layout-header>
    <main class="app-main">
      <div class="mainBox">
        <div class="containerBox">
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </main>
    <LayoutHeader />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LayoutHeader from '@/components/Layout/LayoutHeader.vue'
@Component({
  components: { LayoutHeader }
})
export default class Layout extends Vue {
  created () {
    console.log(31)
  }
}
</script>

<style lang="scss" scoped>
  .appMainBox {
    min-width: 1400px;
    .app-main {
      display: flex;
      height: calc(100vh - 67px);
      overflow: hidden;
      .menuBox {
        height: auto;
        min-height: calc(100vh - 67px);
        flex-shrink: 0;
        overflow-y: auto;
        padding-right: 16px;
        position: relative;
      }

      .mainBox {
        width: 100%;
        height: 100%;
        min-height: calc(100vh - 67px);
        overflow-y: scroll;
        .containerBox {
          height: auto;
          min-height: calc(100vh - 97px);
          margin: 0px 16px 14px 0;
          font-family: PingFang SC;
        }
      }
    }
  }
</style>
