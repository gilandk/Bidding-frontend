<template>
  <div class="card-body">
    <h5 class="card-title">{{ user.fullName }}</h5>
    <p class="card-text">
      {{ user.email }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    user: Object,
  },
}
</script>
