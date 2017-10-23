import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List, fromJS } from 'immutable';
import moment from 'moment';
import * as WebApi from 'lib/web-api';
import * as KEY from 'lib/raemianAES';

const SET_DATE = 'talk/fschedule/SET_DATE';
const SET_ACTIVE_DATE = 'talk/fschedule/SET_ACTIVE_DATE';
const SET_ADD_YEAR = 'talk/fschedule/add/SET_ADD_YEAR';
const SET_ADD_MONTH = 'talk/fschedule/add/SET_ADD_MONTH';
const SET_ADD_DAY = 'talk/fschedule/add/SET_ADD_DAY';
const CHANGE_INPUT = 'talk/fschedule/CHANGE_INPUT'; // input 값 변경
const CHECKBOX_ADD_REPEAT = 'talk/fschedule/add/CHECKBOX_ADD_REPEAT'; // 매년반복

const GET_FSCHEDULES_LIST = 'talk/fschedule/GET_FSCHEDULES_LIST'; // 가족일정 조회
const GET_FSCHEDULES_DETAIL= 'talk/fschedule/GET_FSCHEDULES_DETAIL'; // 가족일정 상세조회
const SET_FSCHEDULES_ADD = 'talk/fschedule/SET_FSCHEDULES_ADD'; // 가족일정 등록
const UPDATE_FSCHEDULES= 'talk/fschedule/UPDATE_FSCHEDULES'; // 가족일정 상세조회
const DELETE_FSCHEDULES= 'talk/fschedule/DELETE_FSCHEDULES'; // 가족일정 상세조회

const GET_FMSGS_LIST = 'talk/fmsgs/GET_FMSGS_LIST'; // 가족메시지 조회
const GET_FMSGS_DETAIL_VIEW = 'talk/fmsgs/GET_FMSGS_DETAIL_VIEW'; // 가족메시지 상세 조회

const GET_FMSGS_FAMILYS_LIST = 'talk/fmsgs/GET_FMSGS_FAMILYS_LIST'; // 가족메시지 조회
const SEND_FMSGS = 'talk/fmsgs/SEND_FMSGS';
const DELETE_FMSGS = 'talk/fmsgs/DELETE_FMSGS';
const CHECKBOX_FMSGS_RECEIVETIME = 'talk/fmsgs/write/CHECKBOX_FMSGS_RECEIVETIME';
const SET_FMSGS_RECEIVERKEY = 'talk/fmsgs/write/SET_FMSGS_RECEIVERKEY';
const SET_FMSGS_WRITE_UPLOADFILE = 'talk/fmsgs/Write/SET_FMSGS_WRITE_UPLOADFILE';
const CHANGE_INPUT_FMSGS_WRITE = 'talk/fmsgs/write/CHANGE_INPUT_FMSGS_WRITE'; // input 값 변경


export const setDate = createAction(SET_DATE);
export const setActiveDate = createAction(SET_ACTIVE_DATE);
export const setAddYear = createAction(SET_ADD_YEAR);
export const setAddMonth = createAction(SET_ADD_MONTH);
export const setAddDay = createAction(SET_ADD_DAY);
export const changeInput = createAction(CHANGE_INPUT);
export const checkboxAddReapt = createAction(CHECKBOX_ADD_REPEAT);
export const setFschedulesAdd = createAction(SET_FSCHEDULES_ADD,WebApi.setFschedulesAdd);

export const checkboxFmsgsWrite = createAction(CHECKBOX_FMSGS_RECEIVETIME);
export const setFmsgsWriteReceiverkey = createAction(SET_FMSGS_RECEIVERKEY);
export const setFmsgsWriteUploadFile = createAction(SET_FMSGS_WRITE_UPLOADFILE);
export const changeInputFmsgsWrite = createAction(CHANGE_INPUT_FMSGS_WRITE);
export const getFschedulesList = createAction(GET_FSCHEDULES_LIST,WebApi.getFschedulesList);
export const getFschedulesDetail = createAction(GET_FSCHEDULES_DETAIL,WebApi.getFschedulesDetail);
export const getFschedulesDelete = createAction(DELETE_FSCHEDULES,WebApi.getFschedulesDelete);
export const getFschedulesUpdate = createAction(UPDATE_FSCHEDULES,WebApi.getFschedulesUpdate);

export const getFmsgsList = createAction(GET_FMSGS_LIST,WebApi.getFmsgsList);
export const getFmsgsDetailView = createAction(GET_FMSGS_DETAIL_VIEW,WebApi.getFmsgsDetailView); // seq, tokenid
export const getFmsgsFamilysList = createAction(GET_FMSGS_FAMILYS_LIST,WebApi.getFmsgsFamilysList);
export const sendFmsgs = createAction(SEND_FMSGS,WebApi.sendFmsgs);
export const deleteFmsgs = createAction(DELETE_FMSGS,WebApi.deleteFmsgs);


