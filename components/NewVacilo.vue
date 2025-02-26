<script lang="ts" setup>
const props = defineProps<{ userId: Number; refresh: () => void }>();
const vacilo = ref("");

async function handleSubmit() {
	await $fetch("/api/vacilos", {
		method: "POST",
		body: {
			name: vacilo.value,
			user_id: props.userId,
		},
	});
	vacilo.value = "";
	props.refresh();
}
</script>

<template>
	<form @submit.prevent="handleSubmit">
		<input
			id="my-bad"
			class="border border-gray-100 p-4 rounded-lg focus:outline-none placeholder:text-gray-300 placeholder:font-extrabold font-bold"
			v-model="vacilo"
			placeholder="adicionar novo vacilo..."
		/>
	</form>
</template>
