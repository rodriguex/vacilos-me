<script setup>
const { data, refresh } = await useFetch("/api/users");

const isInputOpen = ref(false);
const newUser = ref("");
const inputRef = ref(null);

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
	<div class="my-10 w-full max-w-5xl mx-auto flex flex-col gap-4">
		<div class="flex items-center gap-2">
			<h1 class="font-extrabold text-3xl">Usuários</h1>
			<button class="border p-1 rounded-lg mt-2" @click="handleClick">
				+ Criar
			</button>
			<form @submit.prevent="handleSubmit">
				<input
					v-if="isInputOpen"
					ref="inputRef"
					class="border-2 p-3 rounded-lg"
					v-model="newUser"
				/>
			</form>
		</div>
		<div class="flex flex-wrap items-center gap-3">
			<div
				class="border-2 border-gray-300 w-fit p-3 rounded-lg"
				v-for="user in data.users"
				:key="user.id"
			>
				<UserCard :user="user" />
			</div>
		</div>
	</div>
</template>
