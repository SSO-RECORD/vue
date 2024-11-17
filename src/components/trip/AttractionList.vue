<script setup>
import { onMounted, ref, watch, computed } from "vue";
import "@/assets/css/AttractionList.css";
import { listSido, listGugun, searchAttractions } from "@/api/map";
import {
  mdiMapMarker,
  mdiMapSearch,
  mdiCheckboxMarkedCircleOutline,
} from "@mdi/js";
import VSelect from "@/components/common/VSelect.vue";
import VKakaoMap from "@/components/common/VKakaoMap.vue";
import { useKakao } from "vue3-kakao-maps";
import defaultImage from '@/assets/img/noimage.png';

// const serviceKey = import.meta.env.VITE_OPEN_API_SERVICE_KEY;
// const { VITE_OPEN_API_SERVICE_KEY } = import.meta.env;
const kakaoAppKey = import.meta.env.VITE_KAKAO_MAP_SERVICE_KEY;
useKakao(kakaoAppKey);
// const selectedTypes = ref([]);
// const sidoList = ref([]);
// // const sidoList = ref([{ text: "시도를 선택하세요", value: "" }]);
const gugunList = ref([{ text: "구군을 선택하세요.", value: "" }]);

// State Variables
const selectedSido = ref("");
const selectedGugun = ref("");
const selectedTypes = ref([]);
const sidoList = ref([]);
// const gugunList = ref([]);
const attractions = ref([]);

// 로딩 및 에러 상태
const isLoading = ref(false);
const errorMessage = ref("");

const contentTypes = [
  { value: 12, label: "관광지" },
  { value: 14, label: "문화시설" },
  { value: 15, label: "축제공연행사" },
  { value: 25, label: "여행코스" },
  { value: 28, label: "레포츠" },
  { value: 32, label: "숙박" },
  { value: 38, label: "쇼핑" },
  { value: 39, label: "음식점" },
];

onMounted(() => {
  getSidoList();
});

const getSidoList = () => {
  listSido(
    //   (response) => {
    //     console.log("출력확인:" + response)
    //   let options = [];
    //   options.push({ text: "시도선택", value: "" });
    //   response.data.forEach(function (sido) {
    //     options.push({ text: sido.sidoName, value: sido.sidoCode });
    //   });
    //   sidoList.value = options;
    // },
    // function (err) {
    //   console.log(err);
    // }
    //data는 서버에서 받아온 시도 목록을 포함하며, 이 데이터를 forEach를 통해
    //sidoName과 sidoCode로 반복 처리하여 options 배열에 추가한다.
    ({ data }) => {
      let options = [];
      options.push({ text: "시도를 선택하세요.", value: "" });
      data.forEach((sido) => {
        options.push({ text: sido.sidoName, value: sido.sidoCode });
      });
      sidoList.value = options;
    },
    (err) => {
      console.log(err);
      errorMessage.value = "시도 목록을 불러오는 중 오류가 발생했습니다.";
    }
  );
};

const onChangeSido = (val) => {
  selectedSido.value = val; // 선택된 시도 업데이트
  if (val) {
    listGugun(
      { sidoCode: val }, // sido 값을 확인하고 제대로 전달
      ({ data }) => {
        let options = [{ text: "구군을 선택하세요.", value: "" }];
        data.forEach((gugun) => {
          options.push({ text: gugun.gugunName, value: gugun.gugunCode });
        });
        gugunList.value = options;
      },
      (err) => {
        console.error("구군 목록 요청 에러:", err);
        errorMessage.value = "구군 목록을 불러오는 중 오류가 발생했습니다.";
      }
    );
  } else {
    console.error("sido 값이 올바르지 않습니다:", val);
    gugunList.value = [{ text: "구군을 선택하세요.", value: "" }];
  }
};

const coordinate = {
  lat: 33.450701,
  lng: 126.570667,
};

// 시도 선택 변경을 감지하여 구군 목록 업데이트
watch(selectedSido, (newVal) => {
  onChangeSido(newVal);
});

