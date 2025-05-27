const express = require("express");
const AssetDetails = require("../Module/AssetRegisterModule.jsx"); // Updated path
const AssetRegisterDetails = require("../Module/AssetRegisterModule.jsx");
const DeletedAssetModel = require("../Module/PendingDeleteAsset.jsx")

const router = express.Router();

{/*router.post("/", async (req, res) => {
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
    const newDetails = new AssetDetails({name,
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
});*/}


router.get("/getAssetDetails",async(req,res)=>{
  try{
    const asset = await AssetRegisterDetails.find();
    res.status(200).json(asset);
  }catch(error){
    console.error("Error fetching asset details:", error);
    res.status(500).json({ error: "Server error. Unable to retrieve assets." });
  }
})

router.get("/getAssetDetails2", async (req, res) => {
  try {
      const { companyName } = req.query; // Get company name from request query
      let assets;

      if (companyName) {
          assets = await AssetRegisterDetails.find({ company: companyName }); // Filter by company
      } else {
          assets = await AssetRegisterDetails.find(); // Fetch all if no filter
      }

      res.json(assets);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch asset details" });
  }
});


// Route to get asset details by tracking ID
router.get("/:trackingId", async (req, res) => {
  try {
    const { trackingId } = req.params; // Get tracking ID from the URL params
    const asset = await AssetRegisterDetails.findOne({ trackingId: trackingId }); // Search for asset by tracking ID

    if (!asset) {
      return res.status(404).json({ message: "Asset not found" });
    }
    
    res.json(asset); // Send the asset details as the response
  } catch (err) {
    console.error("Error fetching asset by tracking ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.put("/updateAsset/:id", async (req, res) => {
  try {
      const updatedAsset = await AssetRegisterDetails.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
      );
      res.json(updatedAsset);
  } catch (error) {
      console.error("Error updating asset:", error);
      res.status(500).json({ error: "Failed to update asset" });
  }
});




router.delete('/deleteAsset/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await AssetRegisterDetails.findByIdAndDelete(id); // MongoDB example
    res.status(200).send({ message: "Asset deleted successfully." });
  } catch (error) {
    console.error("Error deleting Asset:", error);
    res.status(500).send({ error: "Failed to delete Asset." });
  }
});


// Express backend route (example)
router.post("/add", async (req, res) => {
  try {
      const deletedAsset = new DeletedAssetModel(req.body);
      await deletedAsset.save();
      res.status(201).send("Asset archived successfully");
  } catch (err) {
      res.status(500).send("Error archiving asset");
  }
});

// In your delete route (AssetRegisterDetails route)
router.delete("/deleteAsset/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await AssetRegisterDetails.findByIdAndDelete(id); // Ensure this is correct

    if (!asset) {
      return res.status(404).json({ error: "Asset not found." });
    }

    res.status(200).json({ message: "Asset deleted successfully." });
  } catch (error) {
    console.error("Error deleting asset:", error);
    res.status(500).json({ error: "Failed to delete Asset." });
  }
});














module.exports = router;
