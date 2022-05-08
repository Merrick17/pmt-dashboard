import {getApi, postApi} from '../../utils/apiHelpers';
import {
  ADD_AUDIT_TASK,
  GET_AUDIT_DETAILS_ACTION,
  GET_AUDIT_LIST,
  GET_AUDIT_LIST_SUCCESS,
  SELECTED_AUDIT_TO_EDIT,
} from '../actionTypes';

const addNewAudit = () => {
  return {
    type: ADD_AUDIT_TASK,
  };
};
const getAuditList = () => {
  return {
    type: GET_AUDIT_LIST,
  };
};
const getAuditListSuccess = data => {
  return {
    type: GET_AUDIT_LIST_SUCCESS,
    payload: data,
  };
};
export const editDetails = data => {
  return {
    type: SELECTED_AUDIT_TO_EDIT,
    payload: data,
  };
};
export const getAuditDetailsApi = id => async dispatch => {
  try {
    let result = await getApi('tasks/details/' + id);
    dispatch({
      type: GET_AUDIT_DETAILS_ACTION,
      payload: result.result,
    });
  } catch (error) {}
};
export const addAuditApi = data => async dispatch => {
  try {
    let result = await postApi('tasks/add', data);
    if (result) {
      dispatch(getAuditListApi());
    }
  } catch (error) {}
};
export const addAuditDetailsApi = data => async dispatch => {
  try {
    console.log('ADD', data);
    let result = await postApi('tasks/details/add', data);
    if (result) {
      dispatch(getAuditDetailsApi(data.id_tache));
    }
  } catch (error) {}
};
export const getAuditListApi = () => async dispatch => {
  try {
    // dispatch(getAuditList());
    let result = await getApi('tasks');
    dispatch(getAuditListSuccess(result.result));
  } catch (error) {
    console.log('err', error);
  }
};
