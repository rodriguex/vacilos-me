<script lang="ts" setup>
import { convert_date_to_brazilian_format } from "~/helpers";
import type { UserRanking } from "~/types";

defineProps<{ idx: number; user: UserRanking }>();

const isDetailsOpen = ref(false);
</script>

<template>
  <div
    class="shadow p-4 rounded w-[400px] cursor-pointer"
    @click="isDetailsOpen = !isDetailsOpen"
  >
    <span>{{
      `${idx + 1} - ${user.user_name} (${user.mistakes.length})`
    }}</span>

    <div
      v-if="isDetailsOpen && user.mistakes.length > 0"
      class="h-fit max-h-[400px] overflow-y-auto"
    >
      <div
        v-for="mistake in user.mistakes"
        class="w-[90%] mt-3 border-b border-gray-200 last:border-b-0 p-3 flex flex-col gap-2"
      >
        <span>{{ mistake.name }}</span>
        <span>{{ convert_date_to_brazilian_format(mistake.date) }}</span>
      </div>
    </div>
  </div>
</template>
