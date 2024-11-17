<template>
    <div class="pagination-container">
      <button class="pagination-button" @click="prevPage" :disabled="currentPage === 1">이전</button>
      <span class="pagination-info">Page {{ currentPage }} / {{ totalPages }}</span>
      <button class="pagination-button" @click="nextPage" :disabled="currentPage === totalPages">다음</button>
    </div>
  </template>
  
  <script setup>
  import { computed, defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 8,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  });
  
  const emit = defineEmits(['update:currentPage']);
  
  const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
  
  const prevPage = () => {
    if (props.currentPage > 1) emit('update:currentPage', props.currentPage - 1);
  };
  
  const nextPage = () => {
    if (props.currentPage < totalPages.value) emit('update:currentPage', props.currentPage + 1);
  };
  </script>
  
  <style scoped>
  .pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    padding: 20px 0;
  }
  
  .pagination-button {
    padding: 8px 16px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #019863;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .pagination-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .pagination-button:hover:not(:disabled) {
    background-color: #016a48;
  }
  
  .pagination-info {
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }
  </style>
  