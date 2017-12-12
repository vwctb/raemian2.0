import { createAction, handleActions } from 'redux-actions';
import { Map, List, fromJS } from 'immutable';
import { pender } from 'redux-pender';
import * as WebAPI from 'lib/web-api';
import * as KEY from 'lib/raemianAES';
// 액션 타입
const INITIAL = 'control/INITIAL';
const INITIAL_DAYOFWEEK = 'control/INITIAL_DAYOFWEEK';
const SET_CONTROL_SPINNER_VISIBLE = 'control/spinner/SET_CONTROL_SPINNER_VISIBLE';

const GET_INITIAL_HEATINGS= 'control/GET_INITIAL_HEATINGS';
const GET_INITIAL_AIRCONS= 'control/GET_INITIAL_AIRCONS';
const GET_INITIAL_LIGHTS= 'control/GET_INITIAL_LIGHTS';
const GET_INITIAL_CONCENTS = 'control/GET_INITIAL_CONCENTS';
const GET_INITIAL_BATCH = 'control/GET_INITIAL_BATCH';
const GET_INITIAL_GUARD = 'control/GET_INITIAL_GUARD';
const GET_INITIAL_GAS = 'control/GET_INITIAL_GAS';


const RECEIVE_NEW_LIGHT='control/RECEIVE_NEW_LIGHT';
const RECEIVE_NEW_HEATING='control/RECEIVE_NEW_HEATING';
const RECEIVE_NEW_CONCENT='control/RECEIVE_NEW_CONCENT';
const RECEIVE_NEW_GUARD='control/RECEIVE_NEW_GUARD';
const RECEIVE_NEW_BATCHOFF = 'control/RECEIVE_NEW_BATCHOFF';

const UPDATE_HEATING_CONDITION= 'control/heating/UPDATE_HEATING_CONDITION';
const UPDATE_AIRCONS_CONDITION= 'control/heating/UPDATE_AIRCONS_CONDITION';
const UPDATE_LIGHT_CONDITION = 'control/light/UPDATE_LIGHT_CONDITION';
const UPDATE_CONCENTS_CONDITION = 'control/light/UPDATE_CONCENTS_CONDITION';

const UPDATE_GUARD_STATUS = 'control/gas/UPDATE_GUARD_STATUS';

const CHECKBOX_RESERVE_CONTROL_USE = 'control/CHECKBOX_RESERVE_CONTROL_USE';
const CHECKBOX_RESERVE_CONTROL = 'control/CHECKBOX_RESERVE_CONTROL';

const RESERVE_CONTROL_WAKEUP_TIMER = 'control/RESERVE_CONTROL_WAKEUP_TIMER';
const RESERVE_CONTROL_WAKEUP_DAYOFWEEK = 'control/RESERVE_CONTROL_WAKEUP_DAYOFWEEK';
const SET_CONTROL_BACHOFF = 'control/SET_CONTROL_BACHOFF';
const SET_CONTROL_GUARD = 'control/SET_CONTROL_GUARD';
const SET_CONTROL_GAS = 'control/SET_CONTROL_GAS';
const SET_CONTROL_LIGHT_ONOFF = 'control/SET_CONTROL_LIGHT_ONOFF';
const SET_CONTROL_CONCENT_ONOFF = 'control/SET_CONTROL_CONCENT_ONOFF';
const GET_SMART_RESERVE_GOOUT = 'control/GET_SMART_RESERVE_GOOUT';
const SET_SMART_RESERVE_GOOUT = 'control/SET_SMART_RESERVE_GOOUT';
const GET_SMART_RESERVE_MORNING = 'control/GET_SMART_RESERVE_MORNING';
const SET_SMART_RESERVE_MORNING = 'control/SET_SMART_RESERVE_MORNING';
const INITIALIZE_RESERVE = 'control/INITIALIZE_RESERVE';
const SET_CONTROL_HEATING_ONOFF = 'control/SET_CONTROL_HEATING_ONOFF';
const RESERVE_CONTROL_WAKEUP_TIMER_AMPM = 'control/RESERVE_CONTROL_WAKEUP_TIMER_AMPM';
const PUT_SMART_RESERVE_GOOUT_ACTION ='control/PUT_SMART_RESERVE_GOOUT_ACTION';
// 액션 생성자
export const initial = createAction(INITIAL);
export const initialDayOfWeek = createAction(INITIAL_DAYOFWEEK);

export const setSpinnerVisible = createAction(SET_CONTROL_SPINNER_VISIBLE);

