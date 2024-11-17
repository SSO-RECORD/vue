import axios from "axios";
import qs from 'qs';

const { VITE_VUE_API_URL } = import.meta.env;

// local vue api axios instance
function localAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    paramsSerializer: params => {
      return qs.stringify(params, {arrayFormat:'repeat'})
    },
  });
  return instance;
}

export { localAxios };