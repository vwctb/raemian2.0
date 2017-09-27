import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as listviewActions from 'redux/modules/listview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ParcelsContainer } from 'containers/ListView';

class ListViewVisitors extends Component {
    async componentDidMount() {
        const { UIActions, ListViewActions, auth} = this.props;
        const {usertoken} = this.props.loginUserInfo;
        UIActions.setPageType({pageType:'/listview'});
        UIActions.setHeaderTitle({title:'택배'});
        try {
            UIActions.setSpinnerVisible(true);
            await ListViewActions.getInitialParcels(usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }
    render() {
         return (
            <ParcelsContainer/>
        )
    };
};

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ListViewActions : bindActionCreators(listviewActions, dispatch),
        
    })
)(ListViewVisitors);

