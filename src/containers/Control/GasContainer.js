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
 
    handleClick = () => {
        const { UIActions } = this.props;
        const { status } = this.props.heatingitem.toJS();
        let setStatus = (status === 'on') ? 'off': 'on';
      //  UIActions.setControlStatus({setStatus});
    }

    render() {
        const {gas_onoff,ControlActions} = this.props;

        return (
            <Wrapper>
                <GasItem onoff={gas_onoff} />

                {
                    gas_onoff === 'on' ? 
                    <BtnSingle
                        onClickEvent={()=>{ControlActions.setGasStatus()}}
                        name={'잠그기'}
                    /> : ''
                }
            </Wrapper>
        )
    };
};

export default connect(
    (state) => ({
        gas_onoff: state.control.getIn(['data_gas',0,'status'])
    }),
    (dispatch) => ({
        ControlActions: bindActionCreators(controlActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(ControlHeating);