export const getInitialHeatings = createAction(GET_INITIAL_HEATINGS, WebAPI.getInitialHeatings);
export const getInitialAircons = createAction(GET_INITIAL_AIRCONS, WebAPI.getInitialAircons);
export const getInitialLights = createAction(GET_INITIAL_LIGHTS, WebAPI.getInitialLights);
export const getInitialGuard = createAction(GET_INITIAL_GUARD, WebAPI.getInitialGuard);
export const getInitialGas = createAction(GET_INITIAL_GAS, WebAPI.getInitialGas);

export const getInitialConcents = createAction(GET_INITIAL_CONCENTS, WebAPI.getInitialConcents);
export const getInitialBatch = createAction(GET_INITIAL_BATCH, WebAPI.getInitialBatch);



export const receiveNewLight = createAction(RECEIVE_NEW_LIGHT);
export const receiveNewHeating = createAction(RECEIVE_NEW_LIGHT);
export const receiveNewConcent = createAction(RECEIVE_NEW_CONCENT);
export const receiveNewBatchoff = createAction(RECEIVE_NEW_BATCHOFF);


export const updateHeatingCondition = createAction(UPDATE_HEATING_CONDITION, WebAPI.updateHeatingCondition);
export const updateAirconsCondition = createAction(UPDATE_AIRCONS_CONDITION, WebAPI.updateAirconsCondition);
export const updateGuardStatus = createAction(UPDATE_GUARD_STATUS);
export const updateLightCondition = createAction(UPDATE_LIGHT_CONDITION, WebAPI.updateLightCondition);
export const updateConcentsCondition = createAction(UPDATE_CONCENTS_CONDITION,WebAPI.updateConcentsCondition);

export const setCheckboxReserveControlUse = createAction(CHECKBOX_RESERVE_CONTROL_USE); // form, check
export const setCheckboxReserveControl = createAction(CHECKBOX_RESERVE_CONTROL); // index, check
export const setBachOff = createAction(SET_CONTROL_BACHOFF,WebAPI.setBachOff); //true false
export const setControlLightOnOff = createAction(SET_CONTROL_LIGHT_ONOFF,WebAPI.setControlLightOnOff); 
export const setControlHeatingOnOff = createAction(SET_CONTROL_HEATING_ONOFF,WebAPI.setControlHeatingOnOff); 
export const setControlConcentOnOff = createAction(SET_CONTROL_CONCENT_ONOFF,WebAPI.setControlConcentOnOff); 
export const setControlGuard = createAction(SET_CONTROL_GUARD,WebAPI.setControlGuard); 
export const setGasStatus = createAction(SET_CONTROL_GAS,WebAPI.setGasStatus); 
export const setReserveControlWakeupTimer = createAction(RESERVE_CONTROL_WAKEUP_TIMER); // form, time
export const setReserveControlWakeupTimerAMPM = createAction(RESERVE_CONTROL_WAKEUP_TIMER_AMPM); // form, time

export const setReserveControlWakeupDayofWeek = createAction(RESERVE_CONTROL_WAKEUP_DAYOFWEEK); // num, check
export const initializeReserve = createAction(INITIALIZE_RESERVE); 
export const getSmartReserveGoout = createAction(GET_SMART_RESERVE_GOOUT,WebAPI.getSmartReserveGoout); //
export const setSmartReserveGoout = createAction(SET_SMART_RESERVE_GOOUT,WebAPI.setSmartReserveGoout); // 
export const getSmartReserveMorning = createAction(GET_SMART_RESERVE_MORNING,WebAPI.getSmartReserveMorning); // 
export const setSmartReserveMorning = createAction(SET_SMART_RESERVE_MORNING,WebAPI.setSmartReserveMorning); //
export const putSmartReserveGooutAction = createAction(PUT_SMART_RESERVE_GOOUT_ACTION,WebAPI.putSmartReserveGooutAction); // 

const initialState = Map({
    success:Map({
        control_light_success:false,
        control_guard_success:false,
        control_batch_success:false,
    }),
    data_heatings: List(),
    data_lights: List(),
    data_concents:List(),
    data_aircons:List(),
    batchoff:null,
    data_gas:Map({
        name:"",
        status:'on'
    }),
    data_guard:Map({
        status:0
    }),
    reserveControl:Map({
            gooutActionSuccess:null,
            gooutSuccess:null,
            wakeupSuccess:null,
            goout: Map({
                use:false,
                lights: List([
                   

                    ]),
                concents: List([
                    
                ]),
            }),
            wakeupAMPM:'am',
            wakeup: Map({
                use:false,
                hour:4,
                minute:0,
                lights: List([
                        Map({
                            id: 1,
                            name:'거실1',
                            check:false,
                        }),
                        Map({
                            id: 2,
                            name:'거실2',
                            check:true,
                        }),
                        Map({
                            id: 3,
                            name:'안방',
                            check:false,
                        }),
                        Map({
                            id: 4,
                            name:'방1',
                            check:false,
                        }),
                        Map({
                            id: 5,
                            name:'방2',
                            check:false,
                        }),
                        Map({
                            id: 6,
                            name:'방3',
                            check:false,
                        })
                    ]),
                dayofweek: List([
                        Map({
                            num: 1,
                            name:'월',
                            check:false,
                        }),
                        Map({
                            num: 2,
                            name:'화',
                            check:false,
                        }),
                        Map({
                            num: 3,
                            name:'수',
                            check:false,
                        }),
                        Map({
                            num: 4,
                            name:'목',
                            check:false,
                        }),
                        Map({
                            num: 5,
                            name:'금',
                            check:false,
                        }),
                        Map({
                            num: 6,
                            name:'토',
                            check:false,
                        }),
                        Map({
                            num: 7,
                            name:'일',
                            check:false,
                        })
                    ]),
                }),
        }),
});



