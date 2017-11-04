import React, { Component } from 'react';
import Layout from 'components/Layout';
import { SubTitleWithIcon } from 'components/Control'
import {BtnDouble} from 'components/Shared';
import * as uiActions from 'redux/modules/ui';
import * as talkActions from 'redux/modules/talk';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {CalendarSelectContainer} from 'containers/Shared';
import Textarea from 'react-textarea-autosize';
import * as KEY from 'lib/raemianAES';

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 4rem;
    background:white;
    top: 3.5rem;
    z-index: 0;
    color:white;
    font-size: 1rem;
    overflow-y: auto;
`;

const StyledTextarea = styled(Textarea)`

    width: 100%;
    height: 100%;
    padding:1rem;
    background: white;
    border: none;
    border-top: 1px solid #e4e0d7;
    resize: none;
    outline: none;
    font-size: 1rem;
    font-weight: 300;
    color: #49433c;
    ::placeholder {
        color: gray;
    }

`;
class FSchedulesAddContainer extends Component {
    static contextTypes = {
        router: PropTypes.object
	}

    addFamilyClick = () => {
        console.log('addFamilyClick click');
    }

    useWakeUp = () => {
        console.log('useWakeUp');
    }

    handleClickUpdate = async () => {
        const { seq, year, month, day, memo, repeat,alarm } = this.props.detail.toJS();
        const jsonData = {
            seq:seq,
            year:year,
            month:month,
            day:day, 
            memo:memo, 
            repeat:repeat,
            alarm:alarm
        }
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        const { TalkActions, UIActions } = this.props;
        const {usertoken} = this.props.loginUserInfo.toJS();
        UIActions.setSpinnerVisible(true);
        try {
            await TalkActions.getFschedulesUpdate({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
        const {updateSuccess} = this.props;
        if(updateSuccess){
            const{ history } = this.context.router;
            history.push('/talk/fschedules');
        }
    }

    handleClickDelete = async () => {
        const { seq } = this.props.detail.toJS();
        const jsonData = {
            seq:seq
        }
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        const { TalkActions, UIActions } = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        UIActions.setSpinnerVisible(true);
        console.log('data:',data);
        try {
            await TalkActions.getFschedulesDelete({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }

        UIActions.setSpinnerVisible(false);
        const { deleteSuccess } = this.props;
        if(deleteSuccess){
            const{ history } = this.context.router;
            history.push('/talk/fschedules');
        }

    }

    handleChange = (e) => {
        const { TalkActions } = this.props;
        const { value } = e.target;
       
        TalkActions.changeInput({
            value,
            form: 'detail'
        });
    }
    
    render() {
 
       const { handleChange , TalkActions,} = this.props;
       const { year, month, day, memo, repeat } = this.props.detail.toJS();
       const { use, hour, minute } = this.props.wakeup.toJS();
        return (
            <Layout>
                <Wrapper>
                    <SubTitleWithIcon
                        title = {'날짜 선택'}
                        icon = {'calendar'}
                        form={'detail'}
                        useCheck = {true}
                        check = {repeat}
                        handleCheck = {TalkActions.checkboxAddReapt}
                    />
                     <CalendarSelectContainer
                        disable={false}
                        hour={hour}
                        minute={minute}
                        year={Number(year)}
                        month={Number(month)}
                        day={Number(day)}
                        form={'detail'}
                        handleClickAddYear = {TalkActions.setAddYear}
                        handleClickAddMonth = {TalkActions.setAddMonth}
                        handleClickAddDay = {TalkActions.setAddDay}
                    />
                     <SubTitleWithIcon
                        title = {'일정 메모'}
                        icon = {'memo'}
                    />
                    <StyledTextarea 
                        onChange={this.handleChange}
                        value={memo}
                        minRows={3} 
                        maxRows={10} 
                        form={'detail'}
                        placeholder={`일정을 입력하세요.`}
                        onPaste={e=>e.preventDefault()}
                    />
                </Wrapper>
                <BtnDouble
                    onClickEvent1={this.handleClickUpdate}
                    onClickEvent2={this.handleClickDelete}
                    color1={'50bbcd'}
                    color2={'ff8062'}
                    fcolor2={'ffffff'} 
                    name1={'수 정'}
                    name2={'삭 제'}
                />
            </Layout>
        )
    };
};

export default connect(
    (state) => ({
        checkBoxListArrayLights: state.control.getIn(['reserveControl','wakeup','lights']),
        checkBoxListArrayDayofWeek: state.control.getIn(['reserveControl','wakeup','dayofweek']),
        wakeup: state.control.getIn(['reserveControl','wakeup']),
        detail:state.talk.getIn(['fschedule','detail']),
        updateSuccess:state.talk.getIn(['fschedule','update']),
        deleteSuccess:state.talk.getIn(['fschedule','delete']),
        loginUserInfo:state.auth.get('loginUserInfo')

    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        TalkActions: bindActionCreators(talkActions, dispatch)
    })
)(FSchedulesAddContainer);

