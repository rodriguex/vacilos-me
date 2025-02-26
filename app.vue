<script setup>
const { data, refresh } = await useFetch("/api/users");

const isInputOpen = ref(false);
const newUser = ref("");
const inputRef = ref(null);
const vacilosTotal = computed(() => {
	if (data.value.users.length > 0) {
		const total = data.value.users.reduce((acc, user) => {
			return (acc += user.user_vacilo.length > 0 ? user.user_vacilo.length : 0);
		}, 0);
		return total;
	}
});

async function handleClick() {
	isInputOpen.value = !isInputOpen.value;
	if (isInputOpen.value) {
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
</script>

<template>
	<div class="my-10 w-full max-w-7xl mx-auto flex flex-col gap-4">
		<div class="flex items-center gap-2 w-fit border-b-2 border-gray-200 pb-2">
			<h1 class="font-light text-2xl">Usuários</h1>
			<button class="border p-1 rounded-lg" @click="handleClick">
				+ Criar
			</button>
			<form @submit.prevent="handleSubmit">
				<input
					v-if="isInputOpen"
					v-model="newUser"
					ref="inputRef"
					class="border-2 p-3 rounded-lg"
				/>
			</form>
		</div>
		<h2 class="text-xl font-bold my-4">
			{{
				vacilosTotal == 0
					? "Sem vacilos por enquanto"
					: `Total de R$${vacilosTotal * 5},00 reais em vacilos`
			}}
		</h2>
		<div class="flex flex-wrap gap-5">
			<UserCard
				v-for="(user, idx) in data.users"
				:key="user.id"
				:user="user"
				:vacilosPosition="idx + 1"
				:refresh="refresh"
			/>
		</div>
	</div>
</template>
