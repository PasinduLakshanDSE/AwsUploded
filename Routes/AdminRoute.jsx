const express = require("express");
const User = require("../Module/AdminModule.jsx"); // Ensure the path is correct
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { firstName, lastName, designation, contact, username, selectedOption, password, companyName,department } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !designation || !contact || !username || !password || !companyName || !selectedOption ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const newUser = new User({
      firstName,
      lastName,
      designation,
      contact,
      username,
      selectedOption,
      password,
      companyName,
      department,
    });

    const savedUser = await newUser.save();
    res.status(201).json({ message: "User created successfully!", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error. Unable to save user." });
  }
});


router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(400).json({ message: "Login failed. Invalid email or password." });
    }

    if (user.isBlocked) {
      return res.status(403).json({ message: "Your account is blocked. Please contact the administrator." });
    }

    const temp = {
      name: user.username,
      
      selectedOption: user.selectedOption,
      _id: user._id,
    };

    res.json(temp); // Return user data with the selected option
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: error.message || "Server error" });
  }
});



router.post("/request", async (req, res) => {
  const { username } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User Correct" });

  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ error: "Failed to find user." });
  }
});


router.post("/otp", async (req, res) => {
  const { username, otp } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.otp = otp;
    user.expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry
    await user.save();

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error saving OTP:", error);
    res.status(500).json({ error: "Failed to save OTP." });
  }
});


// Verify OTP
router.post("/verify", async (req, res) => {
  const { username, otp } = req.body;

  try {
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      if (user.otp !== otp || new Date() > user.expiresAt) {
          return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      res.status(200).json({ message: "OTP verified" });
  } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ error: "OTP verification failed." });
  }
});


router.post("/reset-password", async (req, res) => {
  const { username, newPassword } = req.body;

  try {
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      user.password = newPassword;

      // Clear OTP and expiry fields (no need to validate these fields for password reset)
      user.otp = null;
      user.expiresAt = null;

      await user.save();  // Save the updated user

      res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ error: "Password reset failed." });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user." });
  }
});


router.get("/getallUsers", async (req, res) => {
  try {
      const users = await User.find();
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});





router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id); // MongoDB example
    res.status(200).send({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting User:", error);
    res.status(500).send({ error: "Failed to delete User." });
  }
});


router.put("/block/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User blocked successfully", user });
  } catch (error) {
    console.error("Error blocking user:", error);
    res.status(500).json({ error: "Failed to block user." });
  }
});

router.put("/unblock/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ message: "User unblocked successfully", user });
  } catch (error) {
    console.error("Error unblocking user:", error);
    res.status(500).json({ error: "Failed to unblock user." });
  }
});



router.get("/getCompanyUserDetails", async (req, res) => {
  try {
      const { companyName } = req.query; // Get company name from request query
      let assets;

      if (companyName) {
          assets = await User.find({ company: companyName }); // Filter by company
      } else {
          assets = await User.find(); // Fetch all if no filter
      }

      res.json(assets);
  } catch (error) {
      res.status(500).json({ error: "Failed to fetch asset details" });
  }
});















module.exports = router;
