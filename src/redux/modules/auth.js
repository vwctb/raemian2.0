import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as AuthAPI from 'lib/web-api';
import * as KEY from 'lib/raemianAES';
import { Map, List, fromJS } from 'immutable';

const INITIAL = 'talk/INITIAL';

const GET_MAIN = 'home/GET_MAIN'; // 홈화면 가족일정 새로운알림 로드
const SET_UUID = 'auth/SET_UUID';
const SET_PUSHID = 'auth/SET_PUSHID';
const CHANGE_INPUT = 'auth/CHANGE_INPUT'; // input 값 변경
const CHANGE_PROFILE_INPUT = 'auth/CHANGE_PROFILE_INPUT'; // input 값 변경
const CHANGE_INPUT_LOCKPASS = 'auth/CHANGE_INPUT_LOCKPASS';
const CHANGE_HOME_TITLE_INPUT = 'auth/CHANGE_HOME_TITLE_INPUT'; // input 값 변경
const INITIALIZE_AGREE = 'auth/INITIALIZE_AGREE'; // form 초기화
const CHECKBOX_AGREE = 'auth/CHECKBOX_AGREE';
const CHECKBOX_ALRIM = 'auth/CHECKBOX_ALRIM';
const CHECKBOX_USEPASSLOCK = 'auth/CHECKBOX_USEPASSLOCK';
const CHECKBOX_USELOBBYCFS = 'auth/CHECKBOX_USELOBBYCFS';
const CHECKBOX_HOMEBG_TYPE = 'auth/CHECKBOX_HOMEBG_TYPE';
const SET_PROFILE_UPLOAD_FILE = 'auth/SET_PROFILE_UPLOAD_FILE';
const GET_INITIAL_FAMILYGROUP =  'auth/GET_INITIAL_FAMILYGROUP';
const INPUT_DONGHO = 'auth/INPUT_DONGHO';
const SET_ERROR = 'auth/SET_ERROR'; // 오류 설정
const POST_AUTH_CONFIRM = 'auth/GET_AUTH_CONFIRM'; // 인증 확인
const SET_PROFILE  = 'auth/SET_PROFILE'; // 선택된 가족정보
const SET_PROFILE_TAGCOLOR = 'auth/SET_PROFILE_TAGCOLOR'; // 선택된 가족정보의 태그컬러
const SET_PROFILE_ICON = 'auth/SET_PROFILE_ICON'; // 선택된 가족정보의 태그컬러
const POST_LOGIN = 'auth/POST_LOGIN';
const POST_REGISTS = 'auth/POST_REGISTS';
const DELETE_FAMILY = 'auth/DELETE_FAMILY';
const SET_DELETE_SELECT_FAMILY = 'auth/SET_DELETE_SELECT_FAMILY';
const SET_DELETE_SELECT_FAMILY_ALIAS = 'auth/SET_DELETE_SELECT_FAMILY_ALIAS';
const FORMAT_FAMILY = 'auth/FORMAT_FAMILY';
const FORMAT_INPUT = 'auth/FORMAT_INPUT';

const CHECK_TAG_COLOR = 'auth/CHECK_TAG_COLOR';

export const initial = createAction(INITIAL);
export const checkTagColor = createAction(CHECK_TAG_COLOR,AuthAPI.checkTagColor); //{ tagcolor }
export const getMain = createAction(GET_MAIN,AuthAPI.getMain); //{usertoken}
export const setUUID = createAction(SET_UUID); // { img }
export const setPUSHID = createAction(SET_PUSHID); // { img }
export const setProfileUploadFile = createAction(SET_PROFILE_UPLOAD_FILE); // { img }
export const changeInput = createAction(CHANGE_INPUT); //  { form, name, value }
export const changeProfileInput = createAction(CHANGE_PROFILE_INPUT); //  { form, name, value }
export const changeInputLockPass = createAction(CHANGE_INPUT_LOCKPASS); //  { value }
export const changeHomeTitleInput = createAction(CHANGE_HOME_TITLE_INPUT); //  { value }
export const initializeAgree = createAction(INITIALIZE_AGREE); 
export const setCheckboxAgree = createAction(CHECKBOX_AGREE); // index, check
export const setCheckboxAlrim = createAction(CHECKBOX_ALRIM); // index, check
export const setCheckboxUsePassLock = createAction(CHECKBOX_USEPASSLOCK); // index, check
export const setCheckboxUseLobbyCFS = createAction(CHECKBOX_USELOBBYCFS); // index, check
export const setCheckboxHomeBGType = createAction(CHECKBOX_HOMEBG_TYPE); // index, check
export const getInitialFamilyGroupAuth = createAction(GET_INITIAL_FAMILYGROUP,AuthAPI.getInitialFamilyGroupAuth); //rigisttoken
export const getInitialFamilyGroupSetting = createAction(GET_INITIAL_FAMILYGROUP,AuthAPI.getInitialFamilyGroupSetting); // userkey

