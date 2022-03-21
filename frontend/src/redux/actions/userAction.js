import {
  REGISTER_USER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOAD_REQUEST,
  LOAD_SUCCESS,
  LOAD_FAILED,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
} from "../constants/userConstants";
import axios from "axios";

export const registering = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post("/api/v1/register", formData, config);
    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: REGISTER_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const logging = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILED,
      payload: error.response.data.error,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_REQUEST });
    const { data } = await axios.get(`/api/v1/me`);
    dispatch({
      type: LOAD_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({ type: LOAD_FAILED, payload: error.response.data.error });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAILED, payload: error.response.data.error });
  }
};
