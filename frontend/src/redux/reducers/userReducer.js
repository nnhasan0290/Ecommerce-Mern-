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
  LOGOUT_FAILED,
  LOGOUT_SUCCESS,
} from "../constants/userConstants";
export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_REQUEST:
    case LOAD_REQUEST:
      return { loading: true, isAuthenticated: false };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case LOAD_SUCCESS:
      return {
        loading: false,
        user: action.payload,
        isAuthenticated: true,
      };
    case REGISTER_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOAD_FAILED:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
