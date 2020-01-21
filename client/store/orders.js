import OrderService from '@/services/OrderService.js'
export const state = () => ({
  orders: [],
  headers: [
    { text: 'Title', value: 'title', align: 'left' },
    { text: 'Author', value: 'author', align: 'left' },
    { text: 'Publisher', value: 'publisher', align: 'left' },
    { text: 'Price', value: 'list_price', align: 'left' },
    { text: 'Distributor', value: 'distributed_by', align: 'left' }
  ]
})
export const mutations = {
  SET_ORDERS(state, orders) {
    state.orders = orders
  }
}
export const actions = {
  fetchOrders({ commit }) {
    return OrderService.getOrders().then(response => {
      commit('SET_ORDERS', response.data.data)
    })
  }
}
