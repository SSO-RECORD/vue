<!-- src/components/trip/test.vue -->
<template>
  <div class="relative flex w-full min-h-screen flex-col bg-slate-50 overflow-x-hidden" style="font-family: Inter, 'Noto Sans', sans-serif;">
    <div class="layout-container flex h-full grow flex-col">
      <!-- 메인 콘텐츠 -->
      <div class="px-10 sm:px-4 flex flex-1 justify-center py-5">
        <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
          <div class="container">
            <div class="xs:p-4">
              <div
                class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat xs:gap-8 xs:rounded-xl items-center justify-center p-4"
                style='background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://cdn.usegalileo.ai/stability/7dd2f11d-4236-481d-8aa2-8240c908df63.png");'
              >
                <div class="flex flex-col gap-2 text-center">
                  <h1
                    class="text-white text-4xl font-black leading-tight tracking-[-0.033em] xs:text-5xl xs:font-black xs:leading-tight xs:tracking-[-0.033em]"
                  >
                    Discover new places
                  </h1>
                  <h2 class="text-white text-sm font-normal leading-normal xs:text-base xs:font-normal xs:leading-normal">
                    Find your next destination based on what you're in the mood for. Explore by activity, weather, and more.
                  </h2>
                </div>
                
                <!-- 검색바 -->
                <div class="flex items-center w-full max-w-lg mt-4 bg-white rounded-lg shadow-md overflow-hidden">
                  <div class="flex items-center justify-center px-4 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Where are you headed?"
                    class="w-full px-4 py-4 text-gray-700 focus:outline-none text-base"
                    v-model="searchQuery"
                  />
                  <button 
                    @click="handleSearch"
                    class="px-6 py-4 font-semibold text-white bg-blue-600 hover:bg-blue-700 transition duration-200"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 활동 섹션 -->
          <div class="flex flex-col gap-10 px-4 py-10">
            <div class="flex flex-col gap-4">
              <h1
                class="text-[#0e141b] tracking-light text-2xl font-bold leading-tight sm:text-4xl sm:font-black sm:leading-tight sm:tracking-[-0.033em] max-w-[720px]"
              >
                Explore by activity
              </h1>
              <p class="text-[#0e141b] text-base font-normal leading-normal max-w-[720px]">
                Whether you're a thrill-seeker, a sun worshipper, or a culture vulture, we've got the perfect vacation for you.
              </p>
            </div>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
              <ActivityCard
                title="Outdoor Adventure"
                subtitle="Explore the great outdoors"
                imageUrl="https://cdn.usegalileo.ai/stability/023d6e9c-aea2-457d-a42b-261b488ed5d9.png"
              />
              <ActivityCard
                title="Beach Bliss"
                subtitle="Sun, sand, and relaxation"
                imageUrl="https://cdn.usegalileo.ai/sdxl10/72180939-a593-4e5d-b484-8a79f242155a.png"
              />
              <ActivityCard
                title="City Vibes"
                subtitle="Experience the hustle and bustle"
                imageUrl="https://cdn.usegalileo.ai/sdxl10/f57f7e51-fdd9-4447-9da6-f7e75868c06f.png"
              />
              <ActivityCard
                title="Ski & Snowboard"
                subtitle="Hit the slopes and cozy up"
                imageUrl="https://cdn.usegalileo.ai/stability/32c912b3-d678-48af-88dd-a583d1ce93e6.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ActivityCard from '@/components/trip/item/ActivityCard.vue'

// 검색어를 위한 반응형 변수
const searchQuery = ref('')

// 검색 버튼 클릭 시 실행되는 함수
const handleSearch = () => {
  console.log('Searching for:', searchQuery.value)
}
</script>

<style scoped>
/* 커스텀 클래스 스타일 */
.size-full {
  width: 100%;
}
.size-4 {
  width: 1rem;
  height: 1rem;
}
.size-10 {
  width: 2.5rem;
  height: 2.5rem;
}
</style>
