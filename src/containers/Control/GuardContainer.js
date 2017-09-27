import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {GuardItem} from 'components/Control';
import {BtnSingle} from 'components/Shared';
import { bindActionCreators } from 'redux';
import * as controlActions from 'redux/modules/control';
import * as uiAction from 'redux/modules/ui';
import PropTypes from 'prop-types';
import {BtnDoubleModal, Modal, Dimmed} from 'components/Shared';
import * as Image from 'img';

const Wrapper = styled.div`
    width:100%;
    height:100%;
    background:#f7f6ef;
    display:fixed;
`;

const OrangeText = styled.span`
    color:#ff7e5f;
`;

const ModalImage = styled.div`
    width:100%;
    height:4rem;
    font-size: 1rem;
    background-image: url(${Image.Icon_Guard_Modal});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 80%;
    margin-top:1.3rem;
`;


const MainNotice = styled.div`
    width: 100%;
    text-align:center;
    padding: 1.5rem 1rem 1.5rem 1rem;
    line-height: 1.6rem;
    color:#49433c;
`;

const SubNotice = styled.div`
    width: 100%;
    padding: 1.5rem;
    line-height: 1.2rem;
    font-size:0.8rem;
    text-align:center;
    color:#757371;
`;

let modalSW=true;
let title = '';
let modalContent = '';

//
class ControlHeating extends Component {
    static contextTypes = {
        router: PropTypes.object
	}

    handleChange = (configTemp) =>{
        const { UIActions } = this.props;
        UIActions.setControlConfigTemp({configTemp});
    }

    handleClick = () => {
        const { UIActions } = this.props;
        const { status } = this.props.heatingitem.toJS();
        let setStatus = (status === 'on') ? 'off': 'on';
        UIActions.setControlStatus({setStatus});
    }

    handleClickModalOpen = () =>{
        const { UIActions,visible } = this.props;
        title = '외출방법 설정';
        modalContent= 'init';

        if(!modalSW) return; //반복 모달 호출현상 방지
        UIActions.setModalVisible(!visible);
        modalSW = false;
    }

    handleClickSetting = () =>{
        const {ControlActions,UIActions,visible } = this.props;
        ControlActions.updateGuardStatus(1);
        UIActions.setModalVisible(!visible);
        setTimeout(() => {
            modalSW = true;
        },500);
    }
    
    onHide = () =>{
        const { UIActions,visible } = this.props;
        UIActions.setModalVisible(!visible);
        setTimeout(() => {
            modalSW = true;
        },500);
    }

    render() {
        const {guard, visible} = this.props;

        return (
            <Wrapper>

                
                <GuardItem guard={guard} />

                {    
                    guard === 0 && 
                    <BtnSingle
                        name={'외출 방법 설정'}
                        onClickEvent={()=>{this.handleClickModalOpen()}} 
                        color={'ff8062'} 
                    />
                }

                <Modal visible={visible} onHide={this.onHide} title={title}>
                    
                    {
                    modalContent === 'init' ? 
                    <div>

                        <ModalImage/>
                        <MainNotice>
                            월패드에서 설정한<br/>
                            '퇴실시간' 경과 후 설정이 적용됩니다.<br/>
                            외출 방범을 설정하시겠습니까?<br/>
                        </MainNotice>

                        <BtnDoubleModal
                            onClickEvent2={this.onHide}
                            onClickEvent1={this.handleClickSetting}
                            name1={'설정'}
                            name2={'취소'}
                        />
                    </div>
                    :
                    <div>
                       
                      
                    </div>


                    }

                </Modal>
                <Dimmed visible={visible}/>
            </Wrapper>
        )
    };
};

export default connect(
    (state) => ({
        visible: state.ui.getIn(['modal','visible']),
        guard: state.control.getIn(['data_guard','status'])
    }),
    (dispatch) => ({
        ControlActions: bindActionCreators(controlActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(ControlHeating);

