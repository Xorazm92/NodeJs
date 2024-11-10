import { Article } from "../modules/index.js";

export const addArticle = async (req, res, next) => {
  try {
    const { title, artic, category } = req.body;
    const newArticle = await Article.create({
      author_id: req.user._id,
      title,
      content,
      artic,
    });

    res
      .status(201)
      .send({ message: "Article created successfully", newArticle });
  } catch (error) {
    res.status(500).send({ message: "Error creating article", error });
  }
};

export const getArticle = async (req, res, next) => {
  try {
    const articles = await Article.find();
    res.status(200).send(articles);
  } catch (error) {
    res.status(500).send({ message: "Error fetching articles", error });
  }
};

export const updateArticleById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;

    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      {
        title,
        content,
        category,
      },
      { new: true }
    );

    res
      .status(200)
      .send({ message: "Article updated successfully", updatedArticle });
  } catch (error) {
    res.status(500).send({ message: "Error updating article", error });
  }
};

export const deleteArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedArticle = await Article.findByIdAndDelete(id);

    res
      .status(200)
      .send({ message: "Article deleted successfully", deletedArticle });
  } catch (error) {
    res.status(500).send({ message: "Error deleting article", error });
  }
};
