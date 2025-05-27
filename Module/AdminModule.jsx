const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    otp: { type: String, default: null }, // Make it optional
    expiresAt: { type: Date, default: null }, // Make it optional
 
    department: {
      type: String,
      required: function () {
        return this.selectedOption === "DepartmentAdmin";
      }
    },
    
    isBlocked: { type: Boolean, default: false }, // Add this field
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
