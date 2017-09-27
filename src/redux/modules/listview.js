import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as WebAPI from 'lib/web-api';
import * as KEY from 'lib/raemianAES';

// 액션 타입
const GET_INITIAL_VISITORS= 'listview/GET_INITIAL_VISITORS';
const GET_INITIAL_NOTICES= 'listview/GET_INITIAL_NOTICES';
const GET_INITIAL_CCTV= 'listview/GET_INITIAL_CCTV';
const GET_INITIAL_PARCELS = 'listview/GET_INITIAL_PARCELS';
const GET_INITIAL_COMEHOMES = 'listview/GET_INITIAL_COMEHOMES';
const GET_INITIAL_PLOCS = 'listview/GET_INITIAL_PLOCS';
const GET_INITIAL_FLOCS = 'listview/GET_INITIAL_FLOCS';
const SET_CONTENT = 'listview/SET_CONTENT';
const SET_SELECTED_TYPE = 'listview/SET_SELECTED_TYPE';

const GET_NOTICES_CONTENT = 'listview/GET_NOTICES_CONTENT';
const GET_VISITOR_CONTENT = 'listview/GET_VISITOR_CONTENT';
const GET_CCTV_CONTENT = 'listview/GET_CCTV_CONTENT';

// 액션 생성자
export const getInitialVisitors = createAction(GET_INITIAL_VISITORS, WebAPI.getInitialVisitors);
export const getInitialNotices = createAction(GET_INITIAL_NOTICES, WebAPI.getInitialNotices);
export const getInitialCCTV = createAction(GET_INITIAL_CCTV, WebAPI.getInitialCCTV);
export const getInitialParcels = createAction(GET_INITIAL_PARCELS, WebAPI.getInitialParcels);
export const getInitialComehomes = createAction(GET_INITIAL_COMEHOMES, WebAPI.getInitialComehomes);
export const getInitialPlocs = createAction(GET_INITIAL_PLOCS, WebAPI.getInitialPlocs);
export const getInitialFlocs = createAction(GET_INITIAL_FLOCS, WebAPI.getInitialFlocs);

export const getNoticeContent = createAction(GET_NOTICES_CONTENT,WebAPI.getNoticeContent);
export const getCCTVContent = createAction(GET_CCTV_CONTENT,WebAPI.getCCTVContent);
export const getVisitorContent = createAction(GET_VISITOR_CONTENT,WebAPI.getVisitorContent);

export const setContent = createAction(SET_CONTENT);
export const setSelectedType = createAction(SET_SELECTED_TYPE);

const initialState = Map({
    data_selected_type:'all',
    data_visitors: List([]),
    data_notices: List([]),
    data_content: Map({}),
    data_cctvs: List([]),
    data_parcels: List([]),
    data_comehomes: List([]),
    data_plocs: List([]),
    data_flocs: List([]),
});

export default handleActions({  

    [SET_CONTENT]:(state, action)=>state.set('data_content', action.payload),
    [SET_SELECTED_TYPE]:(state, action)=>state.set('data_selected_type', action.payload),
    ...pender({
        type: GET_INITIAL_VISITORS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            return state.set('data_visitors', fromJS(data.list))
        }
    }),
    ...pender({
        type: GET_INITIAL_NOTICES,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            return state.set('data_notices', fromJS(data.list))
        }
    }),
    ...pender({
        type: GET_INITIAL_CCTV,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            return state.set('data_cctvs', fromJS(data.list))
        }
    }),
    ...pender({
        type: GET_INITIAL_PARCELS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            return state.set('data_parcels', fromJS(data.list))
        }
    }),
    ...pender({
        type: GET_INITIAL_COMEHOMES,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            return state.set('data_comehomes', fromJS(data.list))
        }
    }),
    ...pender({
        type: GET_INITIAL_PLOCS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            return state.set('data_plocs', fromJS(data.list))
        }
    }),
    ...pender({
        type: GET_INITIAL_FLOCS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            return state.set('data_flocs', fromJS(data.list))
        }
    }),
    ...pender({
        type: GET_NOTICES_CONTENT,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
           // console.log('data:',data);
            return state.set('data_content', data)
        }
    }),
    ...pender({
        type: GET_VISITOR_CONTENT,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            console.log('data:',data);
            return state.set('data_content', data)
        }
    }),
    ...pender({
        type: GET_CCTV_CONTENT,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            console.log('data:',data);
            return state.set('data_content',data)
        }
    }),
    

}, initialState);