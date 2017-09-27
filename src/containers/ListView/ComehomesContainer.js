import React, { Component } from 'react';
import { connect } from 'react-redux';
import ComehomeList from 'components/ListView/ComehomeList';
import { bindActionCreators } from 'redux';
import * as listviewActions from 'redux/modules/listview';
import * as uiAction from 'redux/modules/ui';

class ComehomesContainer extends Component {

    render() {
        const {listArray} = this.props;
        return (
            <ComehomeList listArray={listArray} pageType={'listview/comehomes'} />
        )
    };
};

export default connect(
    (state) => ({
        listArray: state.listview.get('data_comehomes')
        }),
    (dispatch) => ({
        ListViewActions: bindActionCreators(listviewActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(ComehomesContainer);

