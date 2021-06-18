const express = require("express");
const { validateToken } = require("../middleware/authMiddleware");

const router = express.Router();

const { Comments } = require("../models/");

router.get("/:postId", async (req, res) => {
  const commentId = req.params.postId;
  const comments = await Comments.findAll({
    where: {
      PostId: commentId
    }
  });

  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
});

router.delete("/:commentId", validateToken, (req, res) => {
  const commentId = req.params.commentId;
  console.log(commentId);
  Comments.destroy({
    where: {
      id: commentId
    }
  });

  res.json("Comment Deleted Successfully");
});

module.exports = router;
