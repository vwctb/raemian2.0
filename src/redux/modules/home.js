import { pender } from 'redux-pender';
import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import * as AuthAPI from 'lib/web-api';
import * as KEY from 'lib/raemianAES';
// 액션 타입
const SET_INITIAL_FSCHEDULES= 'home/fschedules/SET_INITIAL_FSCHEDULES';
const SET_INITIAL_NEWALARMS= 'home/newalarms/SET_INITIAL_NEWALARMS';
const CHANGE_INPUT_LOCKPASS = 'home/CHANGE_INPUT_LOCKPASS';
const CHANGE_INPUT_LOCKPASS_VALUE = 'home/CHANGE_INPUT_LOCKPASS_VALUE';
const SET_LOCK_VISIBLE = 'home/SET_LOCK_VISIBLE';
const POST_CPS = 'home/SET_LOCK_VISIBLE';
const SET_SCREENLOCK_NOTICE = 'home/SET_SCREENLOCK_NOTICE';
const POST_AUTH_CONFIRM = 'home/POST_AUTH_CONFIRM';
const CHANGE_INPUT = 'home/CHANGE_INPUT'; // input 값 변경


// 액션 생성자


export const setInitialFschedules = createAction(SET_INITIAL_FSCHEDULES);
export const setInitialNewalarms = createAction(SET_INITIAL_NEWALARMS);
export const changeInputLockPass = createAction(CHANGE_INPUT_LOCKPASS); //  { pass }
export const changeInputLockPassValue = createAction(CHANGE_INPUT_LOCKPASS_VALUE); //  { pass }
export const setLockVisible = createAction(SET_LOCK_VISIBLE); //  { visible }
export const postCPS = createAction(POST_CPS,AuthAPI.postCPS); //  { visible }
export const setScreenLockNotice = createAction(SET_SCREENLOCK_NOTICE); //  { visible }
export const postAuthConfirm = createAction(POST_AUTH_CONFIRM,AuthAPI.getAuthForScreenLock); //  { visible }
export const changeInput = createAction(CHANGE_INPUT); //  {  value }


const initialState = Map({
    data_fschedules: List([
        Map({
            dday:null,
            day:null,
            memo:null
        })
    ]),
    data_newalarms: Map({
        homecom: null,
        parcel: 0,
        notice: 0,
        visitor: 0,
        guard: null
    }),
    screenLock:Map({
        pass:'',
        passValue:'○○○○',
        notice:'잠금 비밀번호를 입력해 주세요!',
        success:false,
        visible:false
    }),
    authConfirm:Map({
        success:null,
        pass:''
    })
});

export default handleActions({
    [SET_INITIAL_FSCHEDULES]: (state, action) => {
        console.log('action.payload:',action.payload);
        return state.set('data_fschedules', action.payload)
    },
    [CHANGE_INPUT]: (state, action) => state.setIn(['authConfirm','pass'], action.payload),
    [CHANGE_INPUT_LOCKPASS_VALUE]: (state, action) => state.setIn(['screenLock','passValue'], action.payload),
    [SET_INITIAL_NEWALARMS]: (state, action) => state.set('data_newalarms', action.payload),
    [SET_SCREENLOCK_NOTICE]: (state, action) => state.setIn(['screenLock','notice'], action.payload),
    [CHANGE_INPUT_LOCKPASS]: (state, action) => {
        return state.setIn(['screenLock','pass'], action.payload);
    },
    [SET_LOCK_VISIBLE]: (state, action) => state.setIn(['screenLock','visible'], action.payload),
    ...pender({
        type: POST_CPS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData).success;
            return state.setIn(['screenLock','success'], data);
        }
    }),
    ...pender({
        type: POST_AUTH_CONFIRM,
        onSuccess: (state, action) =>{ 
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            //const tempdata =  KEY.decryptedKey('hol6c5B6tRG+SdWFFtb99rYtb6W7fsD9tKmeIJ12rFUkC6wNbNTpZfxacjb2rcuZgrkaHi3YR4R3jycj/FVmiw==');
            const data = JSON.parse(jsonData).success;
            console.log(JSON.parse(jsonData));
            return state.setIn(['authConfirm','success'], data).setIn(['authConfirm','pass'],'');
        }
    }),

    
}, initialState);