export const deleteFamily = createAction(DELETE_FAMILY,AuthAPI.deleteFamily); // userkey
export const setDeleteSelectFamily = createAction(SET_DELETE_SELECT_FAMILY); // userkey
export const setDeleteSelectFamilyAlias = createAction(SET_DELETE_SELECT_FAMILY_ALIAS); // name
export const setFormatFamily = createAction(FORMAT_FAMILY,AuthAPI.setFormatFamily); // dong ho pass(암호화된 외부비밀번호)

export const setFormatFamilyAfterLogin = createAction(FORMAT_FAMILY,AuthAPI.setFormatFamilyAfterLogin);



export const changeFormatInput = createAction(FORMAT_INPUT);
export const setInputDongHo = createAction(INPUT_DONGHO); // index, check
export const setError = createAction(SET_ERROR); // { form, message }
export const postAuthConfirm = createAction(POST_AUTH_CONFIRM,AuthAPI.getAuth); //
export const postLogin = createAction(POST_LOGIN,AuthAPI.login); // { form, message }
export const postRegists = createAction(POST_REGISTS,AuthAPI.regists); // { form, message }
export const setProfile = createAction(SET_PROFILE); // { userkey }
export const setProfileTagColor = createAction(SET_PROFILE_TAGCOLOR); // { tagcolor }
export const setProfileIcon = createAction(SET_PROFILE_ICON); // { icon }

//setting
const GET_INITIAL_PROFILE = 'setting/GET_INITIAL_PROFILE';
const SET_SETTING_PROFILE = 'setting/SET_SETTING_PROFILE';
const GET_HOMEBGS = 'setting/GET_HOMEBGS';
const SET_HOMEBGS = 'setting/SET_HOMEBGS';
const SET_HOMEBGS_IMAGE = 'setting/SET_HOMEBGS_IMAGE';
const SET_HOME_HOMEBGS = 'home/SET_HOME_HOMEBGS';

const GET_ROBBYCFS = 'setting/GET_ROBBYCFS';
const SET_ROBBYCFS = 'setting/SET_ROBBYCFS';
const PUT_CPS = 'setting/PUT_CPS';

const GET_ALARMS = 'setting/GET_ALARMS';
const SET_ALARMS = 'setting/SET_ALARMS';

export const getInitialProfile = createAction(GET_INITIAL_PROFILE,AuthAPI.getInitialProfile); // { usertoken }
export const setSettingProfile = createAction(SET_SETTING_PROFILE,AuthAPI.setSettingProfile); // { usertoken, }
export const getHomeBgs = createAction(GET_HOMEBGS,AuthAPI.getHomeBgs); // { usertoken }
export const setHomeBgs = createAction(SET_HOMEBGS,AuthAPI.setHomeBgs); // { usertoken, data:desc,phototype,img }
export const setHomeBgsImage = createAction(SET_HOMEBGS_IMAGE); // { img }
export const setHomeHomeBgsImage = createAction(SET_HOME_HOMEBGS); // { img }

export const setRobbycfs = createAction(SET_ROBBYCFS,AuthAPI.setRobbycfs); // { img }
export const getRobbycfs = createAction(GET_ROBBYCFS,AuthAPI.getRobbycfs); // { img }
export const putCPS = createAction(PUT_CPS,AuthAPI.putCPS); // { visible }
export const getAlarms= createAction(GET_ALARMS,AuthAPI.getAlarms); // { visible }
export const setAlarms = createAction(SET_ALARMS,AuthAPI.setAlarms); // { visible }

