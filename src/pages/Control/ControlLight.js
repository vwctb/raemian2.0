import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LightContainer } from 'containers/Control';
import socket from 'lib/socket';

class ControlLight extends Component {
    async componentDidMount() {
        const { UIActions, ControlActions } = this.props;
        UIActions.setPageType({pageType:'/control'});
        UIActions.setHeaderTitle({title:'조 명'});
        const {usertoken} = this.props.loginUserInfo.toJS();
        UIActions.setSpinnerVisible(true);
        try {
            //await ControlActions.getInitialHeatings({usertoken:loginUserInfo.usertoken});
            await Promise.all([ControlActions.getInitialBatch(usertoken),ControlActions.getInitialLights(usertoken)]);
      
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
        socket.initialize(window.store, window.socketURIControl, usertoken, 'control');
    }

    componentWillUnmount(){
        const { ControlActions } = this.props;
        ControlActions.initial('data_lights');
        socket.disconnect();
    }

    render() {
        const {usertoken} = this.props.loginUserInfo.toJS();
         return (
            <LightContainer usertoken={usertoken}/>
        )
    };
};

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo'),
        batchSuccess: state.control.getIn(['success','control_batch_success'])
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ControlActions : bindActionCreators(controlActions, dispatch),
        
    })
)(ControlLight);

