<template>
    <div class="find-password-wrapper">
      <div class="find-password-container">
        <h2>Find ID</h2>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <form @submit.prevent="handleFindID">
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
          <button type="submit" class="btn btn-find-password">아이디 찾기</button>
        </form>
        <div class="find-password-footer">
          <router-link to="/">Home</router-link> | <router-link to="/login">Login</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'FindIDView',
    data() {
      return {
        name: '',
        email: '',
        errorMessage: '',
      };
    },
    methods: {
      async handleFindID() {
        try {
          // 쿼리 파라미터로 요청 보내기
          const response = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/member/find-id`,
            null, // 요청 본문 없음
            {
              params: {
                name: this.name,
                email: this.email,
              },
            }
          );
  
          const foundID = response.data;
          this.$router.push({ name: 'foundID', params: { id: foundID } });
        } catch (error) {
          this.errorMessage = '정보가 일치하지 않습니다. 다시 시도하세요.';
        }
      },
    },
  };
  </script>
  
  <style>
  .find-password-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f9f9f9;
  }
  
  .find-password-container {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
  }
  
  .error-message {
    color: red;
    margin-bottom: 1rem;
  }
  
  .btn-find-password {
    background-color: #007bff;
    color: white;
    border: none;
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-find-password:hover {
    background-color: #0056b3;
  }
  
  .find-password-footer {
    margin-top: 1rem;
    text-align: center;
  }
  </style>
  