<template>
  <div class="container mb-5">
    <form class="form-signup" @submit.prevent="addProduct">
      <div class="alert alert-danger" v-if="error">{{ error }}</div>
      <b-card title="Add Products">
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="Name:"
          label-for="input-horizontal"
        >
          <b-form-input v-model="name" placeholder="Enter Name"></b-form-input>
        </b-form-group>

        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="Description:"
          label-for="input-horizontal"
        >
          <b-form-textarea
            v-model="description"
            placeholder="Enter Description"
          ></b-form-textarea>
        </b-form-group>

        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="Lowest Bid Available"
          label-for="input-horizontal"
        >
          <b-form-input type="number" v-model.number="lowestBid"></b-form-input>
        </b-form-group>

        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="Starting Bid Price"
          label-for="input-horizontal"
        >
          <b-form-input
            type="number"
            v-model.number="startingBid"
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="Bidding Deadline"
          label-for="input-horizontal"
        >
          <b-form-datepicker
            v-model="expireBid"
            locale="en-US"
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group id="fieldset-horizontal" label-for="input-horizontal">
          <b-button type="submit" variant="primary">Add Product</b-button>
        </b-form-group>
      </b-card>
    </form>
  </div>
</template>

<script>
import { ADD_PRODUCT_MUTATION } from '../graphql.js'

export default {
  name: 'Product-Add',
  props: ['id'],
  data() {
    return {
      name: '',
      description: '',
      lowestBid: 0,
      startingBid: 0,
      expireBid: '',
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
    setError(error, text) {
      this.error =
        (error.response && error.data.data && error.data.data.error) || text
    },
    addProduct() {
      this.$apollo
        .mutate({
          // Query
          mutation: ADD_PRODUCT_MUTATION,
          // Parameters
          variables: {
            name: this.name,
            description: this.description,
            lowestBid: this.lowestBid,
            startingBid: this.startingBid,
            expireBid: this.expireBid,
          },
        })
        .then((data) => {
          // Result
          console.log(data)

          this.$router.push('/')
        })
        .catch((error) => {
          // Error
          console.error(error)
          this.setError(error, 'Cannot Add Product')
          // We restore the initial user input
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

<style scoped></style>
