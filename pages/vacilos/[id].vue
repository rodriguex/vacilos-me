<script lang="ts" setup>
import type { Mistake_By_Id_Props } from "~/types";
import { convert_date_to_brazilian_format } from "~/helpers";

const route = useRoute();
const { data } = await useFetch<Mistake_By_Id_Props>(
  `/api/mistake_periods/${route.params.id}`
);

const is_food_table_open = ref(false);
const total = ref(120);
const help = ref<{ user_id: number; help: number }[]>([]);

const mistakes = computed(() => {
  if (
    data?.value?.mistake_period?.mistakes &&
    data?.value.mistake_period.mistakes.length
  ) {
    return data?.value.mistake_period.mistakes;
  }

  return [];
});

function handle_total(who: number, value: number) {
  const money = !value ? 0 : value;
  const idx = help.value.findIndex((h) => h.user_id === who);

  if (idx === -1) {
    total.value -= money;
    help.value.push({ user_id: who, help: money });
  } else {
    total.value = total.value + help.value[idx].help - money;
    help.value[idx].help = money;
  }
}

async function finish_mistake_period() {
  await $fetch(`/api/mistake_periods/${data.value?.mistake_period.id}`, {
    method: "put",
  });
  await navigateTo("/");
}
</script>

<template>
  <div class="px-5 xl:px-0 my-10 w-full max-w-7xl mx-auto flex flex-col gap-4">
    <div class="flex flex-col">
      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <span
            >Iniciado em:
            {{
              convert_date_to_brazilian_format(
                data?.mistake_period.created_at ?? ""
              )
            }}</span
          >
          <span
            >Encerrado em:
            {{
              convert_date_to_brazilian_format(
                data?.mistake_period.finished_at ?? ""
              )
            }}</span
          >
        </div>
        <button
          v-if="data?.mistake_period.is_active"
          class="border border-black p-2 rounded hover:bg-black hover:text-white cursor-pointer"
          @click="finish_mistake_period"
        >
          Encerrar quadro
        </button>
      </div>
      <span class="font-bold text-xl mt-5">{{
        `Total de vacilos: ${mistakes.length} (R$${
          mistakes.length * 5
        },00 reais)`
      }}</span>

      <div
        v-if="data?.user_mistakes && data.user_mistakes.length > 0"
        class="flex flex-wrap gap-3"
      >
        <div
          v-for="user in data?.user_mistakes"
          class="mt-4 border border-gray-200 p-5 rounded w-[300px]"
        >
          <span>{{
            `${user.user_name} - R$${user.mistakes.length * 5},00`
          }}</span>
          <div class="mt-2 flex flex-col gap-1">
            <span class="" v-for="(mistake, idx) in user.mistakes">
              {{ `${idx + 1} - ${mistake.name}` }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="data?.mistake_period?.is_active" class="mt-10 flex flex-col">
        <span>{{
          `Preço de dois centos de salgados com 2 refris: R$120,00.`
        }}</span>
        <span class="font-bold text-lg">{{
          `Falta: R$${total - mistakes.length * 5},00`
        }}</span>
        <button
          class="mt-2 w-fit border border-black p-3 rounded font-bold cursor-pointer hover:bg-black hover:text-white"
          @click="is_food_table_open = !is_food_table_open"
        >
          Ajuda no salgado
        </button>

        <div v-if="is_food_table_open" class="flex flex-wrap gap-3">
          <div v-for="user in data?.users">
            <food-help-table
              class="mt-4"
              :user="user"
              :value="
                help.length > 0
                  ? help.find((item) => item.user_id == user.id)?.help ?? 0
                  : 0
              "
              :total="total"
              @newTotal="handle_total"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
