import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConcentContainer } from 'containers/Control';

class ControlConcent extends Component {
    async componentDidMount() {
        const { UIActions, ControlActions, auth, loginUserInfo} = this.props;
        const {usertoken} = this.props.loginUserInfo;
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

