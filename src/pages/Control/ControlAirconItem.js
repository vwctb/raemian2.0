import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';

import { AirconsControlContainer } from 'containers/Control';
import { bindActionCreators } from 'redux';

class ControlAirconItem extends Component {

    async componentDidMount() {
        const {ControlActions, UIActions, match } = this.props;
        UIActions.setPageType({pageType:'/control/aircon'});
        UIActions.setHeaderTitle({title:match.params.name+' 에어컨'});
        try {
            await ControlActions.getInitialAircons();
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

    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ControlActions : bindActionCreators(controlActions, dispatch)
    })
)(ControlAirconItem);

