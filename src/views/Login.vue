<template>
  <b-row class="my-5">
    <b-col md="6" class="mx-auto">
      <b-form @submit.prevent="handleSubmit">
        <b-card title="Login">
          <b-card-body>
            <b-form-group :invalid-feedback="invalidEmail" :state="emailState">
              <b-form-input
                v-model="form.email"
                placeholder="Email"
                trim
              ></b-form-input>
              <b-list-group class="list-unstyled" :flush="true">
                <b-list-group-item
                  class="text-danger p-0 border-0"
                  v-for="error in errors.email"
                  :key="error"
                >
                  <small>{{ error }}</small>
                </b-list-group-item>
              </b-list-group>
            </b-form-group>
            <b-form-group
              :invalid-feedback="invalidPassword"
              :state="passwordState"
            >
              <b-form-input
                type="password"
                v-model="form.password"
                placeholder="Password"
                trim
              ></b-form-input>
              <b-list-group class="list-unstyled" :flush="true">
                <b-list-group-item
                  class="text-danger p-0 border-0"
                  v-for="error in errors.password"
                  :key="error"
                >
                  <small>{{ error }}</small>
                </b-list-group-item>
              </b-list-group>
            </b-form-group>
            <b-form-group class="form-group text-center">
              <b-button
                type="submit"
                :disabled="loading"
                class="primary-el w-100"
              >
                <b-spinner variant="light" small v-if="loading"></b-spinner>
                <span v-else>Login</span>
              </b-button>
            </b-form-group>
          </b-card-body>
        </b-card>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: {},
      submitted: false,
      loading: false,
    };
  },
  validations: {
    form: {
      email: { required, email },
      password: { required },
    },
  },
  methods: {
    handleSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$nextTick(() => {
          this.scrollToError();
        });
        return;
      }
      this.login();
    },
    scrollToError() {
      let dom = document.querySelector(".is-invalid");
      let top = dom.offsetTop;
      window.scrollTo(0, top);
    },
    login() {
      this.loading = true;
      this.$axios
        .post("auth/login", this.form)
        .then((response) => {
          this.loading = false;
          this.submitted = true;
          const { data } = response.data;
          this.$store.dispatch("auth/saveAuthToken", data).then((store) => {
            this.$router.push({ name: "home" });
            this.$noty.success("Welcome back!");
          });
        })
        .catch(({ response }) => {
          this.loading = false;
          this.submitted = true;
          this.errors = response.data.errors;
        });
    },
  },
  computed: {
    emailState() {
      let state = true;
      if (this.errors.email || this.$v.form.email.$error) {
        state = false;
      }
      return state && this.submitted;
    },
    invalidEmail() {
      let message = "";
      if (!this.$v.form.email.email) {
        message = "Please enter a valid email!";
      } else if (!this.$v.form.email.required) {
        message = "Email is required!";
      }
      return message;
    },
    passwordState() {
      let state = true;
      if (this.errors.password || this.$v.form.password.$error) {
        state = false;
      }
      return state && this.submitted;
    },
    invalidPassword() {
      let message = "";
      if (!this.$v.form.password.required) {
        message = "Password is required!";
      }
      return message;
    },
  },
};
</script>