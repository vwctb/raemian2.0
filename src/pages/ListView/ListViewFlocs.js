import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as listviewActions from 'redux/modules/listview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlocsContainer } from 'containers/ListView';

class ListViewFlocs extends Component {
    async componentDidMount() {
        const { UIActions, ListViewActions } = this.props;
        const {usertoken} = this.props.loginUserInfo;        
        UIActions.setPageType({pageType:'/listview'});
        UIActions.setHeaderTitle({title:'가족위치'});
        try {
            UIActions.setSpinnerVisible(true);
            await ListViewActions.getInitialFlocs(usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);

    }
    render() {
         return (
            <FlocsContainer/>
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
)(ListViewFlocs);

