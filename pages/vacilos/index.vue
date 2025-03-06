<script lang="ts" setup>
import type { mistake_period } from "@prisma/client";
import { convert_date_to_brazilian_format } from "~/helpers";

const { data } = await useFetch<{ mistake_periods: mistake_period[] }>(
  "/api/mistake_periods"
);
</script>

<template>
  <h1 class="font-bold text-2xl">
    {{ `Quadros encerrados (${data?.mistake_periods.length})` }}
  </h1>

  <div
    v-if="data?.mistake_periods && data.mistake_periods.length > 0"
    class="mt-6 flex flex-wrap gap-3"
  >
    <div
      v-for="mistake_period in data.mistake_periods"
      class="flex gap-1 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-200"
    >
      <NuxtLink :to="{ path: `/vacilos/${mistake_period.id}` }">
        <span class="text-gray-500">
          {{
            convert_date_to_brazilian_format(mistake_period.created_at, false)
          }}</span
        >
        <span class="text-gray-500">
          -
          {{
            convert_date_to_brazilian_format(
              mistake_period.finished_at ?? "",
              false
            )
          }}</span
        >
      </NuxtLink>
    </div>
  </div>

  <span v-else>Nenhum quadro foi encerrado ainda</span>
</template>
