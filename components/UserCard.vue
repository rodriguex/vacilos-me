<script lang="ts" setup>
import type { user, user_vacilo, vacilo } from "@prisma/client";

defineProps<{
	user: user & {
		user_vacilo: user_vacilo &
			{
				id: Number;
				user_id: Number;
				vacilo_id: Number;
				created_at: Date;
				vacilo: vacilo;
			}[];
	};
	vacilosPosition: Number;
	refresh: () => void;
}>();
</script>

<template>
	<div class="shadow bg-white rounded-lg h-fit p-5">
		<div
			class="w-full max-w-[200px] flex items-center pb-2 mb-3 border-b border-gray-200 gap-1 text-lg"
		>
			<span>Posição na tabela:</span>
			<span class="font-bold">{{ vacilosPosition }}</span>
		</div>
		<span>{{ `${user.name} - R$${user.user_vacilo.length * 5},00` }}</span>
		<div class="mt-5 flex flex-col gap-2">
			<span v-if="user.user_vacilo.length" class="font-bold italic mb-3"
				>vacilos..</span
			>
			<div
				v-if="user.user_vacilo.length > 0"
				class="pr-3 max-h-[120px] overflow-y-auto"
			>
				<ul class="list-decimal">
					<li
						v-for="user_vacilo in user.user_vacilo"
						:key="user_vacilo.vacilo.id"
						class="border-b-2 border-gray-200 w-fit ml-5"
					>
						<span>{{ user_vacilo.vacilo.name }}</span>
						<span class="ml-2">{{ user_vacilo.created_at }}</span>
					</li>
				</ul>
			</div>
			<NewVacilo :userId="user.id" :refresh="refresh" />
		</div>
	</div>
</template>
