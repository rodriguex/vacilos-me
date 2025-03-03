<script lang="ts" setup>
import type { user } from "@prisma/client";

const props = defineProps<{ user: user; value: number; total: number }>();
const emits = defineEmits(["newTotal"]);

const foodHelp = ref(props.value === 0 ? "" : props.value);

function handleInput(e: any) {
	foodHelp.value = e.target.value;
	emits("newTotal", props.user.id, parseFloat(e.target.value));
}
</script>

<template>
	<div class="flex flex-col w-fit">
		<span>{{ user.name }}</span>
		<input
			type="number"
			class="p-3 rounded border border-gray-300 focus:border-black"
			:value="foodHelp"
			@input="e => handleInput(e)"
		/>
	</div>
</template>
