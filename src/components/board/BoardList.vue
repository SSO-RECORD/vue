<template>
    <div class="board-list-container">
      <div class="board-header">
        <h2>📋 글 목록</h2>
        <button class="btn btn-primary" @click="moveWrite">글쓰기</button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="article in paginatedArticles"
            :key="article.id"
            @click="goToDetail(article.id)"
            class="table-row"
          >
            <td>{{ article.id }}</td>
            <td>{{ article.title }}</td>
            <td>{{ article.writer }}</td>
            <td>{{ article.date }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button
          v-for="page in totalPage"
          :key="page"
          class="btn pagination-btn"
          :class="{ active: currentPage === page }"
          @click="onPageChange(page)"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { articles } from '@/stores/articles.js'; // 전역 상태 가져오기
  
  const router = useRouter();
  
  // Pagination 설정
  const currentPage = ref(1);
  const itemsPerPage = 5;
  
  const paginatedArticles = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return articles.slice(start, start + itemsPerPage);
  });
  
  const totalPage = computed(() => Math.ceil(articles.length / itemsPerPage));
  
  const onPageChange = (page) => {
    currentPage.value = page;
  };
  
  // 글쓰기 페이지로 이동
  const moveWrite = () => {
    router.push({ name: 'article-write' });
  };
  
  // 상세보기 페이지로 이동
  const goToDetail = (id) => {
    router.push({ name: 'article-detail', params: { id } });
  };
  </script>
  
  <style scoped>
  .board-list-container {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .board-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .table th,
  .table td {
    text-align: left;
    padding: 0.8rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .table-row {
    cursor: pointer;
  }
  
  .table-row:hover {
    background-color: #f1f5f9;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  
  .pagination-btn {
    margin: 0 0.3rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    background: #f8f9fa;
    cursor: pointer;
    border-radius: 5px;
  }
  
  .pagination-btn.active {
    background: #007bff;
    color: white;
    border-color: #007bff;
  }
  </style>
  