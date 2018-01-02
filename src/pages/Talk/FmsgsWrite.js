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
       
        console.log('this.props.receiverkey:',this.props.receiverkey);
        try {
            if(this.props.receiverkey.size < 1){
                await TalkActions.setInitalFmsgsWrite();
                //await TalkActions.initial('fmsgs');
            }

            await TalkActions.getFmsgsFamilysList(usertoken);
        }catch(e){
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }


    componentWillUnmount(){
        const {TalkActions} = this.props;
        TalkActions.setInitalFmsgsWrite();
    }

    render() {
         return (
            <FmsgsWriteContainer/>
        )
    };
};

export default connect(
    (state) => ({
        receiverkey: state.talk.getIn(['fmsgs','write','receiverkey']),
        loginUserInfo: state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        TalkActions : bindActionCreators(talkActions, dispatch)        
    })
)(FmsgsWrite);

