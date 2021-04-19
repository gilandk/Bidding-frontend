<template>
  <div class="container">
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

import { PRODUCT_QUERY } from '../graphql.js'

export default {
  name: 'Product',
  props: ['id'],
  components: {
    ProductCard,
  },
  data() {
    return {
      uid: this.$route.params.id,
    }
  },
  apollo: {
    allProducts: {
      query: PRODUCT_QUERY,
      variables() {
        return {
          id: this.uid,
        }
      },
    },
  },
}
</script>
