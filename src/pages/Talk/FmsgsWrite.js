import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as talkActions from 'redux/modules/talk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FmsgsWriteContainer } from 'containers/Talk';


class FmsgsWrite extends Component {
    async componentDidMount() {
        const { UIActions,TalkActions} = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        
        UIActions.setPageType({pageType:'/talk/fmsgs'});
        UIActions.setHeaderTitle({title:'새 메시지 작성'});
        UIActions.setSpinnerVisible(true);
        TalkActions.setInitalFmsgsWrite();
        
        try {
            await TalkActions.initial('fmsgs');
            await TalkActions.getFmsgsFamilysList(usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
        
    }
    render() {
         return (
            <FmsgsWriteContainer/>
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
)(FmsgsWrite);

