<template>
  <b-row class="my-5">
    <b-col md="6" class="mx-auto">
      <b-form @submit.prevent="handleSubmit">
        <b-card title="Login">
          <b-card-body>
            <b-form-group
              :invalid-feedback="invalidEmail"
              :state="validateState('email')"
            >
              <b-form-input
                v-model="form.email"
                placeholder="Email"
                trim
                ref="email"
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
              :state="validateState('password')"
            >
              <b-form-input
                type="password"
                v-model="form.password"
                placeholder="Password"
                trim
                ref="password"
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
    validateState(name) {
      const { $dirty, $error } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    focusOnError() {
      // 1. Loop the keys
      for (let key in Object.keys(this.$v.form)) {
        // 2. Extract the input
        const input = Object.keys(this.$v.form)[key];
        // // 3. Remove special properties
        if (input.includes("$")) return false;

        // // 4. Check for errors
        if (this.$v.form[input].$error) {
          // 5. Focus the input with the error
          if (this.$refs[input]?.$el) {
            this.$refs[input].$el.focus();
          } else {
            this.$refs[input].focus();
          }

          // 6. Break out of the loop
          break;
        }
      }
    },
    handleSubmit() {
      this.$v.$touch();
      if (!this.$v.form.$anyError) {
        this.login();
      } else {
        this.focusOnError();
      }
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
          if (response.data.errors) {
            this.errors = response.data.errors;
          } else {
            this.$noty.error(response.data.message);
          }
        });
    },
  },
  computed: {
    invalidEmail() {
      let message = "";
      if (!this.$v.form.email.email) {
        message = "Please enter a valid email!";
      } else if (!this.$v.form.email.required) {
        message = "Email is required!";
      }
      return message;
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