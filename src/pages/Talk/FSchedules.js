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

        try {
            const {usertoken} = this.props.loginUserInfo.toJS();
            await TalkActions.initial('date');
            await TalkActions.initial('activeDate');
            const { date } = this.props;
            const year = moment(date).local().format('YYYY');
            const month = moment(date).local().format('M');       
            //console.log('usertoken',usertoken);
            //console.log(year);
            //console.log(month);
            await TalkActions.getFschedulesList({year:year,month:month,usertoken:usertoken});

            TalkActions.setActiveDate(moment(date.format('YYYY-MM-DD')));
            //일정추가 - 선택한 날짜 셋팅
            TalkActions.setAddYear({form:'write',data:date.format('YYYY')});
            TalkActions.setAddMonth({form:'write',data:date.format('M')});
            TalkActions.setAddDay({form:'write',data:date.format('D')});
  

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
        loginUserInfo:state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        TalkActions : bindActionCreators(talkActions, dispatch)        
    })
)(FSchedules);

