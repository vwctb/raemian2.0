import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FSchedulesAddContainer } from 'containers/Talk';

class FSchedulesAdd extends Component {
    async componentDidMount() {
        const { UIActions } = this.props;
        UIActions.setPageType({pageType:'/talk/fschedules'});
        UIActions.setHeaderTitle({title:'일정 추가'});
    }

    render() {
         return (
            <FSchedulesAddContainer/>
        )
    };
};

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(FSchedulesAdd);

