
import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as listviewActions from 'redux/modules/listview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CCTVContainer } from 'containers/ListView';

class ListViewCCTV extends Component {
    async componentDidMount() {
        const { UIActions, ListViewActions, auth} = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        UIActions.setPageType({pageType:'/listview'});
        UIActions.setHeaderTitle({title:'CCTV'});
        try {
            UIActions.setSpinnerVisible(true);
            await ListViewActions.getInitialCCTV(usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }
    render() {
         return (
            <CCTVContainer/>
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
)(ListViewCCTV);

