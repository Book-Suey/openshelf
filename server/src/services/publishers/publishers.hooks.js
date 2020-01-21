const search = require('feathers-mongodb-fuzzy-search');

module.exports = {
  before: {
    all: [],
    find: [
      search(), // full text search on text indexes
      search({  // regex search on given fields
        fields: ['name']
      })
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
