import React, { Component } from 'react';
import Footer from 'components/Footer'
import styled from 'styled-components';
import {HomeContainer} from 'containers/Control';
import * as uiActions from 'redux/modules/ui';
import * as authActions from 'redux/modules/auth';

import * as controlActions from 'redux/modules/control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as KEY from 'lib/raemianAES';

const Wrapper = styled.div`
    /* 레이아웃 */
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    top: 3.5rem;
    z-index: 1;
    overflow:auto;
    /* 색상 */
    background: #aaa;
    color: #49433c;
    box-shadow: 0 -3px 6px rgba(0,0,0,0.10);

    /* 폰트 */
    font-size: 1.3rem;
`;


class ControlHome extends Component {

    async componentDidMount() {
        const { UIActions, ControlActions, match} = this.props;
        let { usertoken } = this.props.loginUserInfo.toJS();
        
        ControlActions.initializeReserve();
        UIActions.setPageType({pageType:'main'});
    
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
        console.log('usertoken:',usertoken);
        try {
            UIActions.setSpinnerVisible(true);
            await Promise.all([ControlActions.getSmartReserveGoout(usertoken),ControlActions.getSmartReserveMorning(usertoken)]);
        }catch(e) {
            console.log(e);
        }

      
        if (match.params.ok === 'ok'){
            try {
                await ControlActions.getSmartReserveGoout(usertoken);
                await ControlActions.putSmartReserveGooutAction(usertoken);
            }catch(e) {
                console.log(e);
            }
        }

        UIActions.setSpinnerVisible(false);
        
    }


   render() {
       return(
        <Wrapper>
            <HomeContainer/>
             <Footer
               selectedPage = "control"
               newFtalk= {this.props.newTalk.get('ftalk')}
               newFmsg = {this.props.newTalk.get('fmsg')}
             />
        </Wrapper>
       
        )
    };
};


export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo'),
        newTalk : state.ui.get('newTalk')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ControlActions: bindActionCreators(controlActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(ControlHome);