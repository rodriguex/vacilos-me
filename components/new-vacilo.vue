<script lang="ts" setup>
const props = defineProps<{
	mistake_period_id: number;
	user_id: number;
	refresh: () => void;
}>();
const vacilo = ref("");

async function save_new_mistake() {
	await $fetch("/api/mistakes", {
		method: "post",
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
	<form @submit.prevent="save_new_mistake">
		<input
			v-model="vacilo"
			class="mt-2 border border-gray-200 focus:border-black p-3 rounded focus:outline-none placeholder:text-gray-400"
			placeholder="adicionar novo vacilo..."
		/>
	</form>
</template>
