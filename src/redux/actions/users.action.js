import {getApi} from '../../utils/apiHelpers';
import {GET_ALL_USERS, GET_ALL_USERS_SUCCESS} from '../actionTypes';

export const getAllUsers = () => {
  return {
    type: GET_ALL_USERS,
  };
};

export const getAllUsersSuccess = data => {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: data,
  };
};

export const getAllUsersApi = () => async dispatch => {
  try {
    dispatch(getAllUsers());
    let result = await getApi('user/all');
    dispatch(getAllUsersSuccess(result.users));
  } catch (error) {
    console.log('Error', error.message);
  }
};
