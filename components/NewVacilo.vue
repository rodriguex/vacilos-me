<script lang="ts" setup>
const props = defineProps<{
	mistake_period_id: number;
	user_id: number;
	refresh: () => void;
}>();
const vacilo = ref("");

async function handleSubmit() {
	await $fetch("/api/mistakes", {
		method: "POST",
		body: {
			name: vacilo.value,
			user_id: props.user_id,
			mistake_period_id: props.mistake_period_id,
		},
	});
	vacilo.value = "";
	props.refresh();
}
</script>

<template>
	<form @submit.prevent="handleSubmit">
		<input
			class="mt-2 border border-gray-200 focus:border-black p-3 rounded focus:outline-none placeholder:text-gray-400"
			v-model="vacilo"
			placeholder="adicionar novo vacilo..."
		/>
	</form>
</template>
