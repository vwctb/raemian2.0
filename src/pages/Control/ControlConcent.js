import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConcentContainer } from 'containers/Control';
import socket from 'lib/socket';
class ControlConcent extends Component {
    async componentDidMount() {
        const { UIActions, ControlActions, auth, loginUserInfo} = this.props;
        const {usertoken} = this.props.loginUserInfo.toJS();
        UIActions.setPageType({pageType:'/control'});
        UIActions.setHeaderTitle({title:'콘센트'});
        
        try {
            UIActions.setSpinnerVisible(true);
            //await ControlActions.getInitialHeatings({usertoken:loginUserInfo.usertoken});
            await ControlActions.getInitialConcents(usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
        socket.initialize(window.store, window.socketURIControl, usertoken, 'control');
    }
    
    componentWillUnmount(){
        const { ControlActions } = this.props;
        ControlActions.initial('data_concents');
        socket.disconnect();
    }

    render() {
         return (
            <ConcentContainer/>
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
)(ControlConcent);

