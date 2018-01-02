import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AirconsContainer } from 'containers/Control';

class ControlAircon extends Component {
    async componentDidMount() {
        const { UIActions, ControlActions } = this.props;
        const {usertoken} = this.props.loginUserInfo.toJS();
        UIActions.setPageType({pageType:'/control'});
        UIActions.setHeaderTitle({title:'에어컨'});
        
        const data = 'all';

        
        try {
            UIActions.setSpinnerVisible(true);
            await ControlActions.getInitialAircons({data:data,usertoken:usertoken});
        }catch(e) {
            console.log(e);
        }

        UIActions.setSpinnerVisible(false);


    }

    render() {

         return (
            <AirconsContainer/>
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

