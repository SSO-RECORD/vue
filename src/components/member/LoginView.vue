<template>
    <div class="login-wrapper">
      <div class="login-background"></div>
      <div class="login-container">
        <h2>Login</h2>
        <p class="subtitle">로그인해서 멋진 여행 계획을 짜보세요!</p>
  
        <!-- 에러 메시지 표시 -->
        <div v-if="error" class="error-message">{{ error }}</div>
  
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="id" class="label-text">ID</label>
            <input
              type="text"
              class="form-control"
              id="id"
              v-model="id"
              placeholder="Enter your ID"
              required
            />
          </div>
          <div class="form-group">
            <label for="password" class="label-text">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div class="form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="rememberId"
              v-model="rememberId"
            />
            <label class="form-check-label label-text" for="rememberId">기억하기</label>
          </div>
          <button type="submit" class="btn btn-login">Login</button>
        </form>
  
        <p class="signup-link">
          계정이 없으신가요? <router-link to="/join">회원가입</router-link>
        </p>
  
        <div class="social-login">
          <p class="social-login-text">소셜 로그인</p>
          <button class="btn social-btn naver">Naver</button>
          <button class="btn social-btn google">Google</button>
          <button class="btn social-btn kakao">Kakao</button>
        </div>
  
        <div class="footer-links">
          <router-link to="/">홈으로</router-link> |
          <router-link to="/find-id">Forgot ID</router-link> |
          <router-link to="/find-password">Forgot Password</router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'LoginView',
    data() {
      return {
        id: '',
        password: '',
        rememberId: false,
        error: '',
      }
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
            id: this.id,
            password: this.password,
            rememberId: this.rememberId ? 'on' : undefined,
          }, {
            withCredentials: true,
          })
          alert(response.data)
          this.$router.push('/profile')
        } catch (err) {
          this.error = err.response ? err.response.data : '서버와의 연결이 끊어졌습니다.'
        }
      },
    },
  }
  </script>
  
  <style scoped>
  .login-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1; /* 콘텐츠 뒤에 배경이 위치하도록 설정 */
  }
  
  
  
  .login-wrapper {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f4f6f8;
  }
  
  
  
  .login-container {
    background: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
  }
  
  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .subtitle {
    font-size: 1rem;
    color: #444;
    margin-bottom: 1.5rem;
  }
  
  .label-text {
    color: #333;
    font-weight: 500;
  }
  
  .form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .form-control {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.25rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .form-check {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    justify-content: flex-start;
    width: 100%;
  }
  
  .form-check-input {
    margin-right: 0.5rem;
  }
  
  .btn-login {
    background-color: #3b7f68;
    color: #ffffff;
    width: 100%;
    padding: 0.75rem;
    font-weight: bold;
    border: none;
    border-radius: 4px;
  }
  
  .btn-login:hover {
    background-color: #346a57;
  }
  
  .signup-link {
    margin-top: 1rem;
    color: #666;
    font-size: 0.9rem;
  }
  
  .social-login {
    margin-top: 1.5rem;
  }
  
  .social-login-text {
    font-size: 1rem;
    color: #444;
    margin-bottom: 0.5rem;
  }
  
  .social-btn {
    margin: 0.25rem;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-weight: bold;
    color: #fff;
  }
  
  .naver {
    background-color: #03c75a;
  }
  
  .google {
    background-color: #4285f4;
  }
  
  .kakao {
    background-color: #fee500;
    color: #3b1e1e;
  }
  
  .footer-links {
    margin-top: 1.5rem;
    font-size: 0.85rem;
    color: #666;
  }
  
  .footer-links a {
    color: #666;
    text-decoration: none;
  }
  
  .footer-links a:hover {
    text-decoration: underline;
  }
  
  .error-message {
    color: red;
    margin-bottom: 1rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    .login-container {
      padding: 1rem;
      max-width: 90%;
    }
  
    h2 {
      font-size: 1.5rem;
    }
  
    .subtitle {
      font-size: 0.9rem;
    }
  }
  
  </style>