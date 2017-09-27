import React, { Component } from 'react';
import { connect } from 'react-redux';
import VisitorList from 'components/ListView/VisitorList';
import { bindActionCreators } from 'redux';
import * as listviewActions from 'redux/modules/listview';
import * as uiAction from 'redux/modules/ui';

class VisitorsContainer extends Component {

    setContent=(data)=>{
        const {ListViewActions} = this.props;
        ListViewActions.setContent({data:data});
    }

    render() {
        const {listArray} = this.props;
        return (
            <VisitorList listArray={listArray} pageType={'listview/visitors'} itemClick={this.setContent}/>
        )
    };
};

export default connect(
    (state) => ({
        listArray: state.listview.get('data_visitors')
    }),
    (dispatch) => ({
        ListViewActions: bindActionCreators(listviewActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(VisitorsContainer);

