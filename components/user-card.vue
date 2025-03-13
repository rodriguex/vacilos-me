<script lang="ts" setup>
import type { user } from "@prisma/client";
import { Trash } from "lucide-vue-next";

const props = defineProps<{
  user: user;
  mistakes: { id: number; name: string }[];
  mistake_period_id: number;
  vacilos_position: number;
  refresh: () => void;
}>();

async function remove_mistake(mistake_id: number) {
  await $fetch(`/api/mistakes/${mistake_id}`, {
    method: "delete",
  });
  props.refresh();
}
</script>

<template>
  <div
    class="w-[33%] max-w-[400px] bg-white border border-gray-200 rounded-lg h-fit p-5"
  >
    <div
      class="flex items-center justify-between pb-2 mb-3 border-b border-gray-200 gap-1 dyna"
    >
      <span class="font-bold text-[#331f52] text-lg">{{
        `#${vacilos_position}`
      }}</span>
      <span class="font-bold text-base">{{
        `${user.name} - R$${(mistakes.length * 5).toFixed(2)}`
      }}</span>
    </div>

    <div class="mt-3 flex flex-col gap-2">
      <div
        v-if="mistakes.length > 0"
        class="max-h-[120px] overflow-y-auto mb-3"
      >
        <div
          v-for="(mistake, idx) in mistakes"
          :key="mistake.id"
          class="w-full flex justify-between items-center mb-3"
        >
          <span>{{ `${idx + 1}. ${mistake.name}` }}</span>
          <Trash
            :size="18"
            class="text-red-700 cursor-pointer"
            @click="remove_mistake(mistake.id)"
          />
        </div>
      </div>

      <new-vacilo
        :mistake_period_id="mistake_period_id"
        :user_id="user.id"
        :refresh="refresh"
      />
    </div>
  </div>
</template>
