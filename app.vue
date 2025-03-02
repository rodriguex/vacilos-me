<script lang="ts" setup>
import type { mistake_period } from "@prisma/client";
import { convertDateToBrazilianFormat } from "./helpers";

type User = {
	id: number;
	name: string;
};

type Mistake = {
	user_id: number;
	items: { id: number; name: string }[];
};

const { data, refresh } = await useFetch<{
	mistake_period: mistake_period;
	users: User[];
	mistakes: Mistake[];
}>("/api/users");

const isNewUserInputOpen = ref(false);
const newUser = ref("");
const inputRef = ref<any>(null);

function userMistakes(userId: number) {
	if (data.value?.mistakes && data.value.mistakes.length > 0) {
		const idx = data.value.mistakes.findIndex(item => item.user_id === userId);
		if (idx > -1) {
			return data.value.mistakes[idx].items;
		}
		return [];
	}
	return [];
}

const vacilosTotal = computed(() => {
	let total = 0;
	if (data.value?.mistakes && data.value.mistakes.length > 0) {
		data.value.mistakes.forEach(mistake => {
			if (mistake.items.length > 0) {
				total += mistake.items.length;
			}
		});
	}
	return total;
});

async function handleClick() {
	isNewUserInputOpen.value = !isNewUserInputOpen.value;
	if (isNewUserInputOpen.value) {
		await nextTick();
		inputRef.value.focus();
	}
}

async function handleSubmit() {
	await $fetch("/api/users", {
		method: "POST",
		body: {
			name: newUser.value,
		},
	});
	newUser.value = "";
	refresh();
}

async function handleNewMistakePeriod() {
	await $fetch("/api/mistake_periods", {
		method: "post",
	});
	refresh();
}
</script>

<template>
	<div class="px-5 my-10 w-full max-w-7xl mx-auto flex flex-col gap-4">
		<div class="flex items-center gap-2 w-fit border-b-2 border-gray-200 pb-2">
			<h1 class="font-light text-2xl">Usuários</h1>
			<button
				class="border border-black p-1 rounded-lg hover:bg-black hover:text-white cursor-pointer"
				@click="handleClick"
			>
				+ Criar
			</button>
			<form @submit.prevent="handleSubmit">
				<input
					v-if="isNewUserInputOpen"
					v-model="newUser"
					ref="inputRef"
					class="border-2 p-3 rounded-lg"
				/>
			</form>
		</div>

		<div class="my-4">
			<div v-if="vacilosTotal === 0" class="w-fit flex gap-2 items-center">
				<span class="block">Sem quadros ativos</span>
				<button
					class="border border-black p-1 rounded-lg"
					@click="handleNewMistakePeriod"
				>
					+ Criar
				</button>
			</div>
			<div v-else class="flex items-center justify-between gap-2">
				<div class="flex flex-col">
					<span
						>Quadro iniciado em
						{{
							convertDateToBrazilianFormat(
								data?.mistake_period.created_at ?? "",
							)
						}}</span
					>
					<span class="font-bold text-xl">{{
						`Total de R$${vacilosTotal * 5},00 reais em vacilos`
					}}</span>
				</div>
				<button
					class="cursor-pointer border border-black p-3 rounded font-bold hover:bg-black hover:text-white"
				>
					Encerrar quadro
				</button>
			</div>
		</div>

		<p class="italic text-sm text-gray-400">
			As posições listadas abaixo são calculadas por quadro, essa não é a
			posição geral.
		</p>

		<div
			v-if="data?.users && data.users.length > 0"
			class="flex flex-wrap gap-5"
		>
			<UserCard
				v-for="(user, idx) in data.users"
				:key="user.id"
				:user="user"
				:mistakes="userMistakes(user.id)"
				:mistake_period_id="data.mistake_period.id"
				:vacilos_position="idx + 1"
				:refresh="refresh"
			/>
		</div>
	</div>
</template>
