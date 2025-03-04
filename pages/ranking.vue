<script lang="ts" setup>
import type { Ranking_Props } from "~/types";

const { data } = await useFetch<Ranking_Props>("/api/ranking");
</script>

<template>
  <div class="px-5 xl:px-0 my-10 w-full max-w-7xl mx-auto flex flex-col gap-4">
    <h1 class="font-bold text-3xl">Ranking Fucking Geral</h1>
    <div class="mt-3 flex flex-col gap-3">
      <div
        v-for="(user_mistakes, idx) in data?.user_mistakes"
        class="border border-gray-300 p-3 rounded w-[300px] cursor-pointer"
      >
        <span>{{
          `${idx + 1} - ${user_mistakes.user_name} (${
            user_mistakes.mistakes.length
          })`
        }}</span>
      </div>
    </div>
  </div>
</template>
