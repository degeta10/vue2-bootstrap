import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const authData = JSON.parse(localStorage.getItem("auth"));
const userData = JSON.parse(localStorage.getItem("user"));

export default {
  namespaced: true,
  state: {
    accessType: authData?.token_type ? authData.token_type : "",
    accessToken: authData?.access_token ? authData.access_token : "",
    refreshToken: authData?.refresh_token ? authData.refresh_token : "",
    expiresAt: authData?.expires_at ? authData.expires_at : "",
    user: userData ? userData : {},
  },
  mutations,
  getters,
  actions,
};
