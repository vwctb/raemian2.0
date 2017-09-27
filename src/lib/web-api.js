import axios from 'axios';


//var plaintext = "사용자 토큰이 잘못 되었습니다.";
//KEY.encryptedKey(plaintext)

//var encStr = "hol6c5B6tRG+SdWFFtb99rYtb6W7fsD9tKmeIJ12rFUkC6wNbNTpZfxacjb2rcuZgrkaHi3YR4R3jycj/FVmiw==";
//KEY.decryptedKey(encStr);


//export const createMemo = ({title, body}) => axios.post('/memo', {title,body});
export const getInitialFschedules = () => axios.get('http://localhost:3001/fschedules'); 
export const getInitialNewalarms = () => axios.get('http://localhost:3001/newalarms'); 

export const getInitalFamilyGroup = (registtoken) => axios.get('/smarthome/v1/familys',{headers:{'Content-Type':'application/json; charest=utf-8','registtoken':registtoken}}).catch(function (error) {
    console.log("channel error",error.response);
});


// auth
export const getAuth = (value) => axios.post('/smarthome/v1/auths',value,{headers:{'Content-Type':'application/json; charest=utf-8'}}).catch(function (error) {
    console.log("channel error",error.response);
});

export const regists = (value) => axios.post('/smarthome/v1/regists',value,{headers:{'Content-Type':'application/json; charest=utf-8'}}).catch(function (error) {
    console.log("channel error",error.response);
});

export const login = (value) => axios.post('/smarthome/v1/login',value,{headers:{'Content-Type':'application/json; charest=utf-8'}}).catch(function (error) {
    console.log("channel error",error.response);
});


/*****************************************
                 제어
******************************************/
export const setBachOff =  (value) => axios.post('/smarthome/v1/batchoffs',{data:value.data},{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':value.usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});

export const getInitialHeatings = (usertoken) => axios.get('/smarthome/v1/heatings',{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});
export const getInitialAircons = () => axios.get('http://localhost:3001/aircon'); 
export const getInitialLights =  (usertoken) => axios.get('/smarthome/v1/lights',{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});
export const getInitialBatch =  (usertoken) => axios.get('/smarthome/v1/batchoffs',{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});
export const getInitialConcents =  (usertoken) => axios.get('/smarthome/v1/concents',{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});

export const setControlLightOnOff = (value) => axios.post('/smarthome/v1/lights',{data:value.data},{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':value.usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});

/*****************************************
                  가족톡
******************************************/

/*[ 가족일정 ]*******************************/
export const getFschedulesList = (value) => axios.get(`/smarthome/v1/fschedules?year=${value.year}&month=${value.month}`,{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':value.usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});
 
export const setFschedulesAdd = (value) => axios.post('/smarthome/v1/fschedules',{data:value.data},{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':value.usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});

export const getFschedulesDetail = (seq,usertoken) => axios.get(`/smarthome/v1/fschedules/${seq}`,{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});
 
export const getFschedulesDelete = (value) => axios.delete('/smarthome/v1/fschedules',{
    data: { data: value.data }, 
    headers:{'usertoken':value.usertoken}
}).catch(function (error) {
    console.log("channel error",error.response);
});

export const getFschedulesUpdate = (value) => axios.put('/smarthome/v1/fschedules',{data:value.data},{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':value.usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});


/*[ 가족메시지 ]*******************************/
export const getFmsgsList = (usertoken) => axios.get('/smarthome/v1/fmsgs',{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});
 
export const getFmsgsFamilysList = (usertoken) => axios.get('/smarthome/v1/fmsgs/familys',{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});
  
export const getFmsgsDetailView = (seq,usertoken) => axios.get(`/smarthome/v1/fmsgs/detail/${seq}`,{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});
   
export const sendFmsgs = (value) => axios.post('/smarthome/v1/fmsgs',{data:value.data},{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':value.usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});
   
export const deleteFmsgs = (value) => axios.delete('/smarthome/v1/fmsgs',{
    data: { data: value.data }, 
    headers:{'usertoken':value.usertoken}
}).catch(function (error) {
    console.log("channel error",error.response);
});





/*
export const getInitialHeatings = (usertoken) => axios.get('/smarthome/v1/heatings',{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});
*/
export const updateHeatingCondition = ({id, control: {status,name,currentTemp,configTemp} }) => axios.put(`http://localhost:3001/heatings/${id}`, {status,name,currentTemp,configTemp});
export const updateAirconsCondition = ({id, control: {status,name,currentTemp,configTemp} }) => axios.put(`http://localhost:3001/aircon/${id}`, {status,name,currentTemp,configTemp});
export const updateLightCondition = ({id, control: {status,name} }) => axios.put(`http://localhost:3001/lights/${id}`, {status,name});
export const updateConcentsCondition = ({id, control: {status,name} }) => axios.put(`http://localhost:3001/concents/${id}`, {status,name});

//export const getRecentMemo = (cursor) => axios.get(`/memo/?id_gte=${cursor+1}&_sort=id&_order=DESC&`); // cursor 기준 최근 작성된 메모를 불러온다.
//export const getPreviousMemo = (endCursor) => axios.get(`/memo/?_sort=id&_order=DESC&_limit=20&id_lte=${endCursor-1}`);
//export const updateMemo = ({id, memo: { title, body }}) => axios.put(`/memo/${id}`, {title, body}); // 메모를 업데이트한다
//export const deleteMemo = (id) => axios.delete(`/memo/${id}`); // 메모를 제거한다

// ListView
export const getInitialVisitors = (usertoken) => axios.get('/smarthome/v1/visitors?page=1&row=32',{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});

export const getInitialParcels = (usertoken) => axios.get('/smarthome/v1/parcels?page=1&row=30',{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});

export const getInitialNotices = (type,usertoken) => axios.get(`/smarthome/v1/notices?page=1&row=32&type=${type}`,{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});

export const getInitialCCTV = (usertoken) => axios.get('/smarthome/v1/cctvs',{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});

export const getInitialComehomes = (usertoken) => axios.get(`/smarthome/v1/comehomes?page=1&row=30`,{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});

export const getInitialPlocs = (usertoken) =>  axios.get('/smarthome/v1/plocs',{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});

export const getInitialFlocs = (usertoken) =>  axios.get('/smarthome/v1/flocs',{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});

export const getNoticeContent = (index,usertoken) => axios.get(`/smarthome/v1/notices/${index}`,{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});
export const getVisitorContent = (index,usertoken) => axios.get(`/smarthome/v1/visitors/${index}`,{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});
export const getCCTVContent = (index,usertoken) => axios.get(`/smarthome/v1/cctvs/${index}`,{headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}}).catch(function (error) {
    console.log("channel error",error.response);
});
