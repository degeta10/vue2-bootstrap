<template>
  <b-row class="my-5">
    <b-col md="6" class="mx-auto">
      <b-form @submit.prevent="handleSubmit">
        <b-card title="Singup">
          <b-card-body>
            <b-form-group :invalid-feedback="invalidName" :state="nameState">
              <b-form-input
                v-model="form.name"
                placeholder="Name"
                trim
              ></b-form-input>
              <b-list-group class="list-unstyled" :flush="true">
                <b-list-group-item
                  class="text-danger p-0 border-0"
                  v-for="error in errors.name"
                  :key="error"
                >
                  <small>{{ error }}</small>
                </b-list-group-item>
              </b-list-group>
            </b-form-group>

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

            <b-form-group
              :invalid-feedback="invalidConfirmationPassword"
              :state="confirmationPasswordState"
            >
              <b-form-input
                type="password"
                v-model="form.password_confirmation"
                placeholder="Confirm Password"
                trim
              ></b-form-input>
              <b-list-group class="list-unstyled" :flush="true">
                <b-list-group-item
                  class="text-danger p-0 border-0"
                  v-for="error in errors.password_confirmation"
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
                <span v-else>Signup</span>
              </b-button>
            </b-form-group>
          </b-card-body>
        </b-card>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
export default {
  name: "Signup",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: {},
      submitted: false,
      loading: false,
    };
  },
  validations: {
    form: {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(8) },
      password_confirmation: { required, sameAsPassword: sameAs("password") },
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
      this.signUp();
    },
    scrollToError() {
      let dom = document.querySelector(".is-invalid");
      let top = dom.offsetTop;
      window.scrollTo(0, top);
    },
    signUp() {
      this.loading = true;
      this.$axios
        .post("auth/signup", this.form)
        .then((response) => {
          this.loading = false;
          this.submitted = true;
          this.$noty.success(response.data.message);
          this.$router.push("login");
        })
        .catch(({ response }) => {
          this.loading = false;
          this.submitted = true;
          this.errors = response.data;
        });
    },
  },
  computed: {
    nameState() {
      let state = true;
      if (this.errors.name || this.$v.form.name.$error) {
        state = false;
      }
      return state && this.submitted;
    },
    invalidName() {
      let message = "";
      if (!this.$v.form.name.required) {
        message = "Name is required!";
      }
      return message;
    },
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
      if (!this.$v.form.password.minLength) {
        message = "Password min length is 8!";
      } else if (!this.$v.form.password.required) {
        message = "Password is required!";
      }
      return message;
    },
    confirmationPasswordState() {
      let state = true;
      if (
        this.errors.password_confirmation ||
        this.$v.form.password_confirmation.$error
      ) {
        state = false;
      }
      return state && this.submitted;
    },
    invalidConfirmationPassword() {
      let message = "";
      if (!this.$v.form.password_confirmation.required) {
        message = "Confirmation password is required!";
      } else if (!this.$v.form.password_confirmation.sameAsPassword) {
        message = "Confirmation password doesn't match!";
      }
      return message;
    },
  },
};
</script>