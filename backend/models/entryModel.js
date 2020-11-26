const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema(
  {
    username: { type: String, required: true },
    title: { type: String },
    text: { type: String },
  },
  { timestamps: true }
);

const EntryModel = mongoose.model("EntryModel", EntrySchema);

module.exports = EntryModel;
