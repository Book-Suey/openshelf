<template>
  <v-layout>
    <v-flex class="text-center">
      <h2>Current Orders</h2>

      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="orders"      
        item-key="title"
        show-select
        :items-per-page=15
        :single-select=false
        class="elevation-1"
        :footer-props="{
          itemsPerPageOptions: [15,30,50,-1]
        }"
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
  data() {
    return {
      selected: []
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
