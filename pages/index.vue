<script lang="ts" setup>
import type { Home_Props } from "~/types";
import { convert_date_to_brazilian_format } from "../helpers";

const { data, refresh } = await useFetch<Home_Props>("/api/home");

const is_new_user_input_open = ref(false);
const new_user = ref("");
const input_ref = ref<any>(null);

const total_mistakes = computed(() => {
  let total = 0;
  if (data.value?.mistakes && data.value.mistakes.length > 0) {
    data.value.mistakes.forEach((mistake) => {
      if (mistake.items.length > 0) {
        total += mistake.items.length;
      }
    });
  }
  return total;
});

function user_mistakes(userId: number) {
  if (data.value?.mistakes && data.value.mistakes.length > 0) {
    const idx = data.value.mistakes.findIndex(
      (item) => item.user_id === userId
    );
    if (idx > -1) {
      return data.value.mistakes[idx].items;
    }
    return [];
  }
  return [];
}

async function show_new_user_input() {
  is_new_user_input_open.value = !is_new_user_input_open.value;
  if (is_new_user_input_open.value) {
    await nextTick();
    input_ref.value.focus();
  }
}

async function save_new_mistake_period() {
  await $fetch("/api/mistake_periods", {
    method: "post",
  });
  refresh();
}
</script>

<template>
  <div>
    <div
      v-if="!data?.mistake_period?.is_active"
      class="w-fit flex gap-2 items-center"
    >
      <span class="block">Sem quadros ativos</span>
      <button
        class="border border-black p-1 rounded-lg cursor-pointer hover:bg-black hover:text-white"
        @click="save_new_mistake_period"
      >
        + Criar
      </button>
    </div>
    <div v-else class="flex items-center justify-between gap-2">
      <div class="flex flex-col">
        <span
          >Quadro iniciado em
          {{
            convert_date_to_brazilian_format(
              data?.mistake_period.created_at ?? ""
            )
          }}</span
        >
        <span class="mt-4 font-bold text-[#331f52] text-xl">{{
          `Total de R$${(total_mistakes * 5).toFixed(2)} reais em vacilos`
        }}</span>
      </div>
      <button
        class="cursor-pointer border-2 border-[#331f52] p-3 rounded font-bold hover:bg-[#331f52] hover:text-white text-[#331f52]"
        @click="
          async () => await navigateTo(`/vacilos/${data?.mistake_period.id}`)
        "
      >
        Ver quadro
      </button>
    </div>
  </div>

  <div v-if="data?.users && data.users.length > 0">
    <p class="text-sm text-gray-400">
      As posições listadas abaixo são calculadas por quadro, essa não é a
      posição geral.
    </p>

    <div class="mt-5 flex flex-wrap gap-5">
      <user-card
        v-for="(user, idx) in data.users"
        :key="user.id"
        :user="user"
        :mistakes="user_mistakes(user.id)"
        :mistake_period_id="data.mistake_period.id"
        :vacilos_position="idx + 1"
        :refresh="refresh"
      />
    </div>
  </div>
</template>
