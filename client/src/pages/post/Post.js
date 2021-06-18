import React, { useEffect, useState, useContext } from "react";
import "./post.css";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Post = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [commentErrors, setCommentErrors] = useState("");
  const [newComment, setNewComment] = useState("");

  const { authState } = useContext(AuthContext);

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
      headers: {
        "Content-Type": "application/json",
        accessToken: localStorage.getItem("accessToken")
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setComments([
          ...comments,
          {
            postId: id,
            commentBody: newComment,
            id:
              comments.length === 0 ? 1 : comments[comments.length - 1].id + 1,
            username: data.username
          }
        ]);
        setNewComment("");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteComment = id => {
    fetch(`/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        accessToken: localStorage.getItem("accessToken")
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const newComments = comments.filter(comment => comment.id !== id);
        setComments(newComments);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const likeAPost = id => {
    fetch("/likes", {
      method: "POST",
      body: JSON.stringify({
        PostId: id
      }),
      headers: {
        "Content-Type": "application/json",
        accessToken: localStorage.getItem("accessToken")
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
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
            <button onClick={() => likeAPost(post.id)}>Like Post</button>
          </footer>
        </div>
      </section>

      <section className="comments-section">
        <div className="add-comment">
          <label htmlFor="add-comment">Add comment</label>
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
            <h2>Comments</h2>
            {comments.map(comment => {
              return (
                <div
                  key={comment.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <p
                    style={{
                      marginRight: "1rem"
                    }}
                  >
                    {comment.commentBody}
                  </p>{" "}
                  <span
                    style={{
                      fontWeight: "bolder"
                    }}
                  >
                    {" "}
                    {comment.username}
                  </span>
                  {authState.username === comment.username && (
                    <>
                      <button onClick={() => deleteComment(comment.id)}>
                        X
                      </button>
                    </>
                  )}
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
