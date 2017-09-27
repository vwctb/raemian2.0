import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {ControlSlider} from 'components/Control';
import {BtnSingle} from 'components/Shared';
import { bindActionCreators } from 'redux';
import * as controlActions from 'redux/modules/control';
import * as uiAction from 'redux/modules/ui';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
`;

class ControlHeating extends Component {
    static contextTypes = {
        router: PropTypes.object
	}
    handleUpdate = async () => {
        const { ControlActions, heatingitem } = this.props;
        const { id, status, name, configTemp, currentTemp } = heatingitem.toJS();
        try {
            await ControlActions.updateAirconsCondition({
                id,
                control: {status,name,currentTemp,configTemp}
            });
        } catch(e) {
            console.log(e);
        }

        try {
          await  ControlActions.getInitialAircons();
        } catch(e) {
            console.log(e);
        }
        const{ history } = this.context.router;
        history.push('/control/aircon');
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
        const {heatingitem} = this.props;
        const {handleUpdate,handleClick,handleChange} = this;
        return (
            <Wrapper>
                <ControlSlider 
                    heatingitem ={heatingitem}
                    handleClick = {handleClick}
                    controlType = {'aircon'}
                    handleChange={handleChange}
                />
                <BtnSingle
                    onClickEvent={handleUpdate}
                    name={'확인'}
                />
            </Wrapper>
        )
    };
};

export default connect(
    (state) => ({
        heatingitem: state.ui.getIn(['control','nowSelectItem'])
    }),
    (dispatch) => ({
        ControlActions: bindActionCreators(controlActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(ControlHeating);

