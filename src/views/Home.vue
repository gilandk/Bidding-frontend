<template>
  <div class="container mb-5">
    <div class="row ml-2 mb-2">
      <div class="mt-2 mb-2s float-left">
        <router-link
          v-if="signedInAdmin()"
          class="btn btn-success"
          :to="{ name: 'product-add' }"
          >Add Product</router-link
        >
      </div>
    </div>
    <ProductCard
      class="card mb-2"
      v-for="product in allProducts"
      :key="product.id"
      :product="product"
    ></ProductCard>
  </div>
</template>

<script>
import ProductCard from '@/components/ProductCard.vue'
import { PRODUCTS_QUERY } from '../graphql.js'

export default {
  name: 'Home',
  components: {
    ProductCard,
  },
  data() {
    return {
      // 3
      allProducts: [],
    }
  },
  methods: {
    setError(error, text) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text
    },
    signedInAdmin() {
      return localStorage.admin == 'true'
    },
  },
  apollo: {
    allProducts: {
      query: PRODUCTS_QUERY,
    },
  },
}
</script>
