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

class ControlHeating extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    /*
    handleUpdate = async () => {
        const { ControlActions, heatingitem } = this.props;
        const { id, status, name, configTemp, currentTemp } = heatingitem.toJS();
        try {
            await ControlActions.updateHeatingCondition({
                id,
                control: {status,name,currentTemp,configTemp}
            });
        } catch(e) {
            console.log(e);
        }
        const{ history } = this.context.router;
        history.push('/control/heating');
    }*/

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

    handleUpdate = async ()=>{
        const { ControlActions, heatingitem, UIActions, visible } = this.props;
        const { id, status, name, configTemp, currentTemp } = heatingitem.toJS();
        const jsonData = {
            id,
            control: {status,name,currentTemp,configTemp}
        }

        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        const { usertoken } = this.props.loginUserInfo.toJS();
        UIActions.setSpinnerVisible(true);

        try {
            await ControlActions.setControlHeatingOnOff({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }

        try {
            await  ControlActions.getInitialHeatings();
        } catch(e) {
              console.log(e);
        }

        const{ history } = this.context.router;
        history.push('/control/heating');
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
        const {heatingitem} = this.props;
        const {handleUpdate,handleClick,handleChange,visible} = this;
        return (
            <Wrapper>
                <ControlSlider 
                    heatingitem ={heatingitem}
                    handleClick = {handleClick}
                    controlType = {'heating'}
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
        heatingitem: state.ui.getIn(['control','nowSelectItem']),
        loginUserInfo: state.auth.get('loginUserInfo'),
        visible: state.ui.getIn(['modal','visible'])

    }),
    (dispatch) => ({
        ControlActions: bindActionCreators(controlActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(ControlHeating);

