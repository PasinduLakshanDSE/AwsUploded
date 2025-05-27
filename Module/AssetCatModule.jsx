const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    
    types: {
      type: String,
      required: true,
    },
    customType: {
      type: String,
      required: false,
    },
    
  },
  { timestamps: true }
);

const CategoryModel = mongoose.model("Category", userSchema);
module.exports = CategoryModel;
