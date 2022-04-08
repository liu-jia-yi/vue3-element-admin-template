<script setup lang="ts">
import token from '@/api/token';

const testToken = () => {
  token.testToken().catch(err => err)
}
</script>

<template>
  <el-button @click="testToken">测试登录过期</el-button>
</template>