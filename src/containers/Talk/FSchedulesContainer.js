import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as talkActions from 'redux/modules/talk';
import * as uiAction from 'redux/modules/ui';
import moment from 'moment';
import { Calendar,Month } from 'react-calendar';
import './calendar-theme.css';
import styled from 'styled-components';
import {BtnSingle} from 'components/Shared'
import * as SvgIcon from 'lib/icon_svg'
import { Map,List, fromJS } from 'immutable';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    position:absolute;
    width:100%;
    top:3.5rem;
    bottom: 0;
    background:#f7f6ef;
    overflow-y:auto;
`;

const TitleBar = styled.div`
    width:100%;
    height:3.5rem;
    background: #f7f6ef;
    border-bottom:1px solid #d7d1c4;
    display: flex;
    align-items: center;
    padding: 0 1rem 0 1rem;
    justify-content: space-between;
`;

const Title = styled.div`
    font-size: 0.9rem;
    line-height: 3rem;
`;

const IconNext = styled.div`

    font-size: 0px;
`;


const ListDiv = styled.div`
    width:100%;
    height:3rem;
    border-bottom:1px solid #d7d1c4;
    position: relative;
    background: white;
    cursor: pointer;
`;

// 실제 내용이 들어가는 부분입니다.
const Contents = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content: space-between;
    height:3rem;
    padding-left:1.3rem;
    width:100%;
    /* 텍스트가 길어지면 새 줄 생성; 박스 밖의 것은 숨김 */
`;

const Text = styled.div`
    height:1.8rem;
    line-height:1.8rem;
    font-size: 0.9rem;
    color:#49433c;
`;

const Date = styled.div`
    height:1.8rem;
    width:4.5rem;
    line-height:1.8rem;
    font-size: 0.9rem;
    margin-right:0.5rem;
    color:#50bbcd;
`;

const Button = styled.div`
    height:3.5rem;
    width:3.5rem;
    display:flex;
    flex-flow: row wrap;
    justify-content:center;
    align-items:center;
    font-size: 0.9rem;
`;

const SmartControl = styled.div`
    display:flex;
    flex-flow: row wrap;
    font-size: 0.9rem;
`;
const BtnTopSpace = styled.div`
    display:flex;
    width:100%;
    z-index:10;
    flex-flow: nowrap;
    justify-content:space-between;
    align-items:center;
    font-size: 0.9rem;
    position:absolute;
    top:0;

`;
let mode;
let schedule;
class FSchedulesContainer extends Component {

    static contextTypes = {
        router: PropTypes.object
    }


    HandleClickAddSchedule = () => {
        const{ history } = this.context.router;
        history.push('/talk/fschedules/add');
    }

    HandleClickUpdateSchedule = (seq) => {
        const{ history } = this.context.router;
        history.push('/talk/fschedules/update/'+seq);

    }

    HandleClickPreMonth = () =>{
        const {TalkActions,date} = this.props;
        TalkActions.setDate( date.clone().subtract(1, 'month'));
        this.loadDataList(date.clone().subtract(1, 'month'));
    }

    HandleClickNextMonth = () =>{
        const {TalkActions,date} = this.props;
        TalkActions.setDate( date.clone().add(1, 'month'));
        this.loadDataList(date.clone().add(1, 'month'));
    }

    async loadDataList (date){
        const {TalkActions,UIActions} = this.props;
        UIActions.setSpinnerVisible(true);
        console.log(date);
        try {
            const {usertoken} = this.props.loginUserInfo.toJS();
            const year = moment(date).local().format('YYYY');
            const month = moment(date).local().format('M');       
            console.log('usertoken',usertoken);
            console.log(year);
            console.log(month);
            await TalkActions.getFschedulesList({year:year,month:month,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }

    setMode = () => {
        const {listArray,TalkActions,date,activeDate} = this.props;
        let modeData = listArray.map(
            dateList => ({
                date:moment(dateList.get('year')+'-'+dateList.get('month')+'-'+dateList.get('day')),
                classNames: [ 'event' ],
                component: [ 'day' ]
                }
            )
    );

    modeData = modeData.withMutations(map => {
        map.push({
            component: ['day'],
            events: {
                onClick: (date) => {
                    TalkActions.setActiveDate(moment(date.format('YYYY-MM-DD')));
                    //일정추가 - 선택한 날짜 셋팅
                    TalkActions.setAddYear({form:'write',data:date.format('YYYY')});
                    TalkActions.setAddMonth({form:'write',data:date.format('M')});
                    TalkActions.setAddDay({form:'write',data:date.format('D')});
                }
            }
        }).push({
            date: moment(),
            classNames: [ 'current' ],
            component: [ 'day' ]
        }).push({
            date: activeDate,
            classNames: [ 'active' ],
            component: [ 'day' ]
        });
      });
   return modeData.toJS();

  }
render() {
        const { date, listArray, activeDate }= this.props;
        const schedule = listArray.map(
            dateList => (
                (activeDate && activeDate.toJSON() === moment(dateList.get('year')+'-'+dateList.get('month')+'-'+dateList.get('day')).toJSON()) &&
                <ListDiv
                    key={dateList.get('seq')}
                    onClick={()=>this.HandleClickUpdateSchedule(dateList.get('seq'))}
                >
                    <Contents>
                        <SmartControl>
                            <Date>{dateList.get('month')+'월 '+dateList.get('day')+'일'}</Date>
                            <Text>{dateList.get('memo')}</Text>
                        </SmartControl>
                        <Button>
                            <IconNext
                                dangerouslySetInnerHTML ={{__html : SvgIcon.getInitialSvgIcon('arrowRight')}}
                            />
                        </Button>
                    </Contents> 
                </ListDiv>
            )
        );
        return (
            <Wrapper>
              <BtnTopSpace>
                <Button
                        onClick={this.HandleClickPreMonth}
                >
                    <IconNext
                        dangerouslySetInnerHTML ={{__html : SvgIcon.getInitialSvgIcon('arrowLeft')}}
                    />
                </Button>
                <Button
                    onClick={this.HandleClickNextMonth}
                >
                    <IconNext
                        dangerouslySetInnerHTML ={{__html : SvgIcon.getInitialSvgIcon('arrowRight')}}
                    />
                </Button>
              </BtnTopSpace>
              <Month 
                date={date} 
                monthNames={true}
                monthNameFormat={'YYYY년 M월'}
                size={22}
                weekdayNames={false}
                mods={this.setMode()}
              />

              <TitleBar>
                    <Title>일정 목록</Title>
               </TitleBar>
                {schedule}

              <BtnSingle
                name={'일정추가'}
                onClickEvent={this.HandleClickAddSchedule}
              />

          </Wrapper>
        )
    };
};

export default connect(
    (state) => ({
        listArray: state.talk.getIn(['fschedule','list']),
        write: state.talk.getIn(['fschedule','write']),
        detail: state.talk.getIn(['fschedule','detail']),
        loginUserInfo: state.auth.get('loginUserInfo'),
        date: state.talk.get('date'),
        activeDate: state.talk.get('activeDate')
    }),
    (dispatch) => ({
        TalkActions: bindActionCreators(talkActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(FSchedulesContainer);

