import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3030/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const isbndbApi = axios.create({
  baseURL: 'https://api2.isbndb.com/',
  headers: {
    'Authorization': '43728_ccbd8a21a0ac34090190f5e40bf1c67d'
  }
})

export default {
  getOrders() {
    return apiClient.get('orders')
  },
  postOrder(orderData) {
    return apiClient.post('orders', orderData)
  },
  getBook(isbn) {
    return isbndbApi.get('book/' + isbn)
  }
}
