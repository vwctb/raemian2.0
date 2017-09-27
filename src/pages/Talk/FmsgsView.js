import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as talkActions from 'redux/modules/talk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FmsgsViewContainer } from 'containers/Talk';


class FmsgsView extends Component {
    async componentDidMount() {
        const { UIActions,TalkActions,match } = this.props;
        const { usertoken } = this.props.loginUserInfo;
        UIActions.setPageType({pageType:'/talk/fmsgs'});
        UIActions.setHeaderTitle({title:'가족메시지'});
        UIActions.setSpinnerVisible(true);
        try {
            await TalkActions.getFmsgsDetailView(match.params.seq,usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }
    render() {
         return (
            <FmsgsViewContainer/>
        )
    };
};

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        TalkActions : bindActionCreators(talkActions, dispatch)        
    })
)(FmsgsView);

