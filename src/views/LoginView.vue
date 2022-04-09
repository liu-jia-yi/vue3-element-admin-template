<script setup lang="ts">
import { reactive, ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const router = useRouter()

const formRef = ref()

const form = reactive({
  username: '',
  password: ''
})
const formRules = reactive({
  username: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }]
})

const userStore = useUserStore()

const handleLogin = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      userStore.login(form).then(() => {
        router.push('/')
      })
    }
  })
}
</script>

<template>
  <div class="login-container">
    <el-form class="login-form" ref="formRef" :model="form" :rules="formRules">
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <el-input v-model="form.username" :prefix-icon="User"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" :prefix-icon="Lock" show-password></el-input>
      </el-form-item>

      <el-button type="primary" style="width: 100%;" @click="handleLogin">登录</el-button>

      <div class="tooltip">
        <div>账号：admin 密码：随便输</div>
        <div>账号：editor 密码：随便输</div>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
  .login-form {
    width: 520px;
    .title-container {
      .title {
        text-align: center;
      }
    }
    .tooltip {
      margin-top: 16px;
      font-size: 14px;
      line-height: 1.5;
    }
  }
}
</style>