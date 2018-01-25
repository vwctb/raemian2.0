import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as talkActions from 'redux/modules/talk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FSchedulesContainer } from 'containers/Talk';
import moment from 'moment';

class FSchedules extends Component {
    async componentDidMount() {
        const { UIActions,TalkActions} = this.props;
        UIActions.setPageType({pageType:'/talk'});
        UIActions.setHeaderTitle({title:'가족일정'});
        const {usertoken} = this.props.loginUserInfo.toJS();
        try {
            await TalkActions.initial('date');
            await TalkActions.initial('activeDate');
            const { date } = this.props;
        
            TalkActions.setActiveDate(moment(date.format('YYYY-MM-DD')));
            //일정추가 - 선택한 날짜 셋팅
            TalkActions.setAddYear({form:'write',data:date.format('YYYY')});
            TalkActions.setAddMonth({form:'write',data:date.format('M')}); 
            TalkActions.setAddDay({form:'write',data:date.format('D')}); 
            await TalkActions.getFschedulesList({year:date.format('YYYY'),month:date.format('M'),usertoken:usertoken});
            console.log('listArray: ', this.props.listArray);
  
        } catch(e) {
            console.log(e);
        }
    }
    
    render() {
         return (
            <FSchedulesContainer/>
        )
    };
};

export default connect(
    (state) => ({
        date:state.talk.get('date'),
        loginUserInfo:state.auth.get('loginUserInfo'),
        listArray: state.talk.getIn(['fschedule','list'])
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        TalkActions : bindActionCreators(talkActions, dispatch)        
    })
)(FSchedules);

