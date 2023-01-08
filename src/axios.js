import Vue from "vue";
import axios from "axios";
import store from "./store";
import router from "./router";

axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL;
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

axios.interceptors.request.use((request) => {
  if (store.getters["auth/isAuthenticated"]) {
    request.headers[
      "Authorization"
    ] = `${store.getters["auth/accessType"]} ${store.getters["auth/accessToken"]}`;
  }
  return request;
});

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    if (isNetworkError(error)) return Promise.reject(error);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.config.url != "auth/login") {
      if (error.response.status == 401) {
        store.dispatch("auth/logout").then((store) => {
          router.push({ name: "login" });
        });
      }
    }
    return Promise.reject(error);
  }
);

function isNetworkError(err) {
  return !!err.isAxiosError && !err.response;
}

Vue.prototype.$axios = axios;