// 임시 검색 함수 (디버깅 용도)
const onSearch = () => {
  console.log("검색 버튼 클릭됨");
  console.log("선택된 시도:", selectedSido.value);
  console.log("선택된 구군:", selectedGugun.value);
  console.log("선택된 유형:", selectedTypes.value);

  // 에러 메시지 초기화
  errorMessage.value = "";

  // 입력값 검증
  if (!selectedSido.value) {
    errorMessage.value = "시도를 선택해주세요.";
    return;
  }
  if (!selectedGugun.value) {
    errorMessage.value = "구군을 선택해주세요.";
    return;
  }
  if (selectedTypes.value.length === 0) {
    errorMessage.value = "유형을 최소 하나 이상 선택해주세요.";
    return;
  }

  isLoading.value = true;
  attractions.value = []; // 기존 관광지 목록 초기화

  // API 요청 파라미터 준비
  const sidoCode = selectedSido.value;
  const gugunCode = selectedGugun.value;
  const contentTypeIds = selectedTypes.value; // 배열 그대로 전달
  const pgno = 1; // 초기 페이지 번호를 1로 설정

  // 관광지 검색 API 호출
  searchAttractions(
    sidoCode,
    gugunCode,
    contentTypeIds,
    pgno,
    ({ data }) => {
      console.log("API 응답 데이터:", data); // 데이터 확인
      console.log("Attractions 데이터:", data.attractions); // 추가 로그
      attractions.value = data.attractions; // 올바른 키로 할당
      navigator.value = data.navigator; // navigator 할당 (필요 시)
      isLoading.value = false;
    },
    (err) => {
      console.error("관광지 목록 요청 에러:", err);
      errorMessage.value = "관광지 목록을 불러오는 중 오류가 발생했습니다.";
      isLoading.value = false;
    }
  );
};

import VPagination from "@/components/common/VPagination.vue";

// const attractions = ref([]); // 실제 관광지 목록 데이터
const currentPage = ref(1); // 현재 페이지
const itemsPerPage = 8; // 한 페이지에 표시할 항목 수

// 페이지네이션된 관광지 데이터
const paginatedAttractions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return attractions.value.slice(start, end);
});
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <!-- 관광지 검색 텍스트 영역 -->
        <div class="search-container">관광지 검색</div>

        <!-- 메인 컨텐츠 레이아웃 -->
        <div class="main-content flex gap-3 px-7 py-5">
          <!-- 왼쪽 사이드바 -->
          <div class="layout-content-container flex flex-col w-80">
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="select-label">시도 선택</p>
                <div class="select-container">
                  <VSelect
                    :selectOption="sidoList"
                    v-model="selectedSido"
                    @onKeySelect="onChangeSido"
                    class="my-custom-select"
                  ></VSelect>
                </div>
              </label>
            </div>

            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="select-label">구군 선택</p>
                <div class="select-container">
                  <VSelect
                    :selectOption="gugunList"
                    v-model="selectedGugun"
                    class="my-custom-select"
                  ></VSelect>
                </div>
              </label>
            </div>
            <div class="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label class="flex flex-col min-w-40 flex-1">
                <p class="select-label">유형 선택</p>
              </label>
            </div>
            <div class="px-4">
              <label
                v-for="type in contentTypes"
                :key="type.value"
                class="checkbox-item"
              >
                <input
                  type="checkbox"
                  :value="type.value"
                  v-model="selectedTypes"
                  class="checkbox"
                />
                <span class="text">{{ type.label }}</span>
              </label>
            </div>
            <div class="flex px-4 py-3 justify-start">
              <button
                @click="onSearch"
                :disabled="isLoading"
                class="search-button flex items-center justify-center h-12 px-5 bg-[#019863] text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em]"
              >
                <span class="truncate">{{
                  isLoading ? "검색중..." : "검색"
                }}</span>
              </button>
            </div>
          </div>

          <div class="right-content flex w-full gap-3">
            <!-- 카카오맵 영역 -->
            <div class="map-container w-1/3" id="kakao-map">
              <VKakaoMap />
            </div>

            <!-- 목록리스트 영역 -->
            <div class="list-container w-2/3 overflow-auto">
              <div
                v-if="!isLoading && paginatedAttractions.length === 0"
                class="text-center py-4"
              >
                검색 결과가 없습니다.
              </div>
              <div
                v-for="attraction in paginatedAttractions"
                :key="attraction.id"
                class="card"
              >
                <img
                  :src="attraction.firstImage1 || defaultImage"
                  alt="대표이미지"
                  class="card-image"
                />
                <div class="card-content">
                  <h3 class="card-title">{{ attraction.title }}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pagination-wrapper">
          <!-- 페이지네이션 컴포넌트 -->
          <VPagination
                :totalItems="attractions.length"
                :itemsPerPage="itemsPerPage"
                v-model:currentPage="currentPage"
              />
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.right-content {
  display: flex;
  width: 100%;
  gap: 100px;
}

table {
  width: 100%;
  border-collapse: collapse; /* 셀 사이의 간격을 없앱니다 */
}

th {
  padding: 12px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  /*border-bottom: 2px solid #ddd; /* 헤더 아래 구분선 추가 */
}

td {
  padding: 10px;
  text-align: center;
  vertical-align: middle;
  font-size: 16px;
  border-bottom: 1px solid #ddd; /* 행 간 구분선 추가 */
}

td img {
  width: 70px; /* 이미지 크기 증가 */
  height: 70px;
  object-fit: cover;
}

/* 페이지네이션 중앙 정렬 */
.pagination-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
