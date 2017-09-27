import React, { Component } from 'react';
import { connect } from 'react-redux';
import CCTVList from 'components/ListView/CCTVList';
import { bindActionCreators } from 'redux';
import * as listviewActions from 'redux/modules/listview';
import * as uiAction from 'redux/modules/ui';

class CCTVContainer extends Component {

    setContent=(data)=>{
        const {ListViewActions} = this.props;
        ListViewActions.setContent({name:data});
    }

    render() {
        const {listArray} = this.props;
        return (

            <CCTVList listArray={listArray} pageType={'listview/cctvs'} itemClick={this.setContent}/>

        )
    };
};

export default connect(
    (state) => ({
        listArray: state.listview.get('data_cctvs')
    }),
    (dispatch) => ({
        ListViewActions: bindActionCreators(listviewActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(CCTVContainer);

