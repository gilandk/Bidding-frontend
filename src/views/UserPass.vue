<template>
  <div class="container mb-5">
    <h2>User Info</h2>
    <div class="row mt-3">
      <div class="col-md-4">
        <div class="card">
          <div
            class="card-body"
            v-for="user in allUsers"
            :key="user.id"
            :user="user"
          >
            <h5 class="card-title">{{ user.fullName }}</h5>
            <p class="card-text">
              {{ user.email }}
            </p>
            <p class="card-text">
              <span v-if="user.admin == true">Administrator</span>
              <span v-else>Bidder</span>
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-8 mb-2">
        <div class="card mb-2">
          <form class="form-signup" @submit.prevent="updateInfo">
            <div class="alert alert-danger" v-if="error">{{ error }}</div>
            <b-card title="User Account" sub-title="Update Info">
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
                label-for="input-horizontal"
              >
                <b-button type="submit" variant="primary">Save</b-button>
              </b-form-group>
            </b-card>
          </form>
        </div>

        <div class="card">
          <form class="form-signup" @submit.prevent="changePassword">
            <div class="alert alert-danger" v-if="error">{{ error }}</div>
            <b-card title="User Account" sub-title="Change Password">
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

              <b-form-group
                id="fieldset-horizontal"
                label-for="input-horizontal"
              >
                <b-button type="submit" variant="primary">Save</b-button>
              </b-form-group>
            </b-card>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  CURRENT_USER_QUERY,
  CHANGE_PASSWORD_MUTATION,
  UPDATE_ACCOUNT_MUTATION,
} from '../graphql.js'

export default {
  data() {
    return {
      uid: localStorage.getItem('id'),
      fullName: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
    }
  },
  apollo: {
    allUsers: {
      query: CURRENT_USER_QUERY,
      variables() {
        return {
          id: this.uid,
        }
      },
    },
  },

  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.data.data && error.data.data.error) || text
    },
    updateInfo() {
      this.$apollo
        .mutate({
          // Query
          mutation: UPDATE_ACCOUNT_MUTATION,
          // Parameters
          variables: {
            userId: this.uid,
            fullName: this.fullName,
            email: this.email,
          },
        })
        .then((data) => {
          console.log(data)
          localStorage.setItem(
            'fullName',
            JSON.stringify(data.data.updateUser.fullName).slice(1, -1)
          )
          this.$router.push('/user')
        })
        .catch((error) => {
          console.error(error)
          this.setError(error, 'Cannot Update Account')
        })
    },
    changePassword() {
      this.$apollo
        .mutate({
          // Query
          mutation: CHANGE_PASSWORD_MUTATION,
          // Parameters
          variables: {
            userId: this.uid,
            password: this.password,
            passwordConfirmation: this.password_confirmation,
          },
        })
        .then((data) => {
          console.log(data)
          this.$router.push('/')
        })
        .catch((error) => {
          console.error(error)
          this.setError(error, 'Cannot Change Password')
        })
    },
  },
}
</script>

<style scoped></style>
