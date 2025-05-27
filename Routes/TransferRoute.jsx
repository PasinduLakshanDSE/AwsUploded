const express = require("express");
const router = express.Router();
const PendingTransferAsset = require("../Module/TranferModule.jsx")
const BeforeTransferAsset = require("../Module/BeforeTransferAssetModel.jsx")

router.post("/transfers", async (req, res) => {
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
    assetTransferDate,
    serialNumber,
    trackingId,
    specialNote, 
    computerComponents,} = req.body;

  
  try {
    const newTransferDetails = new PendingTransferAsset({name,
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
        assetTransferDate,
        serialNumber,
        trackingId,
        specialNote,
        computerComponents});
    const savedAssetTransferDetails = await newTransferDetails.save();
    res.status(201).json({ message: "Asset Transfer successfully!", AssetDetails: savedAssetTransferDetails });
  } catch (error) {
    console.error("Error Asset Transfers save:", error);
    res.status(500).json({ error: "Server error. Unable to save Asset Detailsy." });
  }
});



router.post("/beforetransfers", async (req, res) => {
  const { 
    name,
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
    assetTransferDate,
    serialNumber,
    trackingId,
    specialNote, 
    computerComponents,newtrackingId,} = req.body;

  
  try {
    const newBeforeTransferAsset = new BeforeTransferAsset({ name,
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
        assetTransferDate,
        serialNumber,
        trackingId,
        specialNote,
        computerComponents,newtrackingId});
    const savedBeforeTransferAsset = await newBeforeTransferAsset.save();
    res.status(201).json({ message: "Asset Transfer successfully!", BeforeTransferAssetDetails: savedBeforeTransferAsset });
  } catch (error) {
    console.error("Error Asset Transfers save:", error);
    res.status(500).json({ error: "Server error. Unable to save Asset Detailsy." });
  }
});


router.get("/getPendingTransferAssetDetails",async(req,res)=>{
  try{
    const Pendingasset = await PendingTransferAsset.find();
    res.status(200).json(Pendingasset);
  }catch(error){
    console.error("Error fetching asset details:", error);
    res.status(500).json({ error: "Server error. Unable to retrieve assets." });
  }
})




// Route: GET /api/beforeTransfer/getBeforeTransferDetails/:newtrackingId
router.get("/getBeforeTransferDetails/:newtrackingId", async (req, res) => {
  const { newtrackingId } = req.params;

  try {
    const asset = await BeforeTransferAsset.findOne({ newtrackingId });
    if (!asset) {
      return res.status(404).json({ message: "No matching asset found for the provided tracking ID." });
    }
    res.status(200).json(asset);
  } catch (error) {
    console.error("Error fetching before transfer details:", error);
    res.status(500).json({ error: "Server error. Unable to retrieve asset." });
  }
});

// Route: GET /api/beforeTransfer/getBeforeTransferAllDetails/:newtrackingId
router.get("/getBeforeTransferAllDetails/:newtrackingId", async (req, res) => {
  const { newtrackingId } = req.params;

  try {
    const asset = await BeforeTransferAsset.find({ newtrackingId }); // Use `find` if expecting multiple
    if (!asset || asset.length === 0) {
      return res.status(404).json({ message: "No matching assets found for the provided tracking ID." });
    }
    res.status(200).json(asset); // Send array if using find
  } catch (error) {
    console.error("Error fetching before transfer all details:", error);
    res.status(500).json({ error: "Server error. Unable to retrieve assets." });
  }
});













module.exports = router;