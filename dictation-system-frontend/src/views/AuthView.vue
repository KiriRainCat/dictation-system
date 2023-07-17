<template>
  <div class="relative flex min-h-screen items-center justify-center bg-gray-100 text-center">
    <el-card class="w-[420px] rounded-lg shadow-lg my-20">
      <div class="text-2xl font-bold mb-4">{{ $t('messages.appName') }}</div>
      <div class="text-xl font-bold mb-4">{{ $t('messages.pleaseLogin') }}</div>
      <div>
        <el-input
          :placeholder="t('words.username')"
          v-model="form.username"
          class="max-w-[240px] mb-2"
        />
        <el-input
          :placeholder="t('words.password')"
          type="password"
          clearable
          v-model="form.password"
          class="max-w-[240px] mb-4"
        />
        <div>
          <el-button @click="handleLogin" type="success" plain class="min-w-[100px]">
            {{ $t('words.login') }}
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useStore } from '@/store/store'
import Cookies from 'js-cookie'

const { t } = useI18n()

/* ---------------------------------- Auth --------------------------------- */
const form = reactive({
  username: '',
  password: '',
})

const store = useStore()

const handleLogin = () => {
  if (form.username === 'test' && form.password === '123456') {
    store.isLogin = true
    router.push('/')
    ElMessage.success(t('messages.loginSuccess'))
    Cookies.set('user', form.username)
    return
  }
  ElMessage.warning(t('messages.unmatched'))
}
</script>

<style scoped></style>
