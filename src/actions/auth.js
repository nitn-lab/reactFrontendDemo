import { AUTH } from '../constants/actionTypes';
import * as api from "../api";


export const signin = (formData, history) => async (dispatch) => {
  console.log("formdata", formData);
    try {
      const { data } = await api.signIn(formData);
      localStorage.setItem("userDetails",JSON.stringify(data))
  
      dispatch({ type: AUTH, data });
  
      history('/posts');
    } catch (error) {
      console.log(error);
    }
  };
  
  export const signup = (formData, history) => async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);
  
      dispatch({ type: AUTH, data });
  
      history('/posts');
    } catch (error) {
      console.log(error);
    }
  };