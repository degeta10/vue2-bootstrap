<template>
  <header>
    <b-navbar fixed variant="light">
      <b-navbar-brand :to="{ name: 'home' }">
        <img src="@/assets/logo.png" width="30" height="30" alt=""
      /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ name: 'login' }" v-if="!isAuthenticated"
            ><b>Login</b></b-nav-item
          >
          <b-nav-item :to="{ name: 'signup' }" v-if="!isAuthenticated"
            ><b>Signup</b></b-nav-item
          >
          <b-nav-item-dropdown right v-else>
            <template #button-content>
              <b-icon icon="person-circle" scale="1" :title="userName"></b-icon>
              <b class="mx-1">{{ userName }}</b>
            </template>
            <b-dropdown-item :to="{ name: 'profile' }">Profile</b-dropdown-item>
            <b-dropdown-item-button @click="logout"
              >Logout</b-dropdown-item-button
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>
<script>
export default {
  name: "Header",
  computed: {
    isAuthenticated() {
      return this.$store.getters["auth/isAuthenticated"];
    },
    userName() {
      return this.$store.getters["auth/user"].name;
    },
  },
  methods: {
    logout() {
      this.$axios.post("auth/logout").then((response) => {
        this.$store.dispatch("auth/logout").then((store) => {
          this.$router.push({ name: "login" });
        });
      });
    },
  },
};
</script>