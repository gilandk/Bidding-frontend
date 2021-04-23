<template>
  <div class="container mb-5">
    <form
      class="form-signup"
      @submit.prevent="updateProduct"
      v-for="product of allProducts"
      :key="product.id"
      :product="product"
    >
      <b-card title="Update Product">
        <b-form-group
          id="fieldset-horizontal"
          label-cols-sm="4"
          label-cols-lg="3"
          content-cols-sm
          content-cols-lg="7"
          label="Name:"
          label-for="input-horizontal"
        >
          <b-form-input
            v-model="product.name"
            placeholder="Enter Name"
          ></b-form-input>
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
            v-model="product.description"
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
          <b-form-input
            type="number"
            v-model.number="product.lowestBid"
          ></b-form-input>
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
            v-model.number="product.startingBid"
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
            v-model="product.expireBid"
            locale="en-US"
          ></b-form-datepicker>
        </b-form-group>

        <b-form-group id="fieldset-horizontal" label-for="input-horizontal">
          <b-button type="submit" variant="primary">Save</b-button>
        </b-form-group>
      </b-card>
    </form>
  </div>
</template>

<script>
import { PRODUCT_QUERY, UPDATE_PRODUCT_MUTATION } from '../graphql.js'

export default {
  name: 'Product-Update',
  props: ['id'],
  data() {
    return {
      pid: this.$route.params.id,
      name: '',
      description: '',
      lowestBid: 0,
      startingBid: 0,
      expireBid: '',
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
    updateProduct() {
      this.$apollo
        .mutate({
          // Query
          mutation: UPDATE_PRODUCT_MUTATION,
          // Parameters
          variables: {
            productId: this.pid,
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
          // We restore the initial user input
        })
    },
  },
}
</script>

<style scoped></style>
