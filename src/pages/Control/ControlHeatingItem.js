import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';

import { HeatingControlContainer } from 'containers/Control';
import { bindActionCreators } from 'redux';

class ControlHeatingItem extends Component {

    async componentDidMount() {
        const {ControlActions, UIActions, match } = this.props;
        UIActions.setPageType({pageType:'/control/heating'});
        UIActions.setHeaderTitle({title:match.params.name+' 난방'});
        try {
            await ControlActions.getInitialHeatings();
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

    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ControlActions : bindActionCreators(controlActions, dispatch)
    })
)(ControlHeatingItem);

