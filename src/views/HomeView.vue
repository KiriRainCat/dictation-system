<template>
  <div class="relative flex min-h-screen items-center justify-center bg-gray-100 text-center">
    <el-card class="min-w-[540px] max-w-[640px] rounded-lg shadow-lg my-20">
      <div class="text-2xl font-bold mb-4">{{ $t('list.dictation-list-index') }}</div>
      <el-table
        :data="dictationLists"
        rowKey="name"
        class="select-none cursor-pointer"
        @cell-click="handleCellClick"
      >
        <el-table-column :label="t('list.name')" prop="name"></el-table-column>
        <el-table-column :label="t('list.last-edit')" prop="lastEdited"></el-table-column>
      </el-table>
    </el-card>
    <div class="absolute bottom-2 text-center font-mono italic">
      <div>{{ $t('messages.createBy') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import axios from 'axios'
import type { dictationList } from 'env'

const { t } = useI18n()

let dictationLists = ref<Array<dictationList>>([])

onMounted(() => {
  const loading = ElLoading.service()
  axios
    .get('/lists/index.json')
    .then((res) => {
      dictationLists.value = res.data
      console.log
    })
    .catch((err) => {
      ElMessage.error(err)
    })
    .finally(() => {
      loading.close()
    })
})

const handleCellClick = (row: dictationList) => {
  router.push(`/list/${row.name}`)
}
</script>

<style scoped></style>
