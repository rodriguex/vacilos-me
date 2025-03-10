<script lang="ts" setup>
import type { user } from "@prisma/client";
import { PlusCircle } from "lucide-vue-next";

const { data, refresh } = useFetch<{ users: user[] }>("/api/users");

const isNewUserInputOpen = ref(false);
const newUserName = ref("");
const inputRef = ref<any>(null);

async function saveNewUser() {
  await $fetch("/api/home", {
    method: "post",
    body: { name: newUserName.value },
  });
  newUserName.value = "";
  refresh();
}
</script>

<template>
  <h1 class="mb-8 font-bold text-2xl text-[#331f52]">Usuários cadastrados</h1>

  <div
    class="flex items-center mb-4 gap-1 cursor-pointer text-[#331f52] w-fit"
    @click="
      async () => {
        isNewUserInputOpen = !isNewUserInputOpen;
        await nextTick();
        inputRef?.focus();
      }
    "
  >
    <PlusCircle />
    <span>Criar</span>
  </div>

  <form v-if="isNewUserInputOpen" @submit.prevent="saveNewUser">
    <input
      ref="inputRef"
      class="border border-gray-200 p-3 rounded w-[400px] mb-8 focus:outline-none text-lg text-gray-800"
      v-model="newUserName"
    />
  </form>

  <div
    v-for="user in data?.users"
    class="border mb-4 last:mb-0 border-gray-200 shadow p-4 rounded w-[400px]"
  >
    <span>{{ user.name }}</span>
  </div>
</template>
