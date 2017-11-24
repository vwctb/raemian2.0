import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import { Map, List, fromJS } from 'immutable';
import moment from 'moment';
import * as WebApi from 'lib/web-api';
import * as KEY from 'lib/raemianAES';


const INITIAL = 'talk/INITIAL';
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
const POST_FMSGS_WRITE_UPLOADFILE = 'talk/fmsgs/Write/POST_FMSGS_WRITE_UPLOADFILE';
const CHANGE_INPUT_FMSGS_WRITE = 'talk/fmsgs/write/CHANGE_INPUT_FMSGS_WRITE'; // input 값 변경
const SET_INITIAL_FMSGS_WRITE = 'talk/fmsgs/write/SET_INITIAL_FMSGS_WRITE'; // input 초기화
const SET_INITIAL_FMSGS_VIEW = 'talk/fmsgs/view/SET_INITIAL_FMSGS_VIEW'; // input 초기화
const SET_FMSGS_WRITE_FILEID =  'talk/fmsgs/write/SET_FMSGS_WRITE_FILEID'; // file_id

const GET_FTALKS_LIST = 'talk/ftalks/GET_FTALKS_LIST'; //usertoken
const GET_FTALKS_IMAGE = 'talk/ftalks/GET_FTALKS_IMAGE'; //usertoken
const GET_FTALKS_IMAGE_THUMB = 'talk/ftalks/GET_FTALKS_IMAGE_THUMB'; //usertoken
const GET_FTALKS_VIDEO = 'talk/ftalks/GET_FTALKS_VIDEO'; //usertoken

const POST_FTALKS_SEND_MESSAGE = 'talk/ftalks/POST_FTALKS_SEND_MESSAGE'; //usertoken
const POST_FTALKS_UPLOAD_FILE = 'talk/ftalks/POST_FTALKS_UPLOAD_FILE'; //usertoken

const CHANGE_INPUT_FTALK_WRITE = 'talk/ftalks/CHANGE_INPUT_FTALK_WRITE'; 

const SET_FTALKS_INPUT_FOCUS = 'talks/ftalks/SET_FTALKS_INPUT_FOCUS'; //true,false
const RECEIVE_FTALKS_NEW_MSG = 'talks/ftalks/RECEIVE_FTALKS_NEW_MSG';

export const initial= createAction(INITIAL);
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
export const postFmsgsWriteUploadFile = createAction(POST_FMSGS_WRITE_UPLOADFILE,WebApi.postFmsgsWriteUploadFile);
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
export const setInitalFmsgsWrite = createAction(SET_INITIAL_FMSGS_WRITE);
export const setInitalFmsgsView= createAction(SET_INITIAL_FMSGS_VIEW);
export const setFmsgsWriteFileId = createAction(SET_FMSGS_WRITE_FILEID);

export const setFtalksInputFocus = createAction(SET_FTALKS_INPUT_FOCUS);
export const getFTalksList = createAction(GET_FTALKS_LIST,WebApi.getFTalksList);
export const changeInputFtalkWrite = createAction(CHANGE_INPUT_FTALK_WRITE);
export const postFtalksSendMessage = createAction(POST_FTALKS_SEND_MESSAGE,WebApi.postFtalksSendMessage);
export const postFtalksUploadFile = createAction(POST_FTALKS_UPLOAD_FILE,WebApi.postFtalksUploadFile);
export const receiveFtalksNewMsg = createAction(RECEIVE_FTALKS_NEW_MSG);



const initialState = Map({
    date:moment(),
    activeDate:null,
    ftalks:Map({
        lasttime: Map({}),
        list: List(),
        user: Map({}),
    }),
    ftalksSendMsg:Map({
        focus:false,
        msg:'',
        uploadFile:Map({
            multipartFile:'',
            fileData:'',
            fileName:'',
            fileType:''
        }),
        successSendMsg:false,
        successUploadFile:false
    }),
    fschedule: Map({
        list: List([]),
        write: Map({
            year:moment().local().format('YYYY'),
            month:moment().local().format('M'),
            day:moment().local().format('D'),
            memo:'',
            repeat:true,
            alarm:true,
            success:false
        }),
        detail: Map({
            seq:1,
            year:2017,
            month:9,
            day:10,
            memo:'',
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
            receiverkey:List(),
            fileid:'',
            success:false
         }),
         msgfileupload:Map({
             success:true,
             fileid:null,
             filePath:null
         }),
         view:Map({
           
         }),
         uploadFile:Map({
            multipartFile:'',
            fileData:'',
            fileName:'',
            fileType:''
        }),
        deleteSuccess:false
    }),
});

