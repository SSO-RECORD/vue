<template>
  <div class="join-wrapper">
    <div class="join-container">
      <h2>회원가입</h2>
      <!-- 회원가입 에러 메시지 -->
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <form @submit.prevent="handleJoin">
        <div class="form-group">
          <label for="id" class="label-text">아이디</label>
          <input
            type="text"
            class="form-control"
            id="id"
            v-model="id"
            placeholder="아이디를 입력하세요"
            required
          />
          <div
            class="validation-message"
            :class="{ 'text-primary': isIdValid, 'text-danger': !isIdValid }"
            v-if="idMessage"
          >
            {{ idMessage }}
          </div>
        </div>

        <div class="form-group">
          <label for="name" class="label-text">이름</label>
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
          <label for="password" class="label-text">비밀번호</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>

        <div class="form-group">
          <label for="pwdcheck" class="label-text">비밀번호 확인</label>
          <input
            type="password"
            class="form-control"
            id="pwdcheck"
            v-model="passwordCheck"
            placeholder="비밀번호 확인"
            required
          />
        </div>

        <div class="form-group">
          <label for="email" class="label-text">이메일</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="email"
            placeholder="이메일을 입력하세요"
            required
          />
          <div
            class="validation-message"
            :class="{
              'text-primary': isEmailValid,
              'text-danger': !isEmailValid,
            }"
            v-if="emailMessage"
          >
            {{ emailMessage }}
          </div>
        </div>

        <button type="submit" class="btn btn-join">Join</button>
      </form>
      <div class="join-footer">
        <router-link to="/login">로그인</router-link> |
        <router-link to="/">홈으로</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/member.css";
import axiosInstance from "@/api/axiosInstance";

export default {
  name: "JoinView",
  data() {
    return {
      id: "",
      name: "",
      password: "",
      passwordCheck: "",
      email: "",
      errorMessage: "",
      idMessage: "",
      emailMessage: "",
      isIdValid: false,
      isEmailValid: false,
    };
  },
  methods: {
    async handleJoin() {
      if (!this.validateForm()) return;

      try {
        await axiosInstance.post("/member/join", {
          id: this.id,
          name: this.name,
          password: this.password,
          email: this.email,
        });
        this.$router.push("/login");
      } catch (error) {
        this.errorMessage = "회원가입 중 오류가 발생했습니다.";
      }
    },
    validateForm() {
      if (this.password !== this.passwordCheck) {
        this.errorMessage = "비밀번호가 일치하지 않습니다.";
        return false;
      }
      this.errorMessage = "";
      return true;
    },
    async checkId() {
      if (this.id.length < 5 || this.id.length > 16) {
        this.idMessage = "아이디는 5자 이상 16자 이하입니다.";
        this.isIdValid = false;
      } else {
        try {
          const { data } = await axiosInstance.get(`/member/${this.id}`);
          this.isIdValid = data === 0;
          this.idMessage = this.isIdValid
            ? "사용할 수 있는 아이디입니다."
            : "이미 사용 중인 아이디입니다.";
        } catch (error) {
          this.idMessage = "아이디 중복 확인 중 오류가 발생했습니다.";
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            this.idMessage = error.response.data.message;
          }
          this.isIdValid = false;
        }
      }
    },
    async checkEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(this.email)) {
        this.emailMessage = "유효한 이메일을 입력하세요.";
        this.isEmailValid = false;
      } else {
        try {
          // 이메일 중복 체크 API 경로를 백엔드에 맞게 수정
          const { data } = await axiosInstance.get(`/member/email-check`, {
            params: { email: this.email },
          });
          this.isEmailValid = data === 0;
          this.emailMessage = this.isEmailValid
            ? "사용할 수 있는 이메일입니다."
            : "이미 사용 중인 이메일입니다.";
        } catch (error) {
          this.emailMessage = "이메일 중복 확인 중 오류가 발생했습니다.";
          this.isEmailValid = false;
        }
      }
    },
  },
  watch: {
    id() {
      this.checkId();
    },
    email() {
      this.checkEmail();
    },
  },
};
</script>
