import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlocsList from 'components/ListView/PlocsList';
import { bindActionCreators } from 'redux';
import * as listviewActions from 'redux/modules/listview';
import * as uiAction from 'redux/modules/ui';

class PlocsContainer extends Component {

    render() {
        const {listArray} = this.props;
        return (
            <PlocsList listArray={listArray} pageType={'listview/plocs'} />
        )
    };
};

export default connect(
    (state) => ({
        listArray: state.listview.get('data_plocs')
        }),
    (dispatch) => ({
        ListViewActions: bindActionCreators(listviewActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(PlocsContainer);

