<template>
  <div class="container">
    <router-link :to="{ name: 'product-add' }">Add Product</router-link>
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
  apollo: {
    allProducts: {
      query: PRODUCTS_QUERY,
    },
  },
}
</script>
