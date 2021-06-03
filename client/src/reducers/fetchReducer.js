export const initialState = {
  loading: true,
  posts: [],
  error: ""
};

export const postReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ALL_POSTS":
      return {
        loading: false,
        posts: action.payload,
        error: ""
      };
    case "FETCH_ERROR":
      return {
        loading: false,

        post: {},
        error: "Something went wrong"
      };
    default:
      return state;
  }
};
