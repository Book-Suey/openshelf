// orders-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const modelName = 'orders';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      isbn: { type: Number, required: true },
      date_ordered: { type: Date },
      title: { type: String, required: true },
      author: { type: String, required: true },
      publisher: { type: String },
      list_price: { type: Number },
      format: { type: String },
      quantity: { type: Number },
      distributed_by: { type: String },
      matched_publisher: { type: String },
      order_from: { type: String },
      order_method: { type: String },
      ordered_by: { type: Object }
    },
    {
      timestamps: true
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
