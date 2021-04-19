<template>
  <div class="container">
    <form class="form-signin" method="POST" @submit.prevent="signin">
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
import gql from 'graphql-tag'
import { onLogin } from '../vue-apollo.js'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    signin() {
      this.$apollo
        .mutate({
          // Query
          mutation: gql`
            mutation($data: AUTH_PROVIDER_CREDENTIALS!) {
              signIn(credentials: $data) {
                token
              }
            }
          `,
          // Parameters
          variables: {
            data: {
              email: this.email,
              password: this.password,
            },
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
