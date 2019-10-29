const mongoose = require("mongoose");
const cardSchema = mongoose.Schema({
   body: String,
   author: String,
   state: Boolean,
});
module.exports = mongoose.model("Card",cardSchema);