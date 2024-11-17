<template>
    <div class="find-password-wrapper">
      <div class="find-password-container">
        <h2>Find password</h2>
        <!-- 에러 메시지 표시 -->
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <form @submit.prevent="handleFindPassword">
          <div class="form-group">
            <label for="id" class="label-text">ID</label>
            <input
              type="text"
              class="form-control"
              id="id"
              v-model="id"
              placeholder="아이디를 입력하세요"
              required
            />
          </div>
          <div class="form-group">
            <label for="name" class="label-text">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              v-model="name"
              placeholder="이름을 입력하세요"
              required
            />
          </div>
          <div class="form-group">
            <label for="email" class="label-text">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <button type="submit" class="btn btn-find-password">임시 비밀번호 발급</button>
        </form>
        <div class="find-password-footer">
          <router-link to="/">Home</router-link> | <router-link to="/login">Login</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import '@/assets/css/member.css'  // CSS 파일 임포트
  
  export default {
    name: 'FindPasswordView',
    data() {
      return {
        id: '',
        name: '',
        email: '',
        errorMessage: '',
      }
    },
    methods: {
      async handleFindPassword() {
        try {
          const response = await axios.post('/api/member/find-password', {
            id: this.id,
            name: this.name,
            email: this.email,
          })
          alert('임시 비밀번호가 발급되었습니다. 이메일을 확인하세요.')
        } catch (error) {
          this.errorMessage = '정보가 일치하지 않습니다. 다시 시도하세요.'
        }
      },
    },
  }
  </script>
  
  