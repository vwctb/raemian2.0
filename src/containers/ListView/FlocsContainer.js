import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlocsList from 'components/ListView/FlocsList';
import { bindActionCreators } from 'redux';
import * as listviewActions from 'redux/modules/listview';
import * as uiAction from 'redux/modules/ui';

class FlocsContainer extends Component {

    render() {
        const {listArray} = this.props;
        return (
            <FlocsList listArray={listArray} pageType={'listview/flocs'} />
        )
    };
};

export default connect(
    (state) => ({
        listArray: state.listview.get('data_flocs')
        }),
    (dispatch) => ({
        ListViewActions: bindActionCreators(listviewActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(FlocsContainer);

