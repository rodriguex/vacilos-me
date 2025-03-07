<script lang="ts" setup>
import type { Ranking_Props } from "~/types";

const { data } = await useFetch<Ranking_Props>("/api/ranking");
</script>

<template>
  <div class="flex flex-col">
    <h1 class="font-bold text-3xl">Ranking Fucking Geral</h1>
    <div class="mt-10 flex flex-col gap-2">
      <ranking-user-item
        v-for="(user, idx) in data?.users"
        :idx="idx"
        :user="user"
      />
    </div>
  </div>
</template>
