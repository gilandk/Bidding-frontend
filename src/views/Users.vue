<template>
  <div class="container mb-5">
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <div class="card mt-2 mb-2">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Bids</th>
            <th>Admin</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in allUsers" :key="user.id" :user="user">
            <td>{{ user.fullName }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.bids ? user.bids.length : 0 }}</td>
            <td v-if="user.admin == true">Admin</td>
            <td v-else>User</td>
            <td>{{ user.createdAt }}</td>
            <td>
              <b-link v-on:click="deleteUser(user.id)" class="btn btn-danger">
                Delete</b-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { USERS_QUERY, DELETE_USER_MUTATION } from '../graphql.js'
export default {
  name: 'Users',
  data() {
    return {
      error: '',
    }
  },
  apollo: {
    allUsers: {
      query: USERS_QUERY,
    },
  },
  created() {
    this.checkSignedIn()
  },
  updated() {
    this.checkSignedIn()
  },
  methods: {
    deleteUser(id) {
      this.$apollo
        .mutate({
          mutation: DELETE_USER_MUTATION,
          variables: {
            userId: id,
          },
        })
        .then((data) => {
          console.log(data)
          this.$router.go()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    checkSignedIn() {
      if (localStorage.admin == 'false') {
        this.$router.replace('/')
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
