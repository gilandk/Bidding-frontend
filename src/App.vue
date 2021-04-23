<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Products | </router-link>
      <router-link to="/about">About | </router-link>
      <router-link v-if="signedInAdmin()" to="/users">Users | </router-link>
      <router-link to="/user">User | </router-link>
      <router-link v-if="!signedIn()" to="/signup">Sign-up | </router-link>
      <router-link v-if="!signedIn()" to="/signin">Sign-in | </router-link>
      <a href="#" v-if="signedIn()" @click.prevent="logout"> Sign-out</a>
    </div>
    <router-view />
  </div>
</template>

<script>
import { onLogout } from './vue-apollo.js'

export default {
  methods: {
    logout() {
      delete localStorage.admin
      delete localStorage.fullName
      delete localStorage.id
      delete localStorage.signedIn
      onLogout(this.$apollo.provider.defaultClient)
      this.$router.go('/')
    },
    signedIn() {
      return localStorage.signedIn
    },
    signedInAdmin() {
      return localStorage.admin == 'true'
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
