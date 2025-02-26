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
			class="border border-gray-300 p-2 rounded-lg focus:outline-none"
			v-model="vacilo"
		/>
	</form>
</template>
