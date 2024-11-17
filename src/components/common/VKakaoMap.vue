<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { ref } from "vue";

// 좌표를 여기에서 선언
const coordinate = ref({
  lat: 33.450701, // 원하는 기본 위도
  lng: 126.570667, // 원하는 기본 경도
});

const draggable = true;
</script>

<template>
  <div class="map-wrapper">
    <KakaoMap :lat="coordinate.lat" :lng="coordinate.lng" :draggable="draggable" style="width: 500px; height: 600px;">
    <KakaoMapMarker :lat="coordinate.lat" :lng="coordinate.lng"></KakaoMapMarker>
  </KakaoMap>
  </div>
</template>

<style scoped>
.map-wrapper {
  margin-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>