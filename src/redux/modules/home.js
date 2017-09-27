import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as WebAPI from 'lib/web-api';

// 액션 타입
const GET_INITIAL_FSCHEDULES= 'fschedules/GET_INITIAL_FSCHEDULES';
const GET_INITIAL_NEWALARMS= 'newalarms/GET_INITIAL_NEWALARMS';

// 액션 생성자
export const getInitialFschedules = createAction(GET_INITIAL_FSCHEDULES, WebAPI.getInitialFschedules);
export const getInitialNewalarms = createAction(GET_INITIAL_NEWALARMS, WebAPI.getInitialNewalarms);

const initialState = Map({
    data_fschedules: List(),
    data_newalarms: Map({
            homecom: null,
            parcel: 0,
            notice: 0,
            visitor: 0,
            guard: null
    })
});

export default handleActions({
    // 초기 가족일정 로딩
    ...pender({
        type: GET_INITIAL_FSCHEDULES,
        onSuccess: (state, action) => state.set('data_fschedules', fromJS(action.payload.data))
    }),
    // 초기 새로운 알림 로딩
    ...pender({
        type: GET_INITIAL_NEWALARMS,
        onSuccess: (state, action) => state.set('data_newalarms', fromJS(action.payload.data))
        
    })
}, initialState);