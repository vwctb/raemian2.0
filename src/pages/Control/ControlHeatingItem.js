import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';

import { HeatingControlContainer } from 'containers/Control';
import { bindActionCreators } from 'redux';

class ControlHeatingItem extends Component {

    async componentDidMount() {
        const {ControlActions, UIActions, match,id } = this.props;
        let { usertoken } = this.props.loginUserInfo.toJS();

        UIActions.setPageType({pageType:'/control/heating'});
        UIActions.setHeaderTitle({title:match.params.name+' 난방'});

        const data = id;
        try {
            await ControlActions.getInitialHeatings({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }

    }

    render() {
        return (
            <HeatingControlContainer/>
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
)(ControlHeatingItem);

