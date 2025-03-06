<template>
  <div class="flex h-full gap-0">
    <navbar />
    <div
      class="w-full bg-white relative left-[310px] p-10 rounded-tl-3xl rounded-bl-3xl"
      style="width: calc(100% - 310px)"
    >
      <div class="no-scrollbar w-full max-w-7xl mx-auto h-full overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
