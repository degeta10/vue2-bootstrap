<template>
  <b-row class="my-5">
    <b-col md="6" class="mx-auto">
      <b-form @submit.prevent="handleSubmit">
        <b-card title="Profile">
          <b-card-body>
            <b-form-group
              :invalid-feedback="invalidName"
              :state="validateState('name')"
            >
              <b-form-input
                v-model="form.name"
                placeholder="Name"
                trim
                ref="name"
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

            <b-form-group :disabled="true">
              <b-form-input v-model="email"></b-form-input>
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

            <b-form-group
              :invalid-feedback="invalidConfirmationPassword"
              :state="validateState('password_confirmation')"
            >
              <b-form-input
                type="password"
                v-model="form.password_confirmation"
                placeholder="Confirm Password"
                trim
                ref="password_confirmation"
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
                <span v-else>Update</span>
              </b-button>
            </b-form-group>
          </b-card-body>
        </b-card>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import {
  required,
  requiredIf,
  minLength,
  sameAs,
} from "vuelidate/lib/validators";
export default {
  name: "Profile",
  data() {
    return {
      email: "",
      form: {
        name: "",
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
      password: { minLength: minLength(8) },
      password_confirmation: {
        required: requiredIf(function (form) {
          return form.password !== "";
        }),
        sameAsPassword: sameAs("password"),
      },
    },
  },
  mounted() {
    this.getUserDetails();
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
        this.updateProfile();
      } else {
        this.focusOnError();
      }
    },
    getUserDetails() {
      this.$axios.get("auth/profile").then((response) => {
        const { data } = response.data;
        this.form.name = data.name;
        this.email = data.email;
      });
    },
    updateProfile() {
      this.loading = true;
      this.$axios
        .patch("auth/profile", this.form)
        .then((response) => {
          this.loading = false;
          this.submitted = true;
          this.form.password = this.form.password_confirmation = "";
          this.$store
            .dispatch("auth/updateUser", {
              name: this.form.name,
              email: this.email,
            })
            .then((store) => {
              this.$noty.success(response.data.message);
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
    invalidName() {
      let message = "";
      if (!this.$v.form.name.required) {
        message = "Name is required!";
      }
      return message;
    },
    invalidPassword() {
      let message = "";
      if (!this.$v.form.password.minLength) {
        message = "Password min length is 8!";
      }
      return message;
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