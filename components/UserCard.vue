<script setup>
defineProps(["user"]);
</script>

<template>
	<div class="p-5 rounded">
		<span>{{ user.name }}</span>
		<div class="mt-3 flex flex-col gap-2">
			<span class="font-bold">vacilos..</span>
			<span>coming...</span>
		</div>
	</div>
</template>
