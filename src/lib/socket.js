
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

    const connect = (uri,userToken) => {
        _uri = uri;
        _socket = io(uri,options);
        console.log("_socket : ",_socket);
        _socket.on('connect',()=>{
            _socket.emit('join',{userToken: "SAvlVWtvbUhgFZEEvI/UjN62nK3EaSgds2ZhRsYl3uI="});
        });

        _socket.on('message',(_data)=>{
            const value =  parseJSON(KEY.decryptedKey(_data.data));
            console.log("value data : ",value);
            // if(!value || !value.type) return; // 파싱 실패했거나, type 값이 없으면 무시
            if(value.device === 'light'){
                _store.dispatch({
                    type:'control/RECEIVE_NEW_LIGHT',
                    payload:value.items
                });
                
                _store.dispatch({
                    type:'ui/spinner/SET_SPINNER_VISIBLE',
                    payload:false
                });
            }
        });
    }

    return {
        initialize: (store, uri, userToken) => {
            if(_socket){
                if(_socket.connected) return;
            }
            _store = store;
            connect(uri,userToken);
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