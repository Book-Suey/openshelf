module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async context => {
        
        const publisher = await context.app.service('publishers').find({
          query: {
            $search: context.data.publisher // This search only works because of the 'feathers-mongodb-fuzzy-search' package in publishers.hooks.js
          }
        });

        console.log(publisher);

        // Update the data to add to the orders db (the publisher info)
        context.data.distributed_by = publisher.data[0].distributed_by;
        context.data.order_from = publisher.data[0].order_from;
        context.data.order_method = publisher.data[0].order_method;

        // Returning will resolve the promise with the `context` object
        return context;
      }
    ],
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
