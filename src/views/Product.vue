<template>
  <div class="container mb-5">
    <div class="alert alert-danger" v-if="error">{{ error }}</div>
    <ProductCard
      class="card mb-2"
      v-for="product in allProducts"
      :key="product.id"
      :product="product"
    >
    </ProductCard>

    <div v-if="signedInAdmin()" class="row ml-2 mb-2">
      <div class="mt-2 mb-2s">
        <b-button variant="warning" class="mr-2" v-on:click="stopBidding()"
          ><b-icon icon="arrow-left-circle-fill"></b-icon> Stop
          Bidding</b-button
        >
        <b-button
          variant="info"
          class="mr-2"
          :to="{ name: 'product-update', params: { id: this.pid } }"
          ><b-icon icon="arrow-left-circle-fill"></b-icon> Update
          Product</b-button
        >

        <b-button variant="danger" class="mr-2" v-on:click="deleteProduct()"
          ><b-icon icon="arrow-left-circle-fill"></b-icon> Delete
          Product</b-button
        >
      </div>
    </div>

    <div class="card mb-2 mt-2">
      <div class="card-body">
        <form method="POST" @submit.prevent="addBid">
          <b-form-group
            id="fieldset-horizontal"
            label-cols-sm="4"
            label-cols-lg="3"
            content-cols-sm
            content-cols-lg="7"
            label="Amount:"
            label-for="input-horizontal"
          >
            <b-form-input type="number" v-model.number="amount"></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary"
            ><b-icon icon="arrow-left-circle-fill"></b-icon> Send Bid</b-button
          >
        </form>
      </div>
    </div>

    <div class="card mt-2 mb-2">
      <table class="table">
        <thead>
          <tr>
            <th>Bidders Name</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-for="prod in allProducts" :key="prod.id" :prod="prod">
          <tr v-for="bidder in prod.bids" :key="bidder.id" :bidder="bidder">
            <td>{{ bidder.user.fullName }}</td>
            <td>{{ bidder.bidAmount }}</td>
            <td v-if="bidder.status == true">Winner</td>
            <td v-else>-</td>
            <td>{{ bidder.createdAt }}</td>
            <td>
              <b-link v-on:click="bidWinner(bidder.id)" class="btn btn-primary">
                Select as Winner</b-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'

import {
  ADD_BID_MUTATION,
  PRODUCT_QUERY,
  BID_WINNER_MUTATION,
  DELETE_PRODUCT_MUTATION,
  STOP_BIDDING_MUTATION,
} from '../graphql.js'

export default {
  name: 'Product',
  props: ['id'],
  components: {
    ProductCard,
  },
  data() {
    return {
      uid: localStorage.getItem('id'),
      pid: this.$route.params.id,
      amount: 0,
      error: '',
    }
  },
  apollo: {
    allProducts: {
      query: PRODUCT_QUERY,
      variables() {
        return {
          id: this.pid,
        }
      },
    },
  },
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.data.data && error.data.data.error) || text
    },
    addBid() {
      this.$apollo
        .mutate({
          mutation: ADD_BID_MUTATION,
          variables: {
            bidAmount: this.amount,
            productId: this.pid,
            userId: this.uid,
          },
        })
        .then((data) => {
          console.log(data)
          this.$router.push('/user')
        })
        .catch((error) => {
          console.log(error)
          this.setError(error, 'Cannot Add Bid')
        })
    },
    bidWinner(id) {
      this.$apollo
        .mutate({
          mutation: BID_WINNER_MUTATION,
          variables: {
            bidId: id,
            productId: this.pid,
          },
        })
        .then((data) => {
          console.log(data)
          this.$router.go()
        })
        .catch((error) => {
          console.log(error)
          this.setError(error, 'Error Selecting Bidding Winner')
        })
    },
    stopBidding() {
      this.$apollo
        .mutate({
          mutation: STOP_BIDDING_MUTATION,
          variables: {
            productId: this.pid,
          },
        })
        .then((data) => {
          console.log(data)
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteProduct() {
      this.$apollo
        .mutate({
          mutation: DELETE_PRODUCT_MUTATION,
          variables: {
            productId: this.pid,
          },
        })
        .then((data) => {
          console.log(data)
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          this.setError(error, 'Cannot Delete Product')
        })
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
