import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LightContainer } from 'containers/Control';

class ControlHeating extends Component {
    async componentDidMount() {
        const { UIActions, ControlActions } = this.props;
        UIActions.setPageType({pageType:'/control'});
        UIActions.setHeaderTitle({title:'조 명'});
        const {usertoken} = this.props.loginUserInfo.toJS();
        UIActions.setSpinnerVisible(true);
        try {
            //await ControlActions.getInitialHeatings({usertoken:loginUserInfo.usertoken});
            await ControlActions.getInitialBatch(usertoken);
            await ControlActions.getInitialLights(usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
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
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ControlActions : bindActionCreators(controlActions, dispatch),
        
    })
)(ControlHeating);

