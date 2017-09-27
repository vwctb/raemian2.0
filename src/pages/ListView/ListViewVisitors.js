import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as listviewlActions from 'redux/modules/listview';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { VisitorsContainer } from 'containers/ListView';

class ControlAircon extends Component {
    async componentDidMount() {
        const { UIActions, ListViewActions } = this.props;
        const { usertoken } = this.props.loginUserInfo;
        UIActions.setPageType({pageType:'/listview'});
        UIActions.setHeaderTitle({title:'방문자'});
        try {
            UIActions.setSpinnerVisible(true);
            await ListViewActions.getInitialVisitors(usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }
    render() {
         return (
            <VisitorsContainer/>
        )
    };
};

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ListViewActions : bindActionCreators(listviewlActions, dispatch),
        
    })
)(ControlAircon);

