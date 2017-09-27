import React, { Component } from 'react';
import Layout from 'components/Layout';
import { SubTitleWithIcon } from 'components/Control'
import {BtnSingle} from 'components/Shared';
import * as controlActions from 'redux/modules/control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ControlCheckBoxList,BtnDoubleCheck} from 'components/Shared';
import {ReserveTimeContainer,ReserveScheduleContainer} from 'containers/Shared';


const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 4rem;
    background:#f7f6ef;
    top: 3.5rem;
    z-index: 0;
    color:white;
    font-size: 1rem;
    overflow-y: auto;
`;

class ReserveControlWakeupContainer extends Component {
    static contextTypes = {
        router: PropTypes.object
	}

    addFamilyClick = () => {
        console.log('addFamilyClick click');
    }

    useWakeUp = () => {
        console.log('useWakeUp');
    }
    
    render() {
 
       const { checkBoxListArrayLights,checkBoxListArrayDayofWeek,ControlActions } = this.props;
       const {use,hour,minute} = this.props.wakeup.toJS();
        return (
            <Layout>
                <Wrapper>
                    <BtnDoubleCheck
                        name1={'사용함'}
                        from={'wakeup'}
                        onClickEvent={ControlActions.setCheckboxReserveControlUse} 
                        name2={'사용안함'}
                        check={use}
                    />
                    <SubTitleWithIcon
                        title = {'조명 켜기'}
                        icon = {'light'}
                    />
                    <ControlCheckBoxList
                        from1={'wakeup'}
                        from2={'lights'}
                        use={use}
                        checkBoxListArray={checkBoxListArrayLights}
                        onCheck={use ? ControlActions.setCheckboxReserveControl: ()=>{return}}
                    />
                    <SubTitleWithIcon
                        title = {'예약 시간'}
                        icon = {'time'}
                    />
                     <ReserveTimeContainer
                        hour={hour}
                        minute={minute}
                        use={use}
                        handleClick = {use ? ControlActions.setReserveControlWakeupTimer: ()=>{return}}
                    />
                     <SubTitleWithIcon
                        title = {'요일 반복'}
                        icon = {'calendar'}
                    />
                    <ReserveScheduleContainer
                        use={use}
                        checkBoxListArray={checkBoxListArrayDayofWeek}
                        onCheck={use ? ControlActions.setReserveControlWakeupDayofWeek: ()=>{return}}
                    />
                </Wrapper>
                <BtnSingle
                    onClickEvent={this.handleClick}
                    name={'확 인'}
                />
            </Layout>
        )
    };
};


export default connect(
    (state) => ({
        checkBoxListArrayLights: state.control.getIn(['reserveControl','wakeup','lights']),
        checkBoxListArrayDayofWeek: state.control.getIn(['reserveControl','wakeup','dayofweek']),
        wakeup: state.control.getIn(['reserveControl','wakeup'])
    }),
    (dispatch) => ({
        ControlActions: bindActionCreators(controlActions, dispatch)
    })
)(ReserveControlWakeupContainer);

