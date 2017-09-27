import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ReserveControlGooutContainer } from 'containers/Control';

class ReserveControlGoout extends Component {
    async componentDidMount() {
        const { UIActions } = this.props;
        UIActions.setPageType({pageType:'/control'});
        UIActions.setHeaderTitle({title:'외출할 때 설정'});
    }

    render() {
         return (
            <ReserveControlGooutContainer/>
        )
    };
};

export default connect(
    (state) => ({

    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(ReserveControlGoout);

