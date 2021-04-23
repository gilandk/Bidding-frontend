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
    <form class="form-signin" method="POST" @submit.prevent="updateProduct">
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
          <b-button type="submit" variant="primary">Save</b-button>
        </b-form-group>
      </b-card>
    </form>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import { PRODUCT_QUERY, UPDATE_PRODUCT_MUTATION } from '../graphql.js'

export default {
  props: ['id'],
  components: {
    ProductCard,
  },
  data() {
    return {
      pid: this.$route.params.id,
      name: '',
      description: '',
      lowestBid: 0,
      startingBid: 0,
      expireBid: '',
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
          this.$router.push({
            name: 'product',
            params: { id: this.pid },
          })
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
