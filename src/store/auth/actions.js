export default {
  loadAuthToken({ state, commit }) {
    commit("loadAuthToken");
  },
  saveAuthToken({ state, commit }, payload) {
    commit("saveAuthToken", payload);
  },
  updateUser({ state, commit }, payload) {
    commit("updateUser", payload);
  },
  logout({ state, commit }) {
    commit("logout");
  },
};
