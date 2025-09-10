const express = require("express");
const router = express.Router();
const linkController = require("../controllers/linkController");

// Routes
router.post("/", linkController.createLink);       // Create link
router.get("/", linkController.getAllLinks);       // Get all links
router.get("/:id", linkController.getLinkById);    // Get single link
router.put("/:id", linkController.updateLink);     // Update link
router.delete("/:id", linkController.deleteLink);  // Delete link

module.exports = router;
