import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as talkActions from 'redux/modules/talk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FmsgsContainer } from 'containers/Talk';

class Fmsgs extends Component {
    async componentDidMount() {
        const { UIActions, TalkActions } = this.props;
        const { usertoken } = this.props.loginUserInfo;
        UIActions.setPageType({pageType:'/talk'});
        UIActions.setHeaderTitle({title:'가족메시지'});

        UIActions.setSpinnerVisible(true);
        try {
            await TalkActions.getFmsgsList(usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }
    render() {
         return (
            <FmsgsContainer/>
        )
    };
};

export default connect(
    (state) => ({
        loginUserInfo:state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        TalkActions : bindActionCreators(talkActions, dispatch)        
    })
)(Fmsgs);

