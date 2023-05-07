const {Article} = require("../models/article")

const getAllArticle = async (req, res, next) => {
    try {
      const articles = await Article.find({})
      if (articles.length > 0) {
        res.status(200).json(articles);
      } else {
        res.status(404).send({ message: "No article in database" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  const addArticle = async (req, res, next) => {
    try {
      await Article.create(req.body);
      res.status(200).send({
        status: "ok",
        message: "Article is create.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };
  
  const getArticleByID = async (req, res, next) => {
    try {
      const article = await Article.findById(req.params.id);
      if (article) {
        res.status(200).send(article);
      } else {
        res.status(404).send({ message: "Article not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };
  
  const updateArticle = async (req, res, next) => {
    try {
        const article = await Article.findByIdAndUpdate(req.params.id, {
          $set: {
            title: req.body.title,
            content: req.body.content,
          },
        });
        if (article) {
          res.status(200).send({
            status: "ok",
            message: "Article " + article.title + " is updated",
          });
        } else {
          res.status(404).send({ message: "Article not found" });
        }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };
  
  const deleteArticle = async (req, res, next) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (article) {
          res.status(200).send({
            status: "ok",
            message: "Article " + article.title + " is deleted",
          });
        } else {
          res.status(404).send({ message: "Article not found" });
        }
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  };

  const userArticle = async (req, res) => {
    try {
      const articles = await Article.find({ user_name: req.params.id });
      if (articles.length > 0) {
        res.status(200).send(articles);
      } else {
        res.status(404).send({ message: "Article not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Internal server error" });
    }
  };
  
  module.exports = {
    getAllArticle,
    addArticle,
    deleteArticle,
    updateArticle,
    getArticleByID,
    userArticle
  };