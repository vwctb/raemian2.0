import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {GasItem} from 'components/Control';
import {BtnSingle} from 'components/Shared';
import { bindActionCreators } from 'redux';
import * as controlActions from 'redux/modules/control';
import * as uiAction from 'redux/modules/ui';
import PropTypes from 'prop-types';
import * as KEY from 'lib/raemianAES';

const Wrapper = styled.div`
    width:100%;
    height:100%;
    background:#f7f6ef;
    display:fixed;
`;

class ControlHeating extends Component {
    static contextTypes = {
        router: PropTypes.object
	}
 
 
    handleClick = async ()=>{
        const { ControlActions, UIActions,gas_id } = this.props;

        const jsonData = {
            id:gas_id,
            status:'off'
        }
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
 
        const {usertoken} = this.props.loginUserInfo.toJS();
        UIActions.setSpinnerVisible(true);
        try {
            await ControlActions.setGasStatus({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
        
    }
    

    render() {
        const {gas_onoff} = this.props;

        return (
            <Wrapper>
                <GasItem onoff={gas_onoff} />

                {
                    gas_onoff === 'on' ? 
                    <BtnSingle
                        onClickEvent={this.handleClick}
                        name={'잠그기'}
                    /> : ''
                }
            </Wrapper>
        )
    };
};

export default connect(
    (state) => ({
        gas_onoff: state.control.getIn(['data_gas',0,'status']),
        gas_id: state.control.getIn(['data_gas',0,'id']),
        loginUserInfo:state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        ControlActions: bindActionCreators(controlActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(ControlHeating);