const initialState = Map({
    date:moment(),
    activeDate:null,
    fschedule: Map({
        list: List([]),
        write: Map({
            year:moment().local().format('YYYY'),
            month:moment().local().format('M'),
            day:moment().local().format('D'),
            memo:" ",
            repeat:true,
            alarm:true,
            success:false
        }),
        detail: Map({
            seq:1,
            year:2017,
            month:9,
            day:10,
            memo:" ",
            repeat:false,
            alarm:false
        }),
        update:false,
        delete:false
        
    }),
    fmsgs: Map({
        list:List([]),
        user:List([]),
        familys:List([]),
        write: Map({
            msg:'',
            receivetime:1, 
            receiverkey:List([1]),
            fileid:'',
            success:false
         }), 
         msgfileupload:Map({
             success:true,
             fileid:null,
             filePath:null
         }),
         view:Map({
             seq:1,
             msg:' ',
             userkey:1,
             icon:1,
             img:'',
             date:' ',
             fromto:' ',
             alias:[' '],
             fileflag:false,
             filetype:1,
             filePath:''
         }),
         uploadFile:Map({
            fileData:'',
            fileName:'',
            fileType:''
        }),
        deleteSuccess:false
    }),
});

export default handleActions({
    [CHANGE_INPUT]: (state, action) => {
        const { form, value } = action.payload;
        return state.setIn(['fschedule',form,'memo'], value);
    },
    [CHANGE_INPUT_FMSGS_WRITE]: (state, action) =>  state.setIn(['fmsgs','write','msg'], action.payload),
    [SET_FMSGS_RECEIVERKEY]: (state, action) => {
        let key = state.getIn(['fmsgs','write','receiverkey']).toJS();
        const index = key.indexOf(action.payload);
        index === -1 ? key.push(action.payload) : key.splice(index, 1);
        return state.setIn(['fmsgs','write','receiverkey'],fromJS(key));
    },
    [CHECKBOX_FMSGS_RECEIVETIME]: (state, action) => state.setIn(['fmsgs','write','receivetime'],action.payload),
    [SET_FMSGS_WRITE_UPLOADFILE] :  (state, action) => {
        const { fileName, fileType, fileData } = action.payload;
        const result = Map({
            fileData:fileData,
            fileName:fileName,
            fileType:fileType
        })
        return state.setIn(['fmsgs','uploadFile'], result);
    },
    [SET_DATE]: (state,action) => state.set('date', action.payload),
    [SET_ACTIVE_DATE]: (state,action) => state.set('activeDate', action.payload),
    [CHECKBOX_ADD_REPEAT]: (state, action) => {
        const { form, data } = action.payload;
        return state.setIn(['fschedule',form,'repeat'],data);
    },
    [SET_ADD_YEAR]: (state,action) => {
        const { form, data } = action.payload;
        return state.setIn(['fschedule',form,'year'],data);
    },
    [SET_ADD_MONTH]: (state,action) => {
        const { form, data } = action.payload;
        return state.setIn(['fschedule',form,'month'],data);
    },
    [SET_ADD_DAY]: (state,action) => {
        const { form, data } = action.payload;
        return state.setIn(['fschedule',form,'day'],data);
    },
    ...pender({
        type: GET_FSCHEDULES_LIST,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            return state.setIn(['fschedule','list'], fromJS(JSON.parse(jsonData).list));
        }
    }),
    ...pender({
        type: SET_FSCHEDULES_ADD,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            return state.setIn(['fschedule','write','success'], fromJS(JSON.parse(jsonData).success)).set('activeDate',null);
        }
    }),
    ...pender({
        type: GET_FSCHEDULES_DETAIL,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            return state.setIn(['fschedule','detail'], fromJS(JSON.parse(jsonData)));
        }
    }),
    ...pender({
        type: DELETE_FSCHEDULES,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            return state.setIn(['fschedule','delete'], fromJS(JSON.parse(jsonData).success)).set('activeDate',null);
        }
    }),
    ...pender({
        type: UPDATE_FSCHEDULES,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            return state.setIn(['fschedule','update'], fromJS(JSON.parse(jsonData).success)).set('activeDate',null);
        }
    }),
    ...pender({
        type: GET_FMSGS_LIST,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            console.log(jsonData);
            return state.setIn(['fmsgs','list'], fromJS(JSON.parse(jsonData).list)).setIn(['fmsgs','user'], fromJS(JSON.parse(jsonData).user));
        }
    }),
    ...pender({
        type: GET_FMSGS_FAMILYS_LIST,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            console.log(jsonData);
            return state.setIn(['fmsgs','familys'], fromJS(JSON.parse(jsonData).list));
        }
    }),
    ...pender({
        type: GET_FMSGS_DETAIL_VIEW,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            console.log('jsonData',jsonData);
            return state.setIn(['fmsgs','view'], fromJS(JSON.parse(jsonData)));
        }
    }),
    ...pender({
        type: SEND_FMSGS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            return state.setIn(['fmsgs','write','success'], fromJS(JSON.parse(jsonData).success));
        }
    }),
    ...pender({
        type: DELETE_FMSGS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            return state.setIn(['fmsgs','deleteSuccess'], fromJS(JSON.parse(jsonData).success));
        }
    })



    

}, initialState);