<script lang="ts" setup>
import type { user, user_vacilo, vacilo } from "@prisma/client";

defineProps<{
	user: user & { user_vacilo: user_vacilo & { vacilo: vacilo }[] };
	refresh: () => void;
}>();
</script>

<template>
	<div class="border border-gray-200 rounded-lg h-fit p-5">
		<span>{{ user.name }}</span>
		<div class="mt-3 flex flex-col gap-2">
			<span class="font-bold">vacilos..</span>
			<div v-if="user.user_vacilo.length > 0">
				<ul>
					<li
						v-for="user_vacilo in user.user_vacilo"
						:key="user_vacilo.vacilo.id"
					>
						{{ user_vacilo.vacilo.name }}
					</li>
				</ul>
			</div>
			<NewVacilo :userId="user.id" :refresh="refresh" />
		</div>
	</div>
</template>
