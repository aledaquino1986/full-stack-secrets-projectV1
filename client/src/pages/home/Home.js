import { useEffect, useReducer } from "react";
import { postReducer, initialState } from "../../reducers/fetchReducer";
import "./home.css";
import Loader from "../../components/loader/";
import { useHistory } from "react-router-dom";

const Home = () => {
  const [state, dispatch] = useReducer(postReducer, initialState);
  let history = useHistory();

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
              const { title, secretText, userName, id } = posts;
              return (
                <div
                  key={id}
                  className="secret-container"
                  onClick={() => history.push(`/post/${id}`)}
                >
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
              );
            })}
          </section>
        </>
      )}
    </>
  );
};

export default Home;