export default handleActions({
    [INITIAL] : (state, action) => {
        const initialForm = initialState.get(action.payload);
        const initialFormSuccess = initialState.get('success');
        return state.set(action.payload, initialForm).set('success',initialFormSuccess);
    },
    [INITIAL_DAYOFWEEK] : (state) => {
        const initialForm = initialState.getIn(['reserveControl','wakeup','dayofweek']);
        return state.setIn(['reserveControl','wakeup','dayofweek'], initialForm);
    },


    [INITIALIZE_RESERVE]: (state, action) => {
        const initial = initialState.get('reserveControl');
        return state.set('reserveControl', initial);
    },

    
    [CHECKBOX_RESERVE_CONTROL_USE]: (state, action) => {
        const { from, check } = action.payload;
        return state.setIn(['reserveControl',from,'use'], check);
    },
    [CHECKBOX_RESERVE_CONTROL]: (state, action) => {
        const { from1, from2, index, check } = action.payload;
        const i = Number(index)-1;
        return state.setIn(['reserveControl', from1, from2, i, 'check'], check);
    },
    [RESERVE_CONTROL_WAKEUP_DAYOFWEEK]: (state, action) => {
        const { num, check } = action.payload;
        const i = num-1;
        return state.setIn(['reserveControl','wakeup','dayofweek',i,'check'],check);
    },
    [RESERVE_CONTROL_WAKEUP_TIMER]: (state, action) => {
        const { form, time } = action.payload;
        return state.setIn(['reserveControl','wakeup',form], time);
    },
    [RESERVE_CONTROL_WAKEUP_TIMER_AMPM]: (state, action) => state.setIn(['reserveControl','wakeupAMPM'], action.payload),
    [UPDATE_GUARD_STATUS]:(state, action)=> state.setIn(['data_guard','status'], action.payload),
    [RECEIVE_NEW_LIGHT]: (state, action) => {
        return state.set('data_lights', fromJS(action.payload));
    },
    [RECEIVE_NEW_BATCHOFF]: (state, action) => {
        return state.set('batchoff',action.payload);
    },
    [RECEIVE_NEW_HEATING]: (state, action) => {
        return state.set('data_heatings', fromJS(action.payload));
    },
    [RECEIVE_NEW_CONCENT]: (state, action) => {
        return state.set('data_concents', fromJS(action.payload));
    },
    [RECEIVE_NEW_GUARD]: (state, action) => {
        return state.setIn(['data_guard','status'], fromJS(action.payload));
    },

    [SET_CONTROL_SPINNER_VISIBLE]: (state, action) => {
        return state.set('spinner', action.payload);
    },
    // 초기 리스트 로딩
    /*
    ...pender({
        type: GET_INITIAL_HEATINGS,
        onSuccess: (state, action) =>{
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData).success;
            console.log(data);
            return state.set('data_heatings', fromJS(data));
        }
    }),
    */
    ...pender({
        type: SET_CONTROL_BACHOFF,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            console.log('jsonData2 :',jsonData);
            return state.setIn(['success','control_batch_success'],fromJS(data.success));
        }
    }),
    ...pender({
        type: SET_CONTROL_LIGHT_ONOFF,
        onSuccess: (state, action) => {
        const jsonData = KEY.decryptedKey(action.payload.data.data);
        //const tempdata =  KEY.decryptedKey('AwrYTnfb01cgoMWsgIHpuAun1E8jG9/acnw6jOCX4NSee8GhE5nzdBeP0sMWd6iCpAgg4SVJBDqfwshpGndRoQ==');
        const data = JSON.parse(jsonData);
        console.log(action.payload);
        console.log(data);
        //console.log('tempdata:',tempdata);
        return state.set('data_lights',fromJS(data.items)).setIn(['success','control_light_success'],data.success);
        }
    }),
    ...pender({
        type: SET_CONTROL_HEATING_ONOFF,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            console.log(action.payload);
            console.log(data);
            return state.set('data_heatings',fromJS(data.items));
        }
    }),
    ...pender({
        type: GET_INITIAL_HEATINGS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            return state.set('data_heatings',fromJS(data.items));
        }
    }),
    ...pender({
        type: GET_INITIAL_GUARD,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            console.log('data:',data);
            return state.setIn(['data_guard','status'],fromJS(data.status)).setIn(['success','control_guard_success'],true);
        }
    }),
    ...pender({
        type: SET_CONTROL_GAS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            // const index = Number(data.items[0].id)-1;
            return state.setIn(['data_gas',0],fromJS(data.items));
        }
    }),
    ...pender({
        type: GET_INITIAL_GAS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            console.log('data:',data);
            return state.set('data_gas',fromJS(data.items));
        }
    }),
    ...pender({
        type: GET_INITIAL_BATCH,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            return state.set('batchoff',data.status);
        }
    }),
    ...pender({
        type: GET_INITIAL_AIRCONS,
        onSuccess: (state, action) => state.set('data_aircons', fromJS(action.payload.data))
    }),
    ...pender({
        type: GET_INITIAL_LIGHTS,
        onSuccess: (state, action) => {
             const jsonData = KEY.decryptedKey(action.payload.data.data);
             const data = JSON.parse(jsonData);
             return state.set('data_lights',fromJS(data.items));
        }
    }),

    ...pender({
        type: GET_INITIAL_CONCENTS,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            console.log('jsonData',jsonData);
            return state.set('data_concents',fromJS(data.items));
       }
    }),



    // 개별 콘센트 제어
    // 개별 온도 제어
    ...pender({
        type: UPDATE_AIRCONS_CONDITION,
        onSuccess: (state, action) => {
            /*
            const { id,status,name,currentTemp, configTemp } = action.meta;
            const control = {status,name,currentTemp, configTemp};
            console.log(action.meta);
            const index = state.get('data_aircons').findIndex(control => control.get('id') === id);
            return state.updateIn(['data_aircons', index], (control) => control.merge({
                status,name,currentTemp,configTemp
            }))
            */
            return;
        }
    }),
    ...pender({
        type: UPDATE_CONCENTS_CONDITION,
        onSuccess: (state, action) => {
            console.log(action);
            const { id, status, name} = action.payload.data;
            const control = {status,name};

            const index = state.get('data_concents').findIndex(control => control.get('id') === id);
            return state.updateIn(['data_concents', index], (control) => control.merge({
                status,name
            }))
        }
    }),
    // 개별 조명
    ...pender({
        type: UPDATE_LIGHT_CONDITION,
        onSuccess: (state, action) => {
            /*
            console.log(action);
            const { id, status, name} = action.payload.data;
            const control = {status,name};

            const index = state.get('data_lights').findIndex(control => control.get('id') === id);
            return state.updateIn(['data_lights', index], (control) => control.merge({
                status,name
            }))
            */
            return;
        }
    }),
    ...pender({
        type: GET_SMART_RESERVE_GOOUT,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            console.log('jsonData:',jsonData);
            return state.setIn(['reserveControl','goout'],fromJS(data));
        }
    }),    
    ...pender({
        type: SET_SMART_RESERVE_GOOUT,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            console.log(jsonData);
            return state.setIn(['reserveControl','gooutSuccess'],JSON.parse(jsonData).success);
        }
    }),
    ...pender({
        type: PUT_SMART_RESERVE_GOOUT_ACTION,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            console.log(jsonData);
            return state.setIn(['reserveControl','gooutActionSuccess'],JSON.parse(jsonData).success);
        }
    }),


    


    ...pender({
        type: GET_SMART_RESERVE_MORNING,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            console.log('jsonData:',jsonData);
            const result = {
                use:data.use,
                hour:(data.hour > 12) ? data.hour - 12 : data.hour,
                dayofweek:data.dayofweek,
                lights:data.lights,
                minute:data.minute
            }
            console.log('result:',result);
            const ampm = data.hour > 12 ? 'pm' : 'am';
            return state.setIn(['reserveControl','wakeup'],fromJS(result)).setIn(['reserveControl','wakeupAMPM'],ampm);
        }
    }),
    ...pender({
        type: SET_SMART_RESERVE_MORNING,
        onSuccess: (state, action) => {
            const jsonData = KEY.decryptedKey(action.payload.data.data);
            const data = JSON.parse(jsonData);
            console.log('data:',data)
            return state.setIn(['reserveControl','wakeupSuccess'],JSON.parse(jsonData).success);
        }
    })
 


}, initialState);