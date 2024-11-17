import { localAxios } from "@/util/http-commons";

const local = localAxios();

//axios 인스턴스를 통해 /trip/sido에 GET요청을 보냄
//요청이 성공하면 then(success)로 success 콜백이 실행되고,
//요청이 실패하면 catch(fail)로 fail 콜백이 실행된다.
function listSido(success, fail) {
  local.get(`/trip/sido`).then(success).catch(fail);
}

function listGugun(param, success, fail) {
    local.get(`/trip/gugun`, { params: param }).then(success).catch(fail);
}
  
// 관광지 검색 API 호출 (다중 유형 선택 가능)
function searchAttractions(sidoCode, gugunCode, contentTypeIds, pgno, success, fail) {
  const params = {
    sidoCode,
    gugunCode,
    contentTypes: contentTypeIds, //.join(','), // 배열을 콤마로 구분된 문자열로 변환
    pgno,
  };
  console.log("searchAttractions params:", params); // 추가된 로그
  local.get(`/trip/search`, { params }).then(success).catch(fail);
}

export { listSido, listGugun, searchAttractions };