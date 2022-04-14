import {getApi, postApi} from '../../utils/apiHelpers';
import {
  GET_TRS_GLOBALE_INFO,
  GET_TRS_GLOBALE_INFO_FAILED,
  GET_TRS_GLOBALE_INFO_SUCCESS,
  GET_TRS_INFO,
  GET_TRS_INFO_FAILED,
  GET_TRS_INFO_SUCCESS,
} from '../actionTypes';

const getTrsInfo = () => {
  return {
    type: GET_TRS_INFO,
  };
};

const getTrsInfoSuccess = payload => {
  return {
    type: GET_TRS_INFO_SUCCESS,
    payload: payload,
  };
};

const getTrsInfoError = () => {
  return {
    type: GET_TRS_INFO_FAILED,
  };
};
const getTrsInfoGlobal = () => {
  return {
    type: GET_TRS_GLOBALE_INFO,
  };
};

const getTrsInfoGlobalSuccess = payload => {
  return {
    type: GET_TRS_GLOBALE_INFO_SUCCESS,
    payload: payload,
  };
};

const getTrsInfoGlobalError = () => {
  return {
    type: GET_TRS_GLOBALE_INFO_FAILED,
  };
};
export const getTrsGlobalApi = () => async dispatch => {
  try {
    dispatch(getTrsInfoGlobal());
    let res = await getApi('prod/trs/global');
    if (res) {
      dispatch(getTrsInfoGlobalSuccess(res.trsGlobal));
    }
  } catch (error) {
    dispatch(getTrsInfoGlobalSuccess());
  }
};

export const getTrsInfoApi = type => async dispatch => {
  try {
    dispatch(getTrsInfo());
    let res;
    if (type == 'day') {
      res = await postApi(`prod/trs/${type}`, {selectedDate: '2022-03-14'});
    } else {
      res = await postApi(`prod/trs/${type}`, {
        startDate: '2022-03-14',
        endDate: '2022-03-27',
      });
    }

    if (res) {
      dispatch(getTrsInfoSuccess(res.trs));
    }
  } catch (error) {
    dispatch(getTrsInfoError());
  }
};
