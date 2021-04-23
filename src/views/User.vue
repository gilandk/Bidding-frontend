<template>
  <div>
    <h2>User Info</h2>
    <div class="container mb-5">
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

              <br />
              <router-link :to="{ name: 'user-pass' }" class="card-link"
                >Update Account</router-link
              >
            </div>
          </div>
        </div>
        <div class="col-md-8 mb-2">
          <div class="card mb-2">
            <table class="table">
              <thead>
                <tr>
                  <th>Products</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody v-for="bid in allUsers" :key="bid.id" :bid="bid">
                <tr
                  v-for="product in bid.bids"
                  :key="product.id"
                  :product="product"
                >
                  <td>{{ product.product.name }}</td>
                  <td>{{ product.bidAmount }}</td>
                  <td v-if="product.status == 1">Winner</td>
                  <td v-else>Lose</td>
                  <td>{{ product.createdAt }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CURRENT_USER_QUERY } from '../graphql.js'

export default {
  name: 'User',
  props: ['id'],
  data() {
    return {
      uid: localStorage.getItem('id'),
      full_name: localStorage.getItem('fullName'),
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
}
</script>

<style scoped></style>
