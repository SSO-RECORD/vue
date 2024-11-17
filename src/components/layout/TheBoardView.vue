<script setup></script>

<template>
  <div class="board-view-wrapper">
    <div class="board-header">
      <h1>QnA 게시판</h1>
      <p>궁금한 점을 자유롭게 질문하고 답변해보세요!</p>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.board-view-wrapper {
  padding: 2rem;
  background-color: #f8f9fa;
}

.board-header {
  text-align: center;
  margin-bottom: 2rem;
}

.board-header h1 {
  font-size: 2.5rem;
  color: #343a40;
}

.board-header p {
  font-size: 1rem;
  color: #868e96;
}
</style>
