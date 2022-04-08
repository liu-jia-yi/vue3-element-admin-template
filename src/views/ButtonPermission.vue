<script setup lang="ts">
import checkPermission from '@/utils/checkPermission'
</script>

<template>
  <el-button :disabled="!checkPermission(['admin'])">只有 admin 角色可以操作</el-button>
  <el-button :disabled="!checkPermission(['editor'])">只有 editor 角色可以操作</el-button>
  <el-button :disabled="!checkPermission(['admin', 'editor'])">admin 和 editor 角色可以操作</el-button>
</template>