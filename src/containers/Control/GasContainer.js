import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {GasItem} from 'components/Control';
import {BtnSingle} from 'components/Shared';
import { bindActionCreators } from 'redux';
import * as controlActions from 'redux/modules/control';
import * as uiAction from 'redux/modules/ui';
import PropTypes from 'prop-types';

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
    handleUpdate = () => {
        const { ControlActions, heatingitem } = this.props;
        const { id, status, name, configTemp, currentTemp } = heatingitem.toJS();
        ControlActions.updateHeatingCondition({
            id,
            control: {status,name,currentTemp,configTemp}
        });
        this.initHeating();
    }

    async initHeating () {
        const { ControlActions } = this.props;
        try {
          await  ControlActions.getInitialHeatings();
        } catch(e) {
            console.log(e);
        }
        const{ history } = this.context.router;
        history.push('/control/heating');
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

    render() {
        const {gas_onoff,ControlActions} = this.props;
        const {handleUpdate} = this;
        return (
            <Wrapper>
                <GasItem onoff={gas_onoff} />

                {
                    gas_onoff === 'on' ? 
                    <BtnSingle
                        onClickEvent={()=>{ControlActions.updateGasStatus()}}
                        name={'잠그기'}
                    /> : ''
                }
            </Wrapper>
        )
    };
};

export default connect(
    (state) => ({
        gas_onoff: state.control.getIn(['data_gas','status'])
    }),
    (dispatch) => ({
        ControlActions: bindActionCreators(controlActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(ControlHeating);

