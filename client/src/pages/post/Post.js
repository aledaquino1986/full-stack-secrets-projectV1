import React, { useEffect, useState } from "react";
import "./post.css";
import { useParams } from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [commentErrors, setCommentErrors] = useState("");
  const [newComment, setNewComment] = useState("");

  let { id } = useParams();

  const fetchPost = async url => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPost(data);
    } catch (error) {
      setError("Couldn't fetch data");
      console.log(error);
    }
  };

  const fetchComments = async url => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      setCommentErrors(error);
    }
  };

  useEffect(() => {
    fetchPost(`/posts/${id}`);
    fetchComments(`/comments/${id}`);
  }, []);

  const submitComment = () => {
    fetch("/comments", {
      method: "POST",
      body: JSON.stringify({
        commentBody: newComment,
        PostId: id
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        setComments([
          ...comments,
          { postId: id, commentBody: newComment, id: comments.length + 1 }
        ]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const { title, secretText, userName } = post;

  return error !== "" ? (
    <h1>{error}</h1>
  ) : (
    <>
      <section className="secrets-page-section">
        <div className="secret-container">
          <header className="secret-container__header">
            <h2>{title}</h2>
          </header>

          <div className="secret-text">
            <p>{secretText}</p>
          </div>

          <footer className="author-footer">
            <p>Author: {userName}</p>
          </footer>
        </div>
      </section>

      <section className="comments-section">
        <div className="add-comment">
          <label htmlFor="add-comment"></label>
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            name="add-comment"
            id="add-comment"
            cols="30"
            rows="10"
          ></textarea>
          <button onClick={submitComment}>Submit comment</button>
        </div>

        {comments.length === 0 ? (
          <h2>No comments yet</h2>
        ) : (
          <>
            {comments.map(comment => {
              return (
                <div key={comment.id}>
                  <p>{comment.commentBody}</p>
                </div>
              );
            })}
          </>
        )}
      </section>
    </>
  );
};

export default Post;
