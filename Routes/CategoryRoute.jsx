const express = require("express");
const Category = require("../Module/AssetCatModule.jsx"); // Updated path

const router = express.Router();

router.post("/", async (req, res) => {
  const { category,  types, customType } = req.body;

  if (!category || !types ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newCat = new Category({ category,  types, customType});
    const savedCategory = await newCat.save();
    res.status(201).json({ message: "Category created successfully!", category: savedCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Server error. Unable to save category." });
  }
});







router.get ("/getCategory", async(req,res)=>{
    
    try {
        const categorys = await Category.find({})
        res.send(categorys)
    } catch (error) {
        return res.status(400).json({message:error})
        
    }
});



module.exports = router;
