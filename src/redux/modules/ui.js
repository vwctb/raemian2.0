import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';

const SIDE_OPEN = 'ui/sideMenu/SIDE_OPEN';
const SET_PAGETYPE = 'ui/write/SET_PAGETYPE';
const SET_HEADERTITLE = 'ui/write/SET_HEADERTITLE';
const SET_CONTROL_SELECTID = 'ui/control/SET_CONTROL_SELECTID';
const SET_CONTROL_STATUS = 'ui/control/SET_CONTROL_STATUS';
const SET_CONTROL_CONFIGTEMP = 'ui/control/SET_CONTROL_CONFIGTEMP';
const CHANGE_SIDE_MENU_VIWE ='ui/sideMenu/CHANGE_SIDE_MENU_VIWE';
const SET_MODAL_VISIBLE = 'ui/modal/SET_MODAL_VISIBLE';
const SET_SPINNER_VISIBLE = 'ui/spinner/SET_SPINNER_VISIBLE';
export const sideOpen = createAction(SIDE_OPEN);
export const changeSideMenuView = createAction(CHANGE_SIDE_MENU_VIWE); // {view}
export const setPageType = createAction(SET_PAGETYPE); //{pageType}
export const setHeaderTitle = createAction(SET_HEADERTITLE); //{title}
export const setControlSelectId = createAction(SET_CONTROL_SELECTID); //{id}
export const setControlStatus = createAction(SET_CONTROL_STATUS); //{status}
export const setControlConfigTemp = createAction(SET_CONTROL_CONFIGTEMP); //{configTemp}
export const setModalVisible = createAction(SET_MODAL_VISIBLE); //{visible}
export const setSpinnerVisible = createAction(SET_SPINNER_VISIBLE); //{visible}

const initialState = Map({
    write: Map({
        focused: false,
        date: '',
        body: ''
    }),
    sideMenu: Map({
        sideOpen: false,
        sideView: Map({
            sideViewIndex: 0,
            sideViewName:'전체 메뉴'
        }),
        controlItemList: List([
            Map({
                name: '조명',
                icon: 'light',
                index: 1
            }),
            Map({
                name: '난방',
                icon: 'heating',
                index: 2
            }),
            Map({
                name: '가스',
                icon: 'gas',
                index: 3
            }),
            Map({
                name: '콘센트',
                icon: 'concent',
                index: 4
            }),
            Map({
                name: '에어컨',
                icon: 'aircon',
                index: 5
            }), 
            Map({
                name: '방범',
                icon: 'guard',
                index: 6
            })
        ]),
        listViewItemList:List([
            Map({
                name: '방문자',
                icon: 'visitors',
                index: 1
            }),
            Map({
                name: '공지사항',
                icon: 'notices',
                index: 2
            }),
            Map({
                name: 'CCTV',
                icon: 'cctvs',
                index: 3
            }),
            Map({
                name: '택배',
                icon: 'parcels',
                index: 4
            }),
            Map({
                name: '주차위치',
                icon: 'plocs',
                index: 5
            }), 
            Map({
                name: '귀가알림',
                icon: 'comehomes',
                index: 6
            }),
            Map({
                name: '가족위치',
                icon: 'flocs',
                index: 6
            })
        ]),
        talkItemList:List([
            Map({
                name: '가족일정',
                icon: 'fschedules',
                index: 1
            }),
            Map({
                name: '가족대화방',
                icon: 'chat_room',
                index: 2
            }),
            Map({
                name: '가족메시지',
                icon: 'fmsgs',
                index: 3
            })
        ]),
        settingItemList:List([
            Map({
                name: '비밀번호 잠금',
                index: 1
            }),
            Map({
                name: '홈 배경 변경',
                index: 2
            }),
            Map({
                name: '알림 설정',
                index: 3
            }),
            Map({
                name: '프로필 관리',
                index: 4
            }),
            Map({
                name: '가족 관리',
                index: 5
            }),
            Map({
                name: '스마트폰 출입',
                index: 6
            }),
            Map({
                name: '버전 정보',
                index: 7
            })
        ]),

    }),
    roots:Map({
        pageType: 'main',
        title: ''
    }),
    control:Map({
        nowSelectItem: Map({
          
        })
    }),
    modal:Map({
        visible:false
    }),
    spinner:false,
    memo:Map({
        open: false,
        info: Map({
            id: null,
            title: null,
            body: null
        })
    })
});

export default handleActions({
    [SET_PAGETYPE]: (state, action) => {
        const { pageType } = action.payload;
        return state.setIn(['roots','pageType'], pageType);
    },
    [SET_HEADERTITLE]: (state, action) => {
        const { title } = action.payload
        return state.setIn(['roots','title'], title);
    },
    [SIDE_OPEN]: (state) => state.setIn(['sideMenu','sideOpen'], true),
    [SET_MODAL_VISIBLE]: (state,action) => state.setIn(['modal','visible'], action.payload),
    [SET_SPINNER_VISIBLE]: (state,action) => state.set('spinner', action.payload),
    [CHANGE_SIDE_MENU_VIWE]: (state,action) => {
        //const { sideViewIndex,sideViewTitle } = action.payload;
        return state.setIn(['sideMenu','sideView'], fromJS(action.payload))
    },
    [SET_CONTROL_SELECTID]: (state,action) => { 
        const { nowSelectItem } = action.payload
        return state.setIn(['control','nowSelectItem'],nowSelectItem)
    },
    [SET_CONTROL_STATUS]: (state, action) => {
        const { setStatus } = action.payload;
        return state.setIn(['control','nowSelectItem','status'], setStatus);
    },
    [SET_CONTROL_CONFIGTEMP]: (state, action) => {
        const { configTemp } = action.payload;
        return state.setIn(['control', 'nowSelectItem','configTemp'], configTemp)
    }


}, initialState);