<template>
  <v-container fluid>
    <h1>Search for Books</h1>
    <v-form @submit.prevent="gApiSearch">
      <v-container>
        <v-layout justify-center>
          <v-flex xs12 md8>
            <v-text-field
              v-model="searchString"
              label="Title, Author, or ISBN"
              required
            ></v-text-field>
          </v-flex>
          <v-btn text @click="gApiSearch">
            <span class="mr-2">Search</span>
          </v-btn>
        </v-layout>
      </v-container>
    </v-form>
    <div class="mt-2">Search Value: {{ searchString }}</div>

    <v-layout flex>
      <v-row>
        <v-col>
          <v-card
            v-model="searchResponse"
            v-for="item in searchResponse"
            :key="item.id"
            class="mb-4"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">{{ item.volumeInfo.publisher }}</div>
                <v-spacer></v-spacer>
                <div
                  class="overline mb-4"
                  v-for="ident in item.volumeInfo.industryIdentifiers"
                >
                  <span v-if="ident.type == 'ISBN_13'"
                    >ISBN-13: {{ ident.identifier }}</span
                  >
                  <span v-else-if="ident.type == 'ISBN_10'"
                    >ISBN-10: {{ ident.identifier }}</span
                  >
                  <span v-else>{{ ident.type }} {{ ident.identifier }}</span>
                </div>
                <v-list-item-title
                  class="headline mb-1"
                  style="white-space:normal"
                >
                  {{ item.volumeInfo.title }}
                </v-list-item-title>
                <v-list-item-subtitle
                  v-for="(author, index) in item.volumeInfo.authors"
                  :key="`author-${index}`"
                >
                  {{ author }}
                </v-list-item-subtitle>
                <p v-if="typeof item.searchInfo != 'undefined'">
                  {{ item.searchInfo.textSnippet }}
                </p>
                <p v-else>
                  <em>No summary found.</em>
                </p>

              </v-list-item-content>

              <v-list-item-avatar tile width="80" height="auto" color="grey">
                <v-img
                  v-if="!item.volumeInfo.imageLinks"
                  src="public/ina.png"
                ></v-img>
                <v-img
                  v-else
                  :src="'' + item.volumeInfo.imageLinks.thumbnail"
                  alt
                ></v-img>
              </v-list-item-avatar>
              <!--
              <v-list-item-content>
                <v-card-text v-if="typeof item.isbndb.msrp != 'undefined'">
                  {{ item.isbndb.msrp }}
                </v-card-text>
                <v-card-text v-if="typeof item.isbndb.binding != 'undefined'">
                  {{ item.isbndb.binding }}
                </v-card-text>
              </v-list-item-content>
              -->
            </v-list-item>

            <v-card-actions>
              <v-btn text @click="checkDetails(item)">View Details</v-btn>
              <v-spacer />
              <v-btn text @click="addToOrder(item)"
                >Add to Order&nbsp;<v-icon>mdi-cart-plus</v-icon></v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import OrderService from '@/services/OrderService.js'

export default {
  data() {
    return {
      searchString: null,
      searchResponse: [],
      bookDetails: []
    }
  },
  methods: {
    async gApiSearch() {
      try {
        const response = await axios
          .get(
            'https://www.googleapis.com/books/v1/volumes?q=' +
              this.searchString +
              '&country=US&printType=books&maxResults=25'
          )
        this.searchResponse = response.data.items
        response.data.items.forEach(async volume => {
          let isbndb = "isbndb"
          let isbn13 = null
          volume.volumeInfo.industryIdentifiers.forEach(ids => {
            if(ids.type == 'ISBN_13') {
              isbn13 = ids.identifier
            }
          })
          let book = await OrderService.getBook(isbn13)
          this.$set(volume, isbndb, book.data.book)
        })
      } catch (error) {
          console.log('There was an error:' + error.response)
      }
    },
    checkDetails: async function(item) {
      let isbns = JSON.parse(
        JSON.stringify(item.volumeInfo.industryIdentifiers)
      )
      let isbn13 = null
      for (var j = 0; j < isbns.length; j++) {
        if (isbns[j].type == 'ISBN_13') {
          isbn13 = isbns[j].identifier
        }
        console.log(isbn13)
      }
      let isbndb = "isbndb"
      let book = await OrderService.getBook(isbn13)
      this.$set(item, isbndb, book.data.book)
      console.log(JSON.parse(JSON.stringify(item)))
    },
    addToOrder: function(item) {
      let isbns = JSON.parse(
        JSON.stringify(item.volumeInfo.industryIdentifiers)
      )
      let isbn13 = null
      for (var j = 0; j < isbns.length; j++) {
        if (isbns[j].type == 'ISBN_13') {
          isbn13 = isbns[j].identifier
        }
        console.log(isbn13)
      }
      let author = item.volumeInfo.authors[0]
      let orderData = {
        isbn: isbn13,
        title: item.volumeInfo.title,
        author: author,
        publisher: item.volumeInfo.publisher,
        list_price: null,
        format: '',
        quantity: 1
      }
      return OrderService.postOrder(orderData).then(
        console.log('Submitted an Order!')
      )
      console.log(isbns)
      console.log(author)
      console.log(orderData)
    }
  }
}
</script>
