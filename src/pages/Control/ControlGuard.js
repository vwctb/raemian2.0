import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GuardContainer } from 'containers/Control';

class ControlAircon extends Component {
    async componentDidMount() {
        const { UIActions, ControlActions, auth,loginUserInfo} = this.props;
        UIActions.setPageType({pageType:'/control'});
        UIActions.setHeaderTitle({title:'방 범'});
        try {
            //await ControlActions.getInitialHeatings({usertoken:loginUserInfo.usertoken});
          //  await ControlActions.getInitialGas();
        } catch(e) {
            console.log(e);
        }
    }
    render() {
         return (
            <GuardContainer/>
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