const initialState = Map({
    ver:'201700102A',
    checkTagColor:false,
    loginUserInfo:Map({
        fschedules:List([]),
        result:"fail",
        newalarms:Map({
            parcel: 0,
            homecomeImg: "",
            visitor: 0,
            homecome: "",
            homecomeIcon: 0,
            notice: 0
        }),
        homebgs:Map({
            desc:null,
            phototype:null,
            img:null,
            success:false
        }),
        usertoken:'',
    }),
    register: Map({
        success:false,
        base: Map({
            dong: '',
            ho: '',
            pass:'',            //인증키
            authConfirm:Map({
                success:null,
                registtoken:null
            }),  
            uuid: null ,
            phonetype: 'android',
            pushid: null,
            profile:Map({
                userkey:0,
                icon:9,
                img:'',
                alias:'',
                tagcolor:null,
                joindate:'',
                success:false
            }),
            lockings:Map({
                notice:'새로운 비밀번호 4자리를 입력해주세요!',
                use:false,
                pass:''
            }),
            error:'동호수를 입력해주세요!'
        }),
        agreementList: List([
            Map({
                check: false,
                name: '해당 래미안 아파트 동호수에 실제 거주합니다.',
                index: 1,
                btnKey:undefined,
                btnName:undefined
            }),
            Map({
                check: false,
                name: '서비스 이용약관에 동의합니다.',
                index: 2,
                btnKey:'terms',
                btnName:'약관보기'
            }),
            Map({
                check: false,
                name: '개인정보 취급방침에 동의합니다.',
                index: 3,
                btnKey:'policy',
                btnName:'방침보기'
            }),
        ]),
        exists: Map({
            email: false,
            password: false
        }),
        error: null
    }),
    setting : Map({
         profile:Map({
            icon:0,
            img:'',
            alias:'회원애칭',
            tagcolor:null,
            joindate:''
         }),
         homebgs:Map({
            desc:null,
            phototype:null,
            img:null,
            success:false
         }),
         alarmsList: List([
            Map({
                name: '방범해제',
                id: 'guard',
                check: false,
                index: 1
            }),
            Map({
                name: '방문자',
                id: 'visitor',
                check: false,
                index: 2
            }),
            Map({
                name: '공지사항',
                id: 'notice',
                check: false,
                index: 3
            }),
            Map({
                name: '택배',
                id: 'parcel',
                check: false,
                index: 4
            }),
            Map({
                name: '주차위치',
                id: 'ploc',
                check: false,
                index: 5
            }),
            Map({
                name: '귀가알림',
                id: 'comehome',
                check: false,
                index: 6
            }),
            Map({
                name: '가족 일정(하루전)',
                id: 'fschedule',
                check: false,
                index: 7
            }),
            Map({
                name: '가족 대화방',
                id: 'ftalk',
                check: false,
                index: 8
            }),
            Map({
                name: '가족 메시지',
                id: 'fmsg',
                check: false,
                index: 9
            })
        ]),
        alarmsListSuccess:null,
        familyList:  List([
            
        ]),
        familyListDelete:Map({
            userkey:null,
            alias:null,
            success:null
        }),
        familyListFormat:Map({
            pass:"",
            success:null
        }),
        lobbycfs:Map({
            status:false,
            success:false
        }),
        lockPass:Map({
            notice:'새로운 비밀번호 4자리를 입력해주세요!',
            use:false,
            pass:''
        })
        
    }),
    login: Map({
        form: Map({
            uuid: '',
            dummy: '' //timemillis
        }),
        error: null
    }),

    result: Map({})
});

