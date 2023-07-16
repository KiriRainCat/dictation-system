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
import type { dictationList } from 'env'

const { t } = useI18n()

const dictationLists: Array<dictationList> = [
  { name: '雅思作文必备素材(上)', lastEdited: '2023/7/16 08:15' },
  { name: '雅思作文必备素材(下)', lastEdited: '2023/7/16 08:15' },
]

const handleCellClick = (row: dictationList) => {
  router.push(`/list/${row.name}`)
}
</script>

<style scoped></style>
