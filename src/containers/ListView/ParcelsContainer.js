import React, { Component } from 'react';
import { connect } from 'react-redux';
import ParcelsList from 'components/ListView/ParcelsList';
import { bindActionCreators } from 'redux';
import * as listviewActions from 'redux/modules/listview';
import * as uiAction from 'redux/modules/ui';

class VisitorsContainer extends Component {

    render() {
        const {listArray} = this.props;
        return (
            <ParcelsList listArray={listArray} pageType={'listview/parcels'} />
        )
    };
};

export default connect(
    (state) => ({
        listArray: state.listview.get('data_parcels')
    }),
    (dispatch) => ({
        ListViewActions: bindActionCreators(listviewActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(VisitorsContainer);

