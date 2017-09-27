import React, { Component } from 'react';
import { connect } from 'react-redux';
import NoticesList from 'components/ListView/NoticesList';
import { bindActionCreators } from 'redux';
import * as listviewActions from 'redux/modules/listview';
import * as uiAction from 'redux/modules/ui';

class VisitorsContainer extends Component {

    setContent=(data)=>{
        const {ListViewActions} = this.props;
        ListViewActions.setContent(data);
    }

    setSelectedType=async(data)=>{
        const { ListViewActions,UIActions } = this.props;
        const { usertoken } = this.props.loginUserInfo; 
        const type = data.check === true ? 'all' : 'ones';
        console.log('type:',type);
        try {
            UIActions.setSpinnerVisible(true);
            ListViewActions.setSelectedType(type);
            await ListViewActions.getInitialNotices(type,usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
        
    }

    render() {
        const {listArray, selectedType} = this.props;
        return (
            <NoticesList listArray={listArray} pageType={'listview/notices'} selectedType={selectedType} typeClick={this.setSelectedType} itemClick={this.setContent}/>
        )
    };
};

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo'),
        listArray: state.listview.get('data_notices'),
        selectedType: state.listview.get('data_selected_type')
    }),
    (dispatch) => ({
        ListViewActions: bindActionCreators(listviewActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(VisitorsContainer);

