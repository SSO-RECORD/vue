// src/store/articles.js

import { reactive, watch } from 'vue';

const savedArticles = localStorage.getItem('articles');
export const articles = reactive(
  savedArticles ? JSON.parse(savedArticles) : [
    { id: 1, title: '제 여행계획 수정하고 싶어요', writer: '김소연', content: '어떻게 수정하는 건가요 ?', date: '2024-11-16' },
    { id: 2, title: '회원 탈퇴 방법에 대해 질문드립니다.', writer: '곽수현', content: '탈퇴는 내 페이지에서 하면 되나요?', date: '2024-11-16' },
  ]
);

watch(
  articles,
  (newArticles) => {
    localStorage.setItem('articles', JSON.stringify(newArticles));
  },
  { deep: true }
);

export function addArticle(article) {
  articles.push(article);
}

export function updateArticle(updatedArticle) {
  const index = articles.findIndex(a => a.id === updatedArticle.id);
  if (index !== -1) {
    articles[index] = updatedArticle;
  }
}

export function deleteArticle(id) {
  const index = articles.findIndex(a => a.id === id);
  if (index !== -1) {
    articles.splice(index, 1);
  }
}

// 글번호를 1부터 다시 재정렬하는 함수
export function reorderArticles() {
  articles.forEach((article, index) => {
    article.id = index + 1;
  });
}
