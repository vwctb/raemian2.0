import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GasContainer } from 'containers/Control';
import socket from 'lib/socket';
class ControlAircon extends Component {
    async componentDidMount() {
        const { UIActions, ControlActions, loginUserInfo} = this.props;
        const {usertoken} = this.props.loginUserInfo.toJS();
        UIActions.setPageType({pageType:'/control'});
        UIActions.setHeaderTitle({title:'가 스'});

        UIActions.setSpinnerVisible(true);
        console.log('usertoken:',usertoken);
        
        try {
            await ControlActions.getInitialGas(usertoken);
        } catch(e) {
            console.log(e);
        }
        
        UIActions.setSpinnerVisible(false);
        socket.initialize(window.store, window.socketURIControl, usertoken, 'control');
    }
    componentWillUnmount(){
        const { ControlActions } = this.props;
        ControlActions.initial('data_guard');
        socket.disconnect();
    }

    render() {
         return (
            <GasContainer/>
        )
    };
};

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ControlActions : bindActionCreators(controlActions, dispatch),
        
    })
)(ControlAircon);

