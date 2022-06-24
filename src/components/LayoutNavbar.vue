<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import RouterBreadcrumb from './RouterBreadcrumb.vue';

const userStore = useUserStore()

const handleLogout = () => {
  userStore.logout()
}
</script>

<template>
  <div class="navbar">
    <RouterBreadcrumb />
    <div class="right-menu">
      <el-dropdown class="dropdown" trigger="click">
        <div class="el-dropdown-link">
          {{ userStore.name }}
          <el-icon style="margin-left: 4px;">
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 20px;
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 210px;
  z-index: 2;
  .right-menu {
    margin-left: auto;
    .dropdown {
      .el-dropdown-link {
        height: 50px;
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}
</style>