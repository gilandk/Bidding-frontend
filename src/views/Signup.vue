<template>
  <div class="container mb-5">
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
            type="password"
            v-model="password"
            placeholder="**********"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="Password Confirmation"
          label-for="input-horizontal"
        >
          <b-form-input
            type="password"
            v-model="password_confirmation"
            placeholder="**********"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="fieldset-horizontal" label-for="input-horizontal">
          <b-button type="submit" variant="primary">Sign-up</b-button>
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
      password_confirmation: '',
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
            passwordConfirmation: this.password_confirmation,
          },
        })
        .then((data) => {
          this.signinSuccess(data)
        })
        .catch((error) => {
          this.signinFailed(error)
        })
    },
    signinSuccess(data) {
      if (!data.data.signIn.token) {
        this.signinFailed(response)
        return
      }
      localStorage.setItem(
        'fullName',
        JSON.stringify(data.data.signIn.user.fullName).slice(1, -1)
      )
      localStorage.setItem(
        'id',
        JSON.stringify(data.data.signIn.user.id).slice(1, -1)
      )
      localStorage.setItem('admin', JSON.stringify(data.data.signIn.user.admin))
      localStorage.signedIn = true
      onLogin(this.$apollo.provider.defaultClient, data.data.signIn.token)

      this.$router.push('/')
    },
    signinFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        ''
      delete localStorage.admin
      delete localStorage.fullName
      delete localStorage.id
      delete localStorage.signedIn
    },
    checkSignedIn() {
      if (localStorage.signedIn) {
        this.$router.push({
          name: 'signin',
        })
      }
    },
  },
}
</script>

<style scoped></style>
