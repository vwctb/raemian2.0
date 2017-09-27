import React, { Component } from 'react';
import Layout from 'components/Layout';
import { SubTitleWithIcon } from 'components/Control'
import {BtnSingle} from 'components/Shared';
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

    handleClickAdd = async() => {
        console.log('addFscheduleClick click');
        const { year, month, day, memo, repeat, alarm } = this.props.write.toJS();
        const { UIActions, TalkActions } = this.props;
        const { usertoken } = this.props.loginUserInfo; 

        const jsonData = {
            year:Number(year),
            month:Number(month),
            day:Number(day),
            memo:memo,
            repeat:repeat,
            alarm:alarm
        }

        const data = KEY.encryptedKey(JSON.stringify(jsonData));

        try {
            UIActions.setSpinnerVisible(true);
            await TalkActions.setFschedulesAdd({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }

        UIActions.setSpinnerVisible(false);
        const { success } = this.props.write.toJS();
        const { history } = this.context.router;
      
        if(success) {
            history.push('/talk/fschedules');
        }
        

    }

    useWakeUp = () => {
        console.log('useWakeUp');
    }

    handleChange = (e) => {
        const { TalkActions } = this.props;
        const { value } = e.target;
       
        TalkActions.changeInput({
            value,
            form: 'write'
        });
    }
    
    render() {
 
       const { handleChange , TalkActions} = this.props;
       const { year, month, day, memo, repeat } = this.props.write.toJS();
       const { use, hour, minute } = this.props.wakeup.toJS();
        return (
            <Layout>
                <Wrapper>
                    <SubTitleWithIcon
                        title = {'날짜 선택'}
                        icon = {'calendar'}
                        useCheck = {true}
                        check = {repeat}
                        form={'write'}
                        handleCheck = {TalkActions.checkboxAddReapt}
                    />
                     <CalendarSelectContainer
                        hour={hour}
                        minute={minute}
                        year={Number(year)}
                        month={Number(month)}
                        day={Number(day)}
                        disable={true}
                        form={'write'}
                        handleClickAddYear = {TalkActions.setAddYear}
                        handleClickAddMonth = {TalkActions.setAddMonth}
                        handleClickAddDay = {TalkActions.setAddDay}
                    />
                     <SubTitleWithIcon
                        title = {'일정 메모'}
                        icon = {'memo'}
                    />
                    <StyledTextarea
                        form={'write'}
                        onChange={this.handleChange}
                        value={memo}
                        minRows={3} 
                        maxRows={10} 
                        placeholder={`일정을 입력하세요.`}
                        onPaste={e=>e.preventDefault()}
                    />
                </Wrapper>
                <BtnSingle
                    onClickEvent={this.handleClickAdd}
                    name={'추 가'}
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
        write:state.talk.getIn(['fschedule','write']),
        loginUserInfo:state.auth.get('loginUserInfo')

    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        TalkActions: bindActionCreators(talkActions, dispatch)
    })
)(FSchedulesAddContainer);

