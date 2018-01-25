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
import {BtnSingleModal, Modal, Dimmed} from 'components/Shared';

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    height:100%;
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
const MainNotice = styled.div`
    width: 100%;
    font-size:1rem;
    text-align:center;
    padding: 1.5rem 1rem 1.5rem 1rem;
    line-height: 1.6rem;
    color:#49433c;
`;

let modalMsg='';
let modalSW=true;
class FSchedulesAddContainer extends Component {
    static contextTypes = {
        router: PropTypes.object
	}

    handleClickAdd = async() => {
        console.log('addFscheduleClick click');
        const { year, month, day, memo, repeat, alarm } = this.props.write.toJS();
        const { UIActions, TalkActions, visible } = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS(); 

        const jsonData = {
            year:Number(year),
            month:Number(month),
            day:Number(day),
            memo:memo,
            repeat:repeat,
            alarm:alarm
        }
        console.log('jsonData:',jsonData);
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
        }else{
            modalMsg = '등록을 실패하였습니다.';
            UIActions.setModalVisible(!visible);
            setTimeout(() => {
                modalSW = true;
            },500);
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
    
    onHide = () =>{
        const { UIActions,visible } = this.props;
        UIActions.setModalVisible(!visible);
        setTimeout(() => {
            modalSW = true;
        },500);
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


                <Modal visible={this.props.visible} onHide={this.onHide} title={'알림'}>                
                    <div>
                        <MainNotice>
                           { modalMsg }
                        </MainNotice>
                        
                        <BtnSingleModal
                            onClickEvent = {this.onHide}
                            name = {'확인'}
                        />
                    </div>
                </Modal>
                <Dimmed visible={this.props.visible}/>

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
        loginUserInfo:state.auth.get('loginUserInfo'),
        visible: state.ui.getIn(['modal','visible'])

    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        TalkActions: bindActionCreators(talkActions, dispatch)
    })
)(FSchedulesAddContainer);

