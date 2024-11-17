<!-- src/components/ActivityCard.vue -->
<template>
    <div class="flex flex-col gap-3 pb-3">
      <div
        class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
        :style="{ backgroundImage: 'url(' + imageUrl + ')' }"
      ></div>
      <div>
        <p class="text-[#0e141b] text-base font-medium leading-normal">{{ title }}</p>
        <p class="text-[#4e7397] text-sm font-normal leading-normal">{{ subtitle }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  })
  </script>
  
  <style scoped>
  /* ActivityCard에 특화된 스타일을 추가할 수 있습니다. */
  </style>
  