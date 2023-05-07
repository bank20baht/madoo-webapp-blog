const express = require("express");
const router = express.Router();
const { getAllArticle, addArticle, deleteArticle, updateArticle, getArticleByID, userArticle} = require("../controllers/article")

router.get("/", getAllArticle);
router.post("/", addArticle);
router.get("/:id", getArticleByID);
router.put("/edit/:id", updateArticle);
router.delete("/delete/:id", deleteArticle);
router.get("/user/:id", userArticle)
module.exports = router;