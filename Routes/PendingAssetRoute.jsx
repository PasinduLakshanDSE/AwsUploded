// routes/verify.js
const express = require("express");
const router = express.Router();
const AssetRegisterDetails = require("../Module/AssetRegisterModule.jsx");
const PendingAssetRegisterDetails = require("../Module/PendingAssetRegisterDetails.jsx");
const PendingTransferAsset = require("../Module/TranferModule.jsx")

// POST to verify and move asset
router.post("/verifyAsset/:id", async (req, res) => {
  try {
    const asset = await PendingAssetRegisterDetails.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    const verifiedAsset = new AssetRegisterDetails(asset.toObject());
    await verifiedAsset.save();
    await PendingAssetRegisterDetails.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Asset verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/verifyTransferAsset/:id", async (req, res) => {
  try {
    const asset = await PendingTransferAsset.findById(req.params.id);
    if (!asset) return res.status(404).json({ message: "Asset not found" });

    // Convert to plain JS object and set isTransfer to true
    const assetData = asset.toObject();
    assetData.isTransfer = true;

     // Ensure assetTransferDate exists
    if (!assetData.assetTransferDate) {
      assetData.assetTransferDate = new Date().toISOString().split("T")[0];
    }

    const verifiedAsset = new AssetRegisterDetails(assetData);
    await verifiedAsset.save();
    await PendingTransferAsset.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Transfer Asset verified successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





router.post("/", async (req, res) => {
  const { name,
    company,
    department,
    mainCategory,
    type,
    assetName,
    CPUassetName, 
        MoniterassetName, 
        MouseassetName,
        KeyboardassetName,
       CPUassetModel,
        MoniterassetModel,
        MouseassetModel,
        KeyboardassetModel,
        assetModel, 
        assetUserName, 
    assetUpdateDate,
    serialNumber,
    trackingId,
    specialNote, 
    computerComponents,} = req.body;

  
  try {
    const newDetails = new PendingAssetRegisterDetails({name,
        company,
        department,
        mainCategory,
        type,
        assetName,
        CPUassetName, 
        MoniterassetName, 
        MouseassetName,
        KeyboardassetName,
        CPUassetModel, 
        MoniterassetModel, 
       MouseassetModel, 
        KeyboardassetModel, 
        assetModel, 
        assetUserName,
        assetUpdateDate,
        serialNumber,
        trackingId,
        specialNote,
        computerComponents});
    const savedAssetDetails = await newDetails.save();
    res.status(201).json({ message: "Asset Details save successfully!", AssetDetails: savedAssetDetails });
  } catch (error) {
    console.error("Error Asset Details save:", error);
    res.status(500).json({ error: "Server error. Unable to save Asset Detailsy." });
  }
});


router.get("/getPendingAssetDetails",async(req,res)=>{
  try{
    const asset = await PendingAssetRegisterDetails.find();
    res.status(200).json(asset);
  }catch(error){
    console.error("Error fetching asset details:", error);
    res.status(500).json({ error: "Server error. Unable to retrieve assets." });
  }
})



module.exports = router;
