import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReserveControlWakeupContainer } from 'containers/Control';

class ReserveControlWakeup extends Component {
    async componentDidMount() {
        const { UIActions } = this.props;
        UIActions.setPageType({pageType:'/control'});
        UIActions.setHeaderTitle({title:'기상할 때 설정'});
    }

    render() {
         return (
            <ReserveControlWakeupContainer/>
        )
    };
};

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(ReserveControlWakeup);

