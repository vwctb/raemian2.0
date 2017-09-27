import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as listviewActions from 'redux/modules/listview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PlocsContainer } from 'containers/ListView';

class ListViewPlocs extends Component {
    async componentDidMount() {
        const { UIActions, ListViewActions } = this.props;
        UIActions.setPageType({pageType:'/listview'});
        UIActions.setHeaderTitle({title:'가족위치'});

        const {usertoken} = this.props.loginUserInfo;
        try {
            UIActions.setSpinnerVisible(true);
            await ListViewActions.getInitialPlocs(usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }
    render() {
         return (
            <PlocsContainer/>
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
)(ListViewPlocs);

