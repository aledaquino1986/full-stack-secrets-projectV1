import { useContext, useEffect, useReducer } from "react";
import { postReducer, initialState } from "../../reducers/fetchReducer";
import "./home.css";
import Loader from "../../components/loader/";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  let history = useHistory();
  const { authState } = useContext(AuthContext);

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
        console.log(data.liked);

        const newState = state.posts.map(post => {
          if (post.id === id) {
            // console.log(post);
            if (data.liked) {
              console.log("liked");
              const newPost = { ...post, Likes: [...post.Likes, 0] };

              // console.log(newPost);
              return newPost;
            } else {
              console.log("unliked");
              const likeArray = post.Likes;
              likeArray.pop();
              const newPost = { ...post, Likes: [...likeArray] };
              return newPost;
            }
          } else {
            return post;
          }
        });

        console.log(newState);

        dispatch({ type: "FETCH_ALL_POSTS", payload: newState });
      })
      .catch(err => console.log(err));
  };

  const fetchData = async url => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      dispatch({ type: "FETCH_ALL_POSTS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR" });
    }
  };

  useEffect(() => {
    fetchData("/posts");
  }, []);

  return (
    <>
      {state.loading === true ? (
        <Loader loadingText="Loading" />
      ) : (
        <>
          <h1>Your secrets</h1>

          <section className="secrets-page-section">
            {state.posts.map(posts => {
              const { title, secretText, userName, id, Likes } = posts;
              return (
                <div key={id} className="secret-container">
                  <div onClick={() => history.push(`/post/${id}`)}>
                    <header className="secret-container__header">
                      <h2>{title}</h2>
                    </header>

                    <div className="secret-text">
                      <p>{secretText}</p>
                    </div>
                  </div>
                  <footer
                    className="author-footer"
                    style={{
                      padding: "3rem",
                      display: "flex",
                      justifyContent: "space-evenly"
                    }}
                  >
                    <p>Author: {userName}</p>
                    {authState.status && (
                      <button
                        onClick={() => likeAPost(id)}
                        style={{ padding: "1rem" }}
                      >
                        Like
                      </button>
                    )}
                    <p>Likes: {Likes.length}</p>
                  </footer>
                </div>
              );
            })}
          </section>
        </>
      )}
    </>
  );
};

export default Home;
