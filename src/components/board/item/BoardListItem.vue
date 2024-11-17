<template>
    <div class="item-container">
      <h2>{{ article.title }}</h2>
      <p><strong>작성자:</strong> {{ article.writer }}</p>
      <p class="content"><strong>내용:</strong> {{ article.content }}</p>
      <div class="button-group">
        <button @click="moveEdit" class="btn btn-warning">수정</button>
        <button @click="handleDelete" class="btn btn-danger">삭제</button>
        <button @click="$router.push({ name: 'article-list' })" class="btn btn-secondary">목록</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { articles, deleteArticle, reorderArticles } from '@/stores/articles.js'; // 전역 상태 임포트
  
  const route = useRoute();
  const router = useRouter();
  
  const article = ref(articles.find(a => a.id === Number(route.params.id)));
  
  // 삭제 기능
  const handleDelete = () => {
    deleteArticle(article.value.id);
    reorderArticles(); // 글 삭제 후 재정렬
    router.push({ name: 'article-list' });
  };
  
  // 수정 페이지 이동
  const moveEdit = () => {
    router.push({ name: 'article-edit', params: { id: article.value.id } });
  };
  </script>
  
  <style scoped>
  .item-container {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .content {
    margin-bottom: 1.5rem; /* 작성자와 내용 사이 간격 추가 */
  }
  
  .button-group {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .button-group .btn {
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  .btn-warning {
    background-color: #ffc107;
    color: white;
    border: none;
  }
  
  .btn-warning:hover {
    background-color: #e0a800;
  }
  
  .btn-danger {
    background-color: #dc3545;
    color: white;
    border: none;
  }
  
  .btn-danger:hover {
    background-color: #c82333;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
    border: none;
  }
  
  .btn-secondary:hover {
    background-color: #5a6268;
  }
  </style>
  