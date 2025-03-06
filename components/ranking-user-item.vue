<script lang="ts" setup>
import { convert_date_to_brazilian_format } from "~/helpers";
import type { UserRanking } from "~/types";

defineProps<{ idx: number; user: UserRanking }>();

const isDetailsOpen = ref(false);
</script>

<template>
  <div class="w-[600px] flex flex-col gap-2">
    <div
      class="border border-gray-200 shadow p-4 rounded cursor-pointer h-fit"
      @click="isDetailsOpen = !isDetailsOpen"
    >
      <span>{{
        `${idx + 1} - ${user.user_name} (${user.mistakes.length})`
      }}</span>
    </div>

    <div
      v-if="isDetailsOpen"
      class="no-scrollbar h-fit max-h-[300px] overflow-y-auto border border-gray-200 rounded"
    >
      <div
        v-for="mistake in user.mistakes"
        class="w-[95%] mb-3 last:mb-0 border-b border-gray-200 last:border-b-0 p-3 flex flex-col gap-1"
      >
        <span class="font-bold">{{ mistake.name }}</span>
        <span>{{ convert_date_to_brazilian_format(mistake.date) }}</span>
      </div>
    </div>
  </div>
</template>
