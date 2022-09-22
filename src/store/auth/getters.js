export default {
  isAuthenticated(state) {
    return state.accessToken &&
      (state.expiresAt
        ? new Date(state.expiresAt).toLocaleString() >
          new Date().toLocaleString()
        : true)
      ? true
      : false;
  },
  accessType(state) {
    return state.accessType;
  },
  accessToken(state) {
    return state.accessToken;
  },
  refreshToken(state) {
    return state.refreshToken;
  },
  expiresAt(state) {
    return state.expiresAt;
  },
  user(state) {
    return state.user;
  },
};
