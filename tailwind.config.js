// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', // src 폴더 아래 모든 Vue 파일과 JavaScript, TypeScript 파일
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px', // 사용자 정의 브레이크포인트 'xs' 추가
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