export default handleActions({
    [INITIAL] : (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },

    [SET_FTALKS_INPUT_FOCUS] : (state, action) => state.setIn(['ftalksSendMsg','focus'], action.payload),
    [SET_FMSGS_WRITE_FILEID] : (state, action) => state.setIn(['fmsgs','write','fileid'], action.payload),
    [SET_INITIAL_FMSGS_WRITE]: (state, action) => {
        const value = Map({
            msg:'',
            receivetime:1, 
            receiverkey:List(),
            fileid:'',
            success:false
        });
        return state.setIn(['fmsgs','write'], value);
    },

    [SET_INITIAL_FMSGS_VIEW] : (state, action) => state.setIn(['fmsgs','view'], Map({})),
    [CHANGE_INPUT]: (state, action) => {
        const { form, value } = action.payload;
        return state.setIn(['fschedule',form,'memo'], value);
    },
    [CHANGE_INPUT_FMSGS_WRITE]: (state, action) =>  state.setIn(['fmsgs','write','msg'], action.payload),
    [CHANGE_INPUT_FTALK_WRITE]: (state, action) =>  state.setIn(['ftalksSendMsg','msg'], action.payload),
    [SET_FMSGS_RECEIVERKEY]: (state, action) => {
        let key = state.getIn(['fmsgs','write','receiverkey']).toJS();
        const index = key.indexOf(action.payload);
        index === -1 ? key.push(action.payload) : key.splice(index, 1);
        return state.setIn(['fmsgs','write','receiverkey'],fromJS(key));
    },
    [CHECKBOX_FMSGS_RECEIVETIME]: (state, action) => state.setIn(['fmsgs','write','receivetime'],action.payload),
    [SET_FMSGS_WRITE_UPLOADFILE] :  (state, action) => {
        const { fileName, fileType, fileData, multipartFile } = action.payload;
        const result = Map({
            multipartFile:multipartFile,
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
    [RECEIVE_FTALKS_NEW_MSG]:(state, action) => {
        // 전달받은 포스트를 데이터의 앞부분에 넣어줍니다.
        const {value,userToken} = action.payload;
        const jsonData ={
            msg:value.message,
            date:value.insertDate,
            own:(userToken === value.userToken) ? true : false,
            alias:value.userAlias,
            userIcon:value.userIcon,
            userImg:value.userImg,
            filePath:value.filePath,
            thumbPath:value.thumbPath,
            fileFlag:(value.thumbPath.length > 1) ? true : false,
            fileType:value.fileType,
            timemilis:0
        }
        console.log()
        return state.updateIn(['ftalks','list'], data=>data.unshift(fromJS(jsonData)));
    },

    ...pender({
        type: POST_FTALKS_SEND_MESSAGE,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            console.log('jsonData:',jsonData);
            return state.setIn(['ftalksSendMsg','successSendMsg'], fromJS(JSON.parse(jsonData).success)).setIn(['ftalksSendMsg','msg'],'');
        }
    }),
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
            return state.setIn(['fschedule','write','success'], fromJS(JSON.parse(jsonData).success)).set('activeDate',null).setIn(['fschedule','write','memo'],'');
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
            //console.log(jsonData);
            return state.setIn(['fmsgs','list'], fromJS(JSON.parse(jsonData).list)).setIn(['fmsgs','user'], fromJS(JSON.parse(jsonData).user));
        }
    }),
    ...pender({
        type: GET_FMSGS_FAMILYS_LIST,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            //console.log(jsonData);
            return state.setIn(['fmsgs','familys'], fromJS(JSON.parse(jsonData).list));
        }
    }),
    ...pender({
        type: GET_FMSGS_DETAIL_VIEW,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            //console.log('jsonData',jsonData);
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
    }),
    ...pender({
        type: POST_FMSGS_WRITE_UPLOADFILE,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            return state.setIn(['fmsgs','msgfileupload'], fromJS(JSON.parse(jsonData)));
        }
    }),
    ...pender({
        type: GET_FTALKS_LIST,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const listData = JSON.parse(jsonData).list;
            console.log(listData.length);
            if(listData.length <= 0){
                console.log('return');
                return state.set('ftalks',state.get('ftalks'));
            }
            return state.updateIn(['ftalks','list'],list => list.concat(fromJS(listData)))
            .setIn(['ftalks','user'],fromJS(JSON.parse(jsonData).user))
            .setIn(['ftalks','lasttime'],JSON.parse(jsonData).lasttime);
        }
    }),
    ...pender({
        type: POST_FTALKS_UPLOAD_FILE,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            return state.setIn(['ftalksSendMsg','successUploadFile'], fromJS(JSON.parse(jsonData).success));
        }
    })



    

    

    

}, initialState);