<script setup lang="ts">
import LayoutSidebarItem from './LayoutSidebarItem.vue';
import { usePermissionStore } from '@/stores/permission'
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const permissionStore = usePermissionStore()

const activeMenu = computed(() => {
  const route = useRoute()
  return route.path
})
</script>

<template>
  <div class="sidebar-container">
    <el-scrollbar>
      <el-menu
        class="menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="activeMenu"
        router
      >
        <LayoutSidebarItem v-for="route in permissionStore.routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-container {
  height: 100%;
  width: 210px;
  background-color: #545c64;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
}
</style>