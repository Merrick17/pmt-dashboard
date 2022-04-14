import {GET_ALL_USERS, GET_ALL_USERS_SUCCESS} from '../actionTypes';

const usersInitState = {
  loading: false,
  userList: [],
};
const userReducer = (state = usersInitState, action) => {
  let {type, payload} = action;
  switch (type) {
    case GET_ALL_USERS:
      return {...state, loading: true};
    case GET_ALL_USERS_SUCCESS:
      return {...state, loading: false, userList: payload};

    default:
      return state;
  }
};

export default userReducer;
