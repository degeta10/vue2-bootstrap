import axios from "axios";
import Vue from "vue";
import router from "../../router";

export default {
  loadAuthToken(state) {
    let data = JSON.parse(localStorage.getItem("auth"));
    let user = JSON.parse(localStorage.getItem("user"));
    if (data !== null) {
      state.accessType = data.token_type;
      state.accessToken = data.access_token;
      state.user = user;
    }
  },
  updateUser(state, payload) {
    localStorage.setItem("user", JSON.stringify(payload));
    state.user = payload;
  },
  saveAuthToken(state, payload) {
    let auth = Object.assign({}, payload);
    delete auth.message;
    delete auth.user;
    localStorage.setItem("auth", JSON.stringify(auth));
    localStorage.setItem("user", JSON.stringify(payload.user));
    state.accessType = payload.token_type;
    state.accessToken = payload.access_token;
    state.user = payload.user;
  },
  logout(state) {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    state.accessType = state.accessToken = state.user = "";
  },
};
