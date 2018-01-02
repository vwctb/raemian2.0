import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';

import { AirconsControlContainer } from 'containers/Control';
import { bindActionCreators } from 'redux';

class ControlAirconItem extends Component {

    async componentDidMount() {
        const {ControlActions, UIActions, match,id } = this.props;
        UIActions.setPageType({pageType:'/control/aircon'});
        UIActions.setHeaderTitle({title:match.params.name+' 에어컨'});
        let { usertoken } = this.props.loginUserInfo.toJS();
        const data = id;
        try {
            await ControlActions.getInitialAircons({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        return (
            <AirconsControlContainer/>
        )
    };
};

export default connect(
    (state) => ({
        id: state.ui.getIn(['control','nowSelectItem','id']),
        loginUserInfo: state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ControlActions : bindActionCreators(controlActions, dispatch)
    })
)(ControlAirconItem);

