import * as api from "../api";

//Action Creators

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log("FETCH_ALL", error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  console.log("createPost action", post);
  try {
    const { data } = await api.createPost(post);
    console.log("createPost data", data);

    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log("CREATE", error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log("UPDATE", error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log("DELETE", error);
  }
};
