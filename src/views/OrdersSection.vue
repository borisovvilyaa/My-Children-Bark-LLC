<template>
  <div class="booking-column booking-orders-section">
    <div v-if="orders.length > 0">
      <OrderItem v-for="(order, index) in orders" :key="index" :order="order" />
    </div>
    <div v-else>
      <p>No orders found.</p>
    </div>
  </div>
</template>

<script>
import OrderItem from "./OrderCard.vue";

export default {
  components: {
    OrderItem,
  },
  props: {
    orders: {
      type: Array,
      required: true,
    },
  },
};
</script>
