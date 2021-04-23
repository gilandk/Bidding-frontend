<template>
  <div class="container mb-5">
    <form class="form-signin" method="POST" @submit.prevent="signin">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <b-card title="Online Bidding System" sub-title="Sign-in">
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
            name="email"
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
            name="password"
            placeholder="Password"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="fieldset-horizontal" label-for="input-horizontal">
          <b-button type="submit" name="signin" variant="primary"
            >Sign-in</b-button
          >
        </b-form-group>
        <router-link to="/signup">Create your account</router-link>
      </b-card>
    </form>
  </div>
</template>

<script>
import { SIGNIN_MUTATION } from '../graphql.js'
import { onLogin } from '../vue-apollo.js'

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  created() {
    this.checkSignedIn()
  },
  updated() {
    this.checkSignedIn()
  },
  methods: {
    signin() {
      this.$apollo
        .mutate({
          // Query
          mutation: SIGNIN_MUTATION,
          // Parameters
          variables: {
            data: {
              email: this.email,
              password: this.password,
            },
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
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn() {
      if (localStorage.signedIn) {
        this.$router.replace('/')
      }
    },
  },
}
</script>

<style scoped></style>
