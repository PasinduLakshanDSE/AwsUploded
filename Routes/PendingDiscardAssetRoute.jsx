const express = require("express");
const router = express.Router();
const PendingDiscardAsset = require("../Module/PendingDeleteAsset.jsx")




router.get("/getPendingDiscardAsset",async(req,res)=>{
  try{
    const Discardasset = await PendingDiscardAsset.find();
    res.status(200).json(Discardasset);
  }catch(error){
    console.error("Error fetching asset details:", error);
    res.status(500).json({ error: "Server error. Unable to retrieve assets." });
  }
})


router.delete('/discardAsset/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await PendingDiscardAsset.findByIdAndDelete(id); // MongoDB example
    res.status(200).send({ message: "Asset Discarded successfully." });
  } catch (error) {
    console.error("Error discading Asset:", error);
    res.status(500).send({ error: "Failed to Discard Asset." });
  }
});

module.exports = router;