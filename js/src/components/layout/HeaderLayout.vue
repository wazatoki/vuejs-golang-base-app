<template>
  <div class="header-layout" ref="headerLayout">
    <el-container style="position: relative;">
      <el-header style="height: 60px;">
        <ContentsHeader />
      </el-header>

      <el-main style="padding-top: 60px;">
        <slot></slot>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContentsHeader from '@/components/contents/ContentsHeader.vue';

@Component({
  components: {
    ContentsHeader,
  },
})
export default class HeaderLayout extends Vue {}
</script>

<style scoped>
div.header-layout,
.el-container,
.el-main {
  height: 100%;
}
</style>
