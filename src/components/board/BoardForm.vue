<template>
    <div class="form-container">
      <h2>{{ isEdit ? '✏️ 글 수정' : '📝 글 작성' }}</h2>
      <form @submit.prevent="saveArticle">
        <div class="form-group">
          <label for="title">제목</label>
          <input id="title" v-model="article.title" type="text" required />
        </div>
  
        <div class="form-group">
          <label for="writer">작성자</label>
          <input id="writer" v-model="article.writer" type="text" required />
        </div>
  
        <div class="form-group">
          <label for="content">내용</label>
          <textarea id="content" v-model="article.content" required></textarea>
        </div>
  
        <button type="submit" class="btn btn-primary">
          {{ isEdit ? '수정 완료' : '작성 완료' }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { articles, addArticle, updateArticle, reorderArticles } from '@/stores/articles.js'; // 전역 상태 임포트
  
  const route = useRoute();
  const router = useRouter();
  
  const isEdit = ref(!!route.params.id);
  
  const article = ref(
    isEdit.value
      ? { ...articles.find(a => a.id === Number(route.params.id)) }
      : { id: null, title: '', writer: '', content: '', date: '' }
  );
  
  const saveArticle = () => {
    if (isEdit.value) {
      updateArticle(article.value);
    } else {
      article.value.date = new Date().toISOString().split('T')[0];
      addArticle({ ...article.value });
      reorderArticles(); // 저장 후 글번호 재정렬
    }
    router.push({ name: 'article-list' });
  };
  </script>
  
  <style scoped>
  .form-container {
    padding: 2rem;
    max-width: 600px;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  input,
  textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  textarea {
    resize: none;
    height: 150px;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 0.8rem;
    border: none;
    border-radius: 5px;
    background: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
  }
  
  button:hover {
    background: #0056b3;
  }
  </style>
  