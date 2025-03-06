<script setup lang="ts">
import { CircuitBoard, Home, Trophy, User } from "lucide-vue-next";
</script>

<template>
  <div class="fixed w-[300px] flex flex-col gap-4 h-full py-10 px-4">
    <NuxtLink
      to="/"
      class="cursor-pointer flex items-center text-white gap-3 text-xl p-4 hover:bg-white hover:shadow-lg hover:text-[#43296a] hover:rounded-lg"
    >
      <Home />
      <span>Home</span>
    </NuxtLink>

    <NuxtLink
      to="/users"
      class="cursor-pointer flex items-center text-white gap-3 text-xl p-4 hover:bg-white hover:shadow-lg hover:text-[#43296a] hover:rounded-lg"
    >
      <User />
      <span>Usuários</span>
    </NuxtLink>

    <NuxtLink
      to="/vacilos"
      class="cursor-pointer flex items-center text-white gap-3 text-xl p-4 hover:bg-white hover:shadow-lg hover:text-[#43296a] hover:rounded-lg"
    >
      <CircuitBoard />
      <span>Quadros</span>
    </NuxtLink>

    <NuxtLink
      to="/ranking"
      class="cursor-pointer flex items-center text-white gap-3 text-xl p-4 hover:bg-white hover:shadow-lg hover:text-[#43296a] hover:rounded-lg"
    >
      <Trophy />
      <span>Ranking</span>
    </NuxtLink>
  </div>
</template>
