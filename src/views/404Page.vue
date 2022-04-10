<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
  <div class="page-container">
    <div>哎呀，您访问的页面不存在，请点击下面的按钮返回首页。</div>
    <el-button type="primary" @click="router.push('/')">回到首页</el-button>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  line-height: 2;
  text-align: center;
  margin-top: 100px;
}
</style>