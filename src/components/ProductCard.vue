<template>
  <router-link
    class="product-link"
    :to="{ name: 'product', params: { id: product.id } }"
  >
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">
        {{ product.description }}
      </p>
      <p class="card-text">
        <strong> Bid Available: </strong> {{ product.lowestBid }} |
        <strong>Starting Available:</strong> {{ product.startingBid }} |
        <strong>Bid Date:</strong>
        {{ product.expireBid }}
      </p>
      <a href="#" class="btn btn-primary"
        ><b-icon icon="arrow-left-circle-fill"></b-icon> Send Bid</a
      >
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    product: Object,
  },
}
</script>

<style scoped>
.product-card {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.produc-card:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.product-card > .title {
  margin: 0;
}
.product-link {
  color: black;
  text-decoration: none;
  font-weight: 100;
}
</style>
