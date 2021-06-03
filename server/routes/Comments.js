const express = require("express");

const router = express.Router();

const { Comments } = require("../models/");

router.get("/:postId", async (req, res) => {
  console.log("llegué");
  console.log(req.params);
  const commentId = req.params.postId;
  const comments = await Comments.findAll({
    where: {
      PostId: commentId
    }
  });
  console.log(comments);
  res.json(comments);
});

router.post("/", async (req, res) => {
  console.log("llegué");
  console.log(req.body);
  const comment = req.body;
  await Comments.create(comment);
  res.json(comment);
});

module.exports = router;
