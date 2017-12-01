import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ControlItemList } from 'components/Control';
import { bindActionCreators } from 'redux';
import { BtnDouble } from 'components/Shared';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';
import PropTypes from 'prop-types';
import * as KEY from 'lib/raemianAES';
import {BtnSingleModal, Modal, Dimmed} from 'components/Shared';

const Wrapper = styled.div`
    /* 레이아웃 */
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    top: 3.5rem;
    z-index: 1;
    overflow:auto;
    /* 색상 */
    background: #f7f6ef;
    color: #49433c;
    box-shadow: 0 -3px 6px rgba(0,0,0,0.10);
    /* 폰트 */
    font-size: 1.3rem;
`;

const LightGasControl = styled.div`
    width: 100%;
    height:5rem;
    background:white;
    position:fixed;
    display: flex;
    justify-content:center;
    align-items:center;
    justify-content: space-around;
    bottom:4rem;
    z-index:10;
`;

const SwitchBtnSpace = styled.div`
    width: 10rem;
    height: 2.5rem;
`;

const SwitchBtn = styled.div`
    width: 5rem;
    height: 2.5rem;
    line-height:2.5rem;
    float: left;
    text-align: center;
    color:${props => (props.check) ? '#ffffff' : '#524c45'};
    font-size:0.9rem;
    background:${props => (props.check) ? '#50bbcd' : 'linear-gradient( to bottom,white,#e8e9e9)'};
    border:${props => (!props.check) && '1px solid #d5d5d6'};
    box-shadow: ${props => (props.check) && 'inset 1px 2px 3px #3e8793'};
    & + &{
        border-left:0px; 
    }
    :first-child{
        border-top-left-radius:0.3rem;
        border-bottom-left-radius:0.3rem;
    }
    :last-child{
        border-top-right-radius:0.3rem;
        border-bottom-right-radius:0.3rem;
    }
    float:left;
`;
const MainNotice = styled.div`
    width: 100%;
    text-align:center;
    font-size:1rem;
    padding: 1.5rem 1rem 1.5rem 1rem;
    line-height: 1.6rem;
    color:#49433c;
`;

SwitchBtn.propTypes = {
    check : PropTypes.bool
}


const Title = styled.div`
    font-size:1rem;
    color:#49433c;
`;

let modalMsg='';
let modalSW=true;
class LightContainer extends Component {


    handleControlAll = async (status)=>{
        const jsonData = {
            id:'all',
            status:status
        }
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        const { ControlActions, UIActions } = this.props;
        const {usertoken} = this.props.loginUserInfo.toJS();
        UIActions.setSpinnerVisible(true);
        try {
            await ControlActions.setControlLightOnOff({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
        //ControlActions.setSpinnerVisible(false);
    }

    handleClickBachOnOff = async (value)=>{
        const { ControlActions, UIActions } = this.props;
        const {usertoken} = this.props.loginUserInfo.toJS();
        const jsonData = {
            status:value
        }
        const data = KEY.encryptedKey(JSON.stringify(jsonData));

        UIActions.setSpinnerVisible(true);
        try {
            await ControlActions.setBachOff({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }

        if(this.props.batchSuccess){
            try {
                await ControlActions.getInitialBatch(usertoken);
            } catch(e) {
                console.log(e);
            }
          

            UIActions.setSpinnerVisible(false);
        }

    
    }

    handleControlClick = async (value)=>{
        const { UIActions, ControlActions ,visible } = this.props;
        let { id , status, name } = value.toJS();
        if(status === 'on') {
            status = 'off';
        }else if(status ==='off'){
            status = 'on';
        }else{
            status = 'err';
            modalMsg = '장치를 확인해주시기 바랍니다.'
            UIActions.setModalVisible(!visible);
            setTimeout(() => {
                modalSW = true;
            },500);


            return;
        }
        const jsonData = {
            id:id,
            status:status
        }
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        const {usertoken} = this.props.loginUserInfo.toJS();
        UIActions.setSpinnerVisible(true);

        try {
            await ControlActions.setControlLightOnOff({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }

        if(!this.props.success){
            UIActions.setSpinnerVisible(false);
           
            modalMsg = '장치 제어를 실패하였습니다';
            UIActions.setModalVisible(!visible);
            setTimeout(() => {
                modalSW = true;
            },500);

        }

        //UIActions.setSpinnerVisible(false);
    }

    onHide = () =>{
        const { UIActions,visible } = this.props;
        UIActions.setModalVisible(!visible);
        setTimeout(() => {
            modalSW = true;
        },500);
    }


    render() {
        const { controlItemListArray,batchoff ,visible } = this.props;
        return (
            <Wrapper>
                    <ControlItemList
                        controlItemListArray={controlItemListArray}
                        itemClick = {this.handleControlClick}
                        controlType = {'light'}
                    />
                    <LightGasControl>
                        <Title>조명, 가스 일괄차단</Title>
                        <SwitchBtnSpace>
                            <SwitchBtn check={batchoff === 'on'} onClick={()=>this.handleClickBachOnOff('on')}>설정</SwitchBtn>
                            <SwitchBtn check={batchoff === 'off'} onClick={()=>this.handleClickBachOnOff('off')}>해제</SwitchBtn>
                        </SwitchBtnSpace>
                    </LightGasControl>
                    <BtnDouble
                        name1={'전체켜기'}
                        onClickEvent1={()=>this.handleControlAll('on')}
                        color1={'50bbcd'} 
                        name2={'전체끄기'}
                        onClickEvent2={()=>this.handleControlAll('off')}
                        color2={'cccbca'} 
                    />


                    <Modal visible={visible} onHide={this.onHide} title={'알림'}>                
                    <div>
                        <MainNotice>
                           { modalMsg }
                        </MainNotice>
                        
                        <BtnSingleModal
                            onClickEvent={this.onHide}
                            name={'확인'}
                        />
                    </div>
                </Modal>
                <Dimmed visible={visible}/>


                       
            </Wrapper>
        );
    }
}


export default connect(
    (state) => ({
        controlItemListArray: state.control.get('data_lights'),
        batchoff: state.control.get('batchoff'),
        loginUserInfo:state.auth.get('loginUserInfo'),
        visible: state.ui.getIn(['modal','visible']),
        success: state.control.getIn(['success','control_light_success']),
        batchSuccess: state.control.getIn(['success','control_batch_success'])

    }),
    (dispatch) => ({
         UIActions: bindActionCreators(uiActions, dispatch),
         ControlActions: bindActionCreators(controlActions, dispatch),
    })
)(LightContainer);