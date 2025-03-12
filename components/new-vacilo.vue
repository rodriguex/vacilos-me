<script lang="ts" setup>
import { Plus } from "lucide-vue-next";

const props = defineProps<{
  mistake_period_id: number;
  user_id: number;
  refresh: () => void;
}>();
const vacilo = ref("");

async function save_new_mistake() {
  await $fetch("/api/mistakes", {
    method: "post",
    body: {
      name: vacilo.value,
      user_id: props.user_id,
      mistake_period_id: props.mistake_period_id,
    },
  });
  vacilo.value = "";
  props.refresh();
}
</script>

<template>
  <form @submit.prevent="save_new_mistake" class="flex items-center">
    <Plus :size="20" />
    <input
      v-model="vacilo"
      class="w-full h-[40px] hover:border-b-2 border-gray-200 focus:border-b-2 focus:border-black p-2 focus:outline-none placeholder:text-gray-400"
      placeholder="adicionar novo vacilo..."
    />
  </form>
</template>
