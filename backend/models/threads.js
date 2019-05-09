const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const threadSchema = new Schema({
  threadContent: String,
  threadCreatedDate: String,
  requestId: String,
  threadImage: String
  //senderId: String,
});

module.exports = mongoose.model("Thread", threadSchema);
