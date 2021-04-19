<template>
  <div class="container">
    <form class="form-signup" @submit.prevent="signup">
      <b-card title="Online Bidding System" sub-title="Sign-up">
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="Full Name:"
          label-for="input-horizontal"
        >
          <b-form-input
            v-model="fullName"
            placeholder="Enter your Full name"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="Email:"
          label-for="input-horizontal"
        >
          <b-form-input
            v-model="email"
            placeholder="email@email.com"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="Password"
          label-for="input-horizontal"
        >
          <b-form-input
            v-model="password"
            placeholder="Password"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="fieldset-horizontal" label-for="input-horizontal">
          <b-button type="submit" name="signin" variant="primary"
            >Sign-up</b-button
          >
        </b-form-group>
        <router-link to="/signin">Already have an account?</router-link>
      </b-card>
    </form>
  </div>
</template>

<script>
import { SIGNUP_MUTATION } from '../graphql.js'
import { onLogin } from '../vue-apollo.js'

export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
    }
  },
  methods: {
    signup() {
      this.$apollo
        .mutate({
          // Query
          mutation: SIGNUP_MUTATION,
          // Parameters
          variables: {
            fullName: this.fullName,
            email: this.email,
            password: this.password,
          },
        })
        .then((data) => {
          // Result
          console.log(data)
          onLogin(this.$apollo.provider.defaultClient, data.data.signIn.token)
          this.$router.push('/')
        })
        .catch((error) => {
          // Error
          console.error(error)
          // We restore the initial user input
        })
    },
  },
}
</script>

<style scoped></style>
