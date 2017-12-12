import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';
import * as authActions from 'redux/modules/auth';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReserveControlGooutContainer } from 'containers/Control';
import * as KEY from 'lib/raemianAES';
class ReserveControlGoout extends Component {
    async componentDidMount() {
        const { UIActions,ControlActions,match } = this.props;
        let { usertoken } = this.props.loginUserInfo.toJS();
        UIActions.setPageType({pageType:'/control'});
        UIActions.setHeaderTitle({title:'외출할 때 설정'});
        if(usertoken === null){
            console.log('login');
             const { AuthActions} = this.props;
             UIActions.setSpinnerVisible(true);
             const dummy = new Date().getTime();
            // const data = KEY.encryptedKey(JSON.stringify({uuid:'uuidkey10120202',dummy:dummy}));
            const uuid = window.deviceId ? window.deviceId : 'uuidkey10120202';
            const pushid = window.tokenId ? window.tokenId : 'tokenid10120202';
            const data = KEY.encryptedKey(JSON.stringify({uuid:uuid,dummy:dummy,pushid:pushid}));
            AuthActions.setUUID(uuid);
            AuthActions.setPUSHID(pushid);
            try {
                await AuthActions.postLogin({'data':data}); 
            } catch(e) {
                console.log('login error: ',e);
            }
            UIActions.setSpinnerVisible(false);
            usertoken = this.props.loginUserInfo.get('usertoken');
        }
        if (match.params.ok === 'ok'){
            try {
                await ControlActions.getSmartReserveGoout(usertoken);
                await ControlActions.putSmartReserveGooutAction(usertoken);
            }catch(e) {
                console.log(e);
            }
        }

    }

    render() {
         return (
            <ReserveControlGooutContainer/>
        )
    };
};

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
        ControlActions: bindActionCreators(controlActions, dispatch)
    })
)(ReserveControlGoout);

