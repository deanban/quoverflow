import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { ACCOUNT } from './types';

const setLoadingTrue = TYPE => ({
  type: TYPE,
});

const setLoadingFalse = TYPE => ({
  type: TYPE,
});

export const setCurrentUser = decoded => ({
  type: ACCOUNT.SET_CURRENT_USER,
  payload: decoded,
});

const fetchAccountType = ({
  endpoint,
  data,
  typeLoading,
  typeLoaded,
  typeError,
  typeSuccess,
}) => dispatch => {
  dispatch(setLoadingTrue(typeLoading));

  if (endpoint === 'login') {
    axios
      .post(`api/accounts/${endpoint}`, data)
      .then(resp => {
        const { token } = resp.data;

        localStorage.setItem('jwttoken', token);
        setAuthToken(token);

        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      })
      .catch(err => {
        dispatch({
          type: typeError,
          payload: err.response.data,
        });
      });
  }
};

export const login = userData =>
  fetchAccountType({
    endpoint: 'login',
    data: userData,
    typeLoading: ACCOUNT.LOADING_ACCOUNT,
    typeLoaded: ACCOUNT.ACCOUNT_LOADED,
    typeError: ACCOUNT.ACCOUNT_ERROR,
    typeSuccess: ACCOUNT.LOGIN_SUCCESS,
  });

// log user out
export const logoutUser = () => dispatch => {
  // remove token
  localStorage.removeItem('jwtToken');
  // remove auth header for future request
  setAuthToken(false);
  // set current user to empty object which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
