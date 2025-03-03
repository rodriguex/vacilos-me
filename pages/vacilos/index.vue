<script lang="ts" setup>
import type { mistake_period } from "@prisma/client";
import { convert_date_to_brazilian_format } from "~/helpers";

const { data } = await useFetch<{ mistake_periods: mistake_period[] }>(
	"/api/mistake_periods",
);
</script>

<template>
	<div class="px-5 xl:px-0 my-10 w-full max-w-7xl mx-auto flex flex-col gap-4">
		<h1 class="font-bold text-2xl">
			{{ `Quadros encerrados (${data?.mistake_periods.length})` }}
		</h1>

		<div
			v-if="data?.mistake_periods && data.mistake_periods.length > 0"
			class="flex gap-3"
		>
			<div
				v-for="mistake_period in data.mistake_periods"
				class="flex gap-1 border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-200"
			>
				<NuxtLink :to="{ path: `/vacilos/${mistake_period.id}` }">
					<span>
						{{
							convert_date_to_brazilian_format(mistake_period.created_at, false)
						}}</span
					>
					<span>
						-
						{{
							convert_date_to_brazilian_format(
								mistake_period.finished_at ?? "",
								false,
							)
						}}</span
					>
				</NuxtLink>
			</div>
		</div>

		<span v-else>Nenhum quadro foi encerrado ainda</span>
	</div>
</template>
