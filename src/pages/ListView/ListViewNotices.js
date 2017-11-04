
import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as listviewActions from 'redux/modules/listview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NoticesContainer } from 'containers/ListView';

class ListViewNotices extends Component {
    async componentDidMount() {
        const { UIActions, ListViewActions, data_selected_type} = this.props;
        const {usertoken} = this.props.loginUserInfo.toJS();
        UIActions.setPageType({pageType:'/listview'});
        UIActions.setHeaderTitle({title:'공지사항'});
       // console.log(data_selected_type);
        try {
            UIActions.setSpinnerVisible(true);
            await ListViewActions.getInitialNotices(data_selected_type,usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }
    render() {
         return (
            <NoticesContainer/>
        )
    };
};

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo'),
        data_selected_type: state.listview.get('data_selected_type')

    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ListViewActions : bindActionCreators(listviewActions, dispatch),
        
    })
)(ListViewNotices);