export default handleActions({
    [INITIAL] : (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },

    [SET_UUID]: (state, action) => state.setIn(['register', 'base','uuid'], action.payload),
    [SET_PUSHID]: (state, action) => state.setIn(['register', 'base','pushid'], action.payload),
    [CHANGE_INPUT]: (state, action) => {
        const { form, name, value } = action.payload;
        return state.setIn([form, 'base', name], value);
    },
    
    [CHANGE_PROFILE_INPUT]: (state, action) =>  state.setIn(['register', 'base', 'profile','alias'], action.payload),
    [CHANGE_HOME_TITLE_INPUT]: (state, action) =>  state.setIn(['setting', 'homebgs', 'desc'], action.payload),
    [FORMAT_INPUT]: (state, action) =>  state.setIn(['setting', 'familyListFormat', 'pass'], action.payload),
    [CHANGE_INPUT_LOCKPASS]: (state, action) => {
        return state.setIn(['setting','lockPass','pass'], action.payload);
    },
    [INITIALIZE_AGREE]: (state, action) => {
        const initialForm = initialState.get(action.payload);
        return state.set(action.payload, initialForm);
    },
    [CHECKBOX_AGREE]: (state, action) => {
        const { index, check } = action.payload;
        const i = index-1;
        return state.setIn(['register','agreementList',i,'check'],check);
    },
    [CHECKBOX_USEPASSLOCK]: (state, action) => state.setIn(['setting','lockPass','use'],action.payload),
    [CHECKBOX_USELOBBYCFS]: (state, action) => state.setIn(['setting','lobbycfs','status'],action.payload),
    [CHECKBOX_HOMEBG_TYPE]: (state, action) => state.setIn(['setting','homebgs','phototype'],action.payload),
    [SET_HOME_HOMEBGS]: (state, action) => state.setIn(['loginUserInfo','homebgs'],fromJS(action.payload)),
    [CHECKBOX_ALRIM]: (state, action) => {
        const { index, check } = action.payload;
        const i = index-1; 
        return state.setIn(['setting','alarmsList',i,'check'],check);
    },
    [INPUT_DONGHO]: (state, action) => {
        const { dong, ho } = action.payload;
        return state.setIn(['register','base','dong'],dong).setIn(['register','base','ho'],ho)
    },
    [SET_ERROR]: (state, action) => {
        const { form, message } = action.payload;
        return state.setIn([form, 'error'], message);
    },
    [SET_PROFILE]: (state, action) => {
        const index = state.getIn(['setting','familyList']).findIndex(familyList => familyList.get('userkey') === action.payload);
        const data = state.getIn(['setting','familyList',index]);
        return state.setIn(['register','base','profile'],data);
    },
    [SET_PROFILE_UPLOAD_FILE]: (state, action) =>  state.setIn(['register','base','profile','img'],action.payload),
    [SET_PROFILE_ICON]:(state, action)=>state.setIn(['register','base','profile','icon'],action.payload),
    [SET_PROFILE_TAGCOLOR]: (state, action)=>state.setIn(['register','base','profile','tagcolor'],action.payload),

    [SET_DELETE_SELECT_FAMILY]: (state, action)=>state.setIn(['setting','familyListDelete','userkey'],action.payload),
    [SET_DELETE_SELECT_FAMILY_ALIAS]: (state, action)=>state.setIn(['setting','familyListDelete','alias'],action.payload),
    [SET_HOMEBGS_IMAGE]: (state, action) => state.setIn(['setting','homebgs','img'], action.payload),
     ...pender({
        type: GET_MAIN,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            console.log('jsonData',JSON.parse(jsonData).fschedules);
            return state.setIn(['loginUserInfo','newalarms'], fromJS(JSON.parse(jsonData).newalarms)).setIn(['loginUserInfo','fschedules'], fromJS(JSON.parse(jsonData).fschedules));
        }
    }),
    // 초기 리스트 로딩
    ...pender({
        type: GET_INITIAL_FAMILYGROUP,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            //console.log(jsonData);
            //const jsonDatalength = (JSON.parse(jsonData).items).length;
            return state.setIn(['setting','familyList'], fromJS(JSON.parse(jsonData).items));
        }
    }),
    ...pender({
        type: GET_INITIAL_PROFILE,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            return state.setIn(['register', 'base', 'profile'], fromJS(JSON.parse(jsonData)));
        }
    }),
    ...pender({
        type: SET_SETTING_PROFILE,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            return state.setIn(['register', 'base', 'profile','success'], fromJS(JSON.parse(jsonData).success));
        }
    }),
    ...pender({
        type: GET_ALARMS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const listData = List([
                Map({
                    name: '방범해제',
                    id: 'guard',
                    check: JSON.parse(jsonData).guard,
                    index: 1
                }),
                Map({
                    name: '방문자',
                    id: 'visitor',
                    check: JSON.parse(jsonData).visitor,
                    index: 2
                }),
                Map({
                    name: '공지사항',
                    id: 'notice',
                    check: JSON.parse(jsonData).notice,
                    index: 3
                }),
                Map({
                    name: '택배',
                    id: 'parcel',
                    check: JSON.parse(jsonData).parcel,
                    index: 4
                }),
                Map({
                    name: '주차위치',
                    id: 'ploc',
                    check: JSON.parse(jsonData).ploc,
                    index: 5
                }),
                Map({
                    name: '귀가알림',
                    id: 'comehome',
                    check: JSON.parse(jsonData).comehome,
                    index: 6
                }),
                Map({
                    name: '가족 일정(하루전)',
                    id: 'fschedules',
                    check: JSON.parse(jsonData).fschedule,
                    index: 7
                }),
                Map({
                    name: '가족 대화방',
                    id: 'ftalk',
                    check: JSON.parse(jsonData).ftalk,
                    index: 8
                }),
                Map({
                    name: '가족 메시지',
                    id: 'fmsg',
                    check: JSON.parse(jsonData).fmsg,
                    index: 9
                })
            ]);
            return state.setIn(['setting','alarmsList'], listData);
        }
    }),
    ...pender({
        type: SET_ALARMS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData).success;
            return state.setIn(['setting','alarmsListSuccess'], data);
        }
    }),
    ...pender({
        type: SET_ROBBYCFS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData).success;
            return state.setIn(['setting','lobbycfs','success'], data);
        }
    }),
    ...pender({
        type:GET_ROBBYCFS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData).status;
            return state.setIn(['setting','lobbycfs','status'], data === 'on' ? true : false );
        }
    }),

    ...pender({
        type: GET_HOMEBGS,
        onSuccess: (state, action) => {
            let jsonData = KEY.decryptedKey(action.payload.data.data);
            if(jsonData.length === 2) {
                jsonData = {
                    desc:null,
                    phototype:1,
                    img:null,
                    success:false
                }
            }
            return state.setIn(['setting', 'homebgs'], fromJS(JSON.parse(jsonData)));
        }
    }),
    ...pender({
        type: SET_HOMEBGS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            return state.setIn(['setting', 'homebgs','success'], fromJS(JSON.parse(jsonData).success));
        }
    }),
    ...pender({
        type: FORMAT_FAMILY,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const jsonData2 = KEY.decryptedKey(action.payload.data);
            console.log('jsonData2:',jsonData2);
            console.log('jsonData:',jsonData);
            return state.setIn(['setting','familyListFormat','success'], fromJS(JSON.parse(jsonData).success));
        }
    }),
    ...pender({
        type: DELETE_FAMILY,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            console.log(jsonData);
            return state.setIn(['setting','familyListDelete','success'], fromJS(JSON.parse(jsonData).success));
        }
    }),
    ...pender({
        type: POST_AUTH_CONFIRM,
        onSuccess: (state, action) =>{ 
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            //const tempdata =  KEY.decryptedKey('hol6c5B6tRG+SdWFFtb99rYtb6W7fsD9tKmeIJ12rFUkC6wNbNTpZfxacjb2rcuZgrkaHi3YR4R3jycj/FVmiw==');
            const data = JSON.parse(jsonData);
            return state.setIn(['register','base','authConfirm'], data).setIn(['register','base','pass'],'');
        }
    }),
    ...pender({
        type: POST_LOGIN,
        onSuccess: (state, action) =>{
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            return state.set('loginUserInfo', fromJS(data));
        }
    }),
    ...pender({
        type: POST_REGISTS,
        onSuccess: (state, action) =>{
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData).success;
            return state.setIn(['register','success'], data);
        }
    }),
    ...pender({
        type: PUT_CPS,
        onSuccess: (state, action) =>{
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData).success;
            return state.setIn(['setting','lockPass','success'], data);
        }
    }),
    ...pender({
        type: CHECK_TAG_COLOR,
        onSuccess: (state, action) =>{
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData).flag;
            return state.set('checkTagColor', data);
        }
    })

    


    
    



}, initialState);