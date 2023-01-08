export default {
  isAuthenticated(state) {
    return state.accessToken ? true : false;
  },
  accessType(state) {
    return state.accessType;
  },
  accessToken(state) {
    return state.accessToken;
  },
  user(state) {
    return state.user;
  },
};
