<script lang="ts" setup>
import type { Ranking_Props } from "~/types";

const { data } = await useFetch<Ranking_Props>("/api/ranking");
</script>

<template>
  <div class="px-5 xl:px-0 my-10 w-full max-w-7xl mx-auto flex flex-col gap-4">
    <h1 class="font-bold text-3xl">Ranking Fucking Geral</h1>
    <div class="flex flex-col gap-2">
      <ranking-user-item
        v-for="(user, idx) in data?.users"
        :idx="idx"
        :user="user"
      />
    </div>
  </div>
</template>
