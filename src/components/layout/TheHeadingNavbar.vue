<script setup>
import '@/assets/css/TheHeadingNavbar.css'; // CSS 파일 임포트
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <div class="logo">
        EnjoyTrip<span class="highlight">.</span>
      </div>
      <ul class="menu">
        <li><RouterLink :to="{name: 'home'}">Home</RouterLink></li>
        <li><RouterLink :to="{name: 'search'}">서비스</RouterLink></li>
        <li><RouterLink :to="{name: 'login'}">로그인</RouterLink></li>
        <li><RouterLink :to="{name: 'join'}">회원가입</RouterLink></li>
        <li><RouterLink :to="{name: 'board'}">QnA</RouterLink></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
/* scoped 스타일은 필요하지 않으므로 비워 둡니다 */
</style>
