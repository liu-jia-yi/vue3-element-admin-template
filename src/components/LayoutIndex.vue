<script setup lang="ts">
import LayoutSidebar from './LayoutSidebar.vue';
import LayoutNavbar from './LayoutNavbar.vue';
import LayoutMain from './LayoutMain.vue';
</script>

<template>
  <div class="app-wrapper">
    <LayoutSidebar />
    <div class="main-container">
      <LayoutNavbar />
      <LayoutMain />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-wrapper {
  height: 100%;
  .main-container {
    margin-left: 210px;
  }
}
</style>