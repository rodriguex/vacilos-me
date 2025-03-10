<script setup lang="ts">
import { CircuitBoard, Home, Trophy, User } from "lucide-vue-next";
const route = useRoute();

function isCurrentRoute(path: string) {
  return route.path === path;
}
</script>

<template>
  <div class="fixed w-[300px] flex flex-col gap-4 h-full py-10 px-4">
    <NuxtLink
      to="/"
      :class="`cursor-pointer rounded-lg flex items-center gap-3 text-xl p-4 hover:bg-white hover:shadow-lg hover:text-[#331f52]  ${
        isCurrentRoute('/') ? 'bg-white text-[#331f52]' : 'text-white'
      }`"
    >
      <Home />
      <span>Home</span>
    </NuxtLink>

    <NuxtLink
      to="/vacilos"
      :class="`cursor-pointer flex items-center  gap-3 text-xl p-4 hover:bg-white hover:shadow-lg hover:text-[#331f52] rounded-lg ${
        isCurrentRoute('/vacilos') ? 'bg-white text-[#331f52]' : 'text-white'
      }`"
    >
      <CircuitBoard />
      <span>Quadros</span>
    </NuxtLink>

    <NuxtLink
      to="/ranking"
      :class="`cursor-pointer rounded-lg flex items-center  gap-3 text-xl p-4 hover:bg-white hover:shadow-lg hover:text-[#331f52]  ${
        isCurrentRoute('/ranking') ? 'bg-white text-[#331f52]' : 'text-white'
      }`"
    >
      <Trophy />
      <span>Ranking</span>
    </NuxtLink>

    <NuxtLink
      to="/users"
      :class="`cursor-pointer flex items-center  gap-3 text-xl p-4 hover:bg-white hover:shadow-lg hover:text-[#331f52] rounded-lg ${
        isCurrentRoute('/users') ? 'bg-white text-[#331f52]' : 'text-white'
      }`"
    >
      <User />
      <span>Usuários</span>
    </NuxtLink>
  </div>
</template>
