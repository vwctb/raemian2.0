import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {ControlSlider} from 'components/Control';
import {BtnSingle} from 'components/Shared';
import { bindActionCreators } from 'redux';
import * as controlActions from 'redux/modules/control';
import * as uiAction from 'redux/modules/ui';
import PropTypes from 'prop-types';
import * as KEY from 'lib/raemianAES';
import {BtnSingleModal, Modal, Dimmed} from 'components/Shared';



const Wrapper = styled.div``;

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

class ControlAircon extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    /*
    handleUpdate = async () => {
        const { ControlActions, controlitem } = this.props;
        const { id, status, name, configTemp, currentTemp } = controlitem.toJS();
        try {
            await ControlActions.updateairconCondition({
                id,
                control: {status,name,currentTemp,configTemp}
            });
        } catch(e) {
            console.log(e);
        }
        const{ history } = this.context.router;
        history.push('/control/aircon');
    }*/

    handleChange = (configTemp) =>{
        const { UIActions } = this.props;
        UIActions.setControlConfigTemp({configTemp});
    }

    handleClick = () => {
        const { UIActions } = this.props;
        const { status } = this.props.controlitem.toJS();
        let setStatus = (status === 'on') ? 'off': 'on';
        UIActions.setControlStatus({setStatus});
    }

    handleUpdate = async ()=>{
        const { ControlActions, controlitem, UIActions, visible } = this.props;
        const { id, status, name, configTemp, currentTemp } = controlitem.toJS();
        const jsonDataControl = {
            id:id,
            configTemp:configTemp
        }

        const jsonDataOnoff = {
            id:id,
            status:status
        }
        const dataControl = KEY.encryptedKey(JSON.stringify(jsonDataControl));
        const dataOnoff = KEY.encryptedKey(JSON.stringify(jsonDataOnoff));
        const { usertoken } = this.props.loginUserInfo.toJS();
        UIActions.setSpinnerVisible(true);
        console.log('jsonDataControl: ',jsonDataControl);
        console.log('jsonDataOnoff: ',jsonDataOnoff);
        try {
            await ControlActions.setControlAirconOnOff({data:dataControl,usertoken:usertoken});
            await ControlActions.setControlAirconOnOff({data:dataOnoff,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }

        const data = 'all';
        try {
            await ControlActions.getInitialAircons({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }


        const{ history } = this.context.router;
        history.push('/control/aircon');
        /*
        UIActions.setModalVisible(!visible);
        setTimeout(() => {
            modalSW = true;
        },500);
        */

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
        const {controlitem} = this.props;
        const {handleUpdate,handleClick,handleChange,visible} = this;
        return (
            <Wrapper>
                <ControlSlider 
                    controlitem ={controlitem}
                    handleClick = {handleClick}
                    controlType = {'aircon'}
                    handleChange={handleChange}
                />
                <BtnSingle
                    onClickEvent={handleUpdate}
                    name={'확인'}
                />
                <Modal visible={visible} onHide={this.onHide} title={'알림'}>                
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
                <Dimmed visible={visible}/>
            </Wrapper>
        )
    };
};

export default connect(
    (state) => ({
        controlitem: state.ui.getIn(['control','nowSelectItem']),
        loginUserInfo: state.auth.get('loginUserInfo'),
        visible: state.ui.getIn(['modal','visible'])

    }),
    (dispatch) => ({
        ControlActions: bindActionCreators(controlActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(ControlAircon);

