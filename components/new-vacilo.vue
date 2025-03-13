<script lang="ts" setup>
import { PlusCircle } from "lucide-vue-next";

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
  <form
    @submit.prevent="save_new_mistake"
    class="flex items-center gap-3 border-b-2 border-black"
  >
    <PlusCircle :size="20" />
    <input
      v-model="vacilo"
      class="w-full h-[40px] focus:outline-none placeholder:text-gray-400"
      placeholder="adicionar novo vacilo..."
    />
  </form>
</template>
