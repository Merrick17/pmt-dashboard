import {combineReducers} from 'redux';

import trsReducer from './trs.reducer';
import rebusReducer from './rebus.reducer';
import modalReducer from './modal.reducer';
import trsGlobalReducer from './trsglobal.reducer';
import absentReducer from './absent.reducer';
import userReducer from './users.reducer';
import QrQcReducer from './qrqc.reducer';
const rootReducer = combineReducers({
  trs: trsReducer,
  rebus: rebusReducer,
  modal: modalReducer,
  trsGlobal: trsGlobalReducer,
  absent: absentReducer,
  users: userReducer,
  qrqc: QrQcReducer,
});

export default rootReducer;
