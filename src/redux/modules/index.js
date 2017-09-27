import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import home from './home';
import control from './control';
import ui from './ui';
import auth from './auth';
import listview from './listview';
import talk from './talk';

export default combineReducers({
    home,
    control,
    listview,
    auth,
    ui,
    talk,
    pender: penderReducer
});