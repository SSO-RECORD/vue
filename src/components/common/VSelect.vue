<script setup>
import { ref } from "vue";
defineProps({ selectOption: Array });
const emit = defineEmits(["onKeySelect"]);

const key = ref("");

const onSelect = () => {
  emit("onKeySelect", key.value);
};
</script>

<template>
  <select v-model="key" class="form-select custom-select" @change="onSelect">
    <option
      v-for="option in selectOption"
      :key="option.value"
      :value="option.value"
      :disabled="option.value === '' ? true : false"
    >
      {{ option.text }}
    </option>
  </select>
</template>

<style scoped>
.custom-select {
  font-size: 18px;
  height: 50px;
  border: 1px solid #E9DFCE;
  border-radius: 4px;
  padding: 12px;
  width: 95% !important; /* Force the width */
  max-width: 220px !important;
  background-color: #fff;
  color: #1C160C;
}
</style>
