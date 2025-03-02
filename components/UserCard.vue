<script lang="ts" setup>
import type { mistake_period, user } from "@prisma/client";

defineProps<{
	user: user;
	mistakes: { id: number; name: string }[];
	mistake_period_id: number;
	vacilos_position: number;
	refresh: () => void;
}>();
</script>

<template>
	<div class="w-full max-w-[300px] shadow bg-white rounded-lg h-fit p-5">
		<div
			class="flex items-center pb-2 mb-3 border-b border-gray-200 gap-1 text-lg"
		>
			<span class="text-base">Posição atual:</span>
			<span class="font-bold">{{ vacilos_position }}</span>
		</div>
		<span>{{ `${user.name} - R$${mistakes.length * 5},00` }}</span>
		<div class="mt-5 flex flex-col gap-2">
			<span v-if="mistakes.length" class="font-bold italic">vacilos..</span>
			<div
				v-if="mistakes.length > 0"
				class="pr-3 max-h-[120px] overflow-y-auto"
			>
				<ul class="list-decimal">
					<li v-for="mistake in mistakes" :key="mistake.id" class="w-fit ml-5">
						<span>{{ mistake.name }}</span>
					</li>
				</ul>
			</div>
			<NewVacilo
				:mistake_period_id="mistake_period_id"
				:user_id="user.id"
				:refresh="refresh"
			/>
		</div>
	</div>
</template>
