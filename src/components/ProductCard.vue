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
        <strong>Lowest Bid Available: </strong> {{ product.lowestBid }} |
        <strong>Starting Available:</strong> {{ product.startingBid }} |
        <strong>Bid Date:</strong>
        {{ product.expireBid }} | <strong>Bidders: </strong>
        {{ product.bids ? product.bids.length : 0 }}
      </p>
      <div v-if="product.stopBid > 0">
        Bidding Ended
        <p
          class="card-text"
          v-for="bidder in product.bids"
          :key="bidder.id"
          :bidder="bidder"
        >
          <span v-if="bidder.status == true"> Bidding Winner |</span>
          <span v-else> </span>
          <span v-if="bidder.status == true">
            Name: {{ bidder.user.fullName }} |</span
          >
          <span v-else> </span>
          <span v-if="bidder.status == true">
            Amount: {{ bidder.bidAmount }}</span
          >
          <span v-else> </span>
        </p>
      </div>
      <div v-else>
        Bidding Ongoing
        <p class="card-text">
          <span
            >Name:
            {{ product.bids[0] ? product.bids[0].user.fullName : 'None' }} |
          </span>
          <span
            >Lowest Bid Amount:
            {{ product.bids[0] ? product.bids[0].bidAmount : 'None' }}</span
          >
        </p>
      </div>
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
.product-card:hover {
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
