import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as talkActions from 'redux/modules/talk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FSchedulesUpdateContainer } from 'containers/Talk';

class FSchedulesUpdate extends Component {
    async componentDidMount() {
        const { UIActions,TalkActions,match} = this.props;
        UIActions.setPageType({pageType:'/talk/fschedules'});
        UIActions.setHeaderTitle({title:'일정 관리'});

        console.log('seq:',match.params.seq);
        const { usertoken } = this.props.loginUserInfo.toJS();
        try {
            UIActions.setSpinnerVisible(true);
            await TalkActions.getFschedulesDetail(match.params.seq,usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    
    }

    render() {
         return (
            <FSchedulesUpdateContainer/>
        )
    };
};

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        TalkActions: bindActionCreators(talkActions, dispatch),
    })
)(FSchedulesUpdate);

