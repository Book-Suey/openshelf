<template>
  <v-layout>
    <v-flex class="text-center">
      <h2>Current Orders</h2>

      <v-data-table
        :headers="headers"
        :items="orders"
        :items-per-page="5"
        class="elevation-1"
      ></v-data-table>
      
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'

export default {
  head() {
    return {
      title: 'Orders listing'
    }
  },
  // asyncData info:
  // Called each time before the page component is loaded
  // Nuxt will wait until the API call is finished to render the component
  // The object returned will be merged with component data
  async fetch({ store, error }) {
    try {
      await store.dispatch('orders/fetchOrders')
    } catch (e) {
      error({
        statusCode: 503,
        message: 'Unable to fetch orders at this time. Please try again'
      })
    }
  },
  computed: mapState({
    orders: state => state.orders.orders,
    headers: state => state.orders.headers
  })
}
</script>

<style scoped></style>
