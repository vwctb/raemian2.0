
import io from 'socket.io-client';
import * as KEY from 'lib/raemianAES';

// 에러처리된 JSON 파싱함수
const parseJSON = (str) => {
    let parsed = null;
    try {
        parsed = JSON.parse(str);
    } catch (e) {
        return null;
    }
    return parsed;
}

export default (function socketHelper() {
    let _store = null;
    let _socket = null;
    let _uri = null;
    const options = {"heartbeats":false, "reconnection":true}

    const connect = (uri,userToken,type) => {
        _uri = uri;
        _socket = io(uri,options);
        
        _socket.on('connect',()=>{
            _socket.emit('join',{userToken: userToken});
        });
        console.log("_socket : ",_socket);

        _socket.on('message',(_data)=>{
            const value =  parseJSON(KEY.decryptedKey(_data.data));
             console.log("value data : ",value);
            // if(!value || !value.type) return; // 파싱 실패했거나, type 값이 없으면 무시
            if(userToken === value.userToken) return;
            
            if(type === 'ftalks'){
                //console.log('get message');
                _store.dispatch({
                    type:'talks/ftalks/RECEIVE_FTALKS_NEW_MSG',
                    payload:{value:value,userToken:userToken}
                });
                window.myRef.scrollTop = window.myRef.scrollHeight;
            }else if(type === 'control'){
                if(value.device === 'light'){
                    _store.dispatch({
                        type:'control/RECEIVE_NEW_LIGHT',
                        payload:value.items
                    });
                }
                if(value.device === 'concent'){
                    _store.dispatch({
                        type:'control/RECEIVE_NEW_CONCENT',
                        payload:value.items
                    });
                }
                _store.dispatch({
                    type:'ui/spinner/SET_SPINNER_VISIBLE',
                    payload:false
                });
            }
        });

        _socket.on('fileEventListener',(_data)=>{
            const value =  parseJSON(KEY.decryptedKey(_data.data));
            if(userToken === value.userToken) {
                window.isFirstLoad= true;
            }else{
                window.isFirstLoad= false;
            }

            //console.log("value data : ",value);
            // if(!value || !value.type) return; // 파싱 실패했거나, type 값이 없으면 무시
            _store.dispatch({
                type:'talks/ftalks/RECEIVE_FTALKS_NEW_MSG',
                payload:{value:value,userToken:userToken}
            });

            _store.dispatch({
                type:'ui/spinner/SET_SPINNER_VISIBLE',
                payload:false
            });
            
        });


    }

    return {
        initialize: (store, uri, userToken, type) => {
            if(_socket){
                if(_socket.connected) return;
            }
            _store = store;
            connect(uri,userToken,type);
        },
        disconnect:()=>{
            if(_socket){
                if(_socket.disconnected) return;
                _socket.connected && _socket.disconnect();
                console.log("_socket : ",_socket);
            }
           
        }
    }
})()