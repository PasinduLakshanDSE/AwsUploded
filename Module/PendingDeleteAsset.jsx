// models/DeletedAsset.js
const mongoose = require("mongoose");

const deletedAssetSchema = new mongoose.Schema({
    name: String,
    company: String,
    department: String,
    mainCategory: String,
    type: String,
    assetName: String,
    assetUserName: String,
    assetModel: String,
    assetUpdateDate: String,
    serialNumber: String,
    trackingId: String,
    specialNote: String,
    computerComponents: String,
    deletedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("PendingDeleteAsset", deletedAssetSchema);
