import React, { Component } from 'react';
import Layout from 'components/Layout';
import { SubTitleWithIcon } from 'components/Control'
import {BtnSingle} from 'components/Shared';
import * as controlActions from 'redux/modules/control';
import * as uiActions from 'redux/modules/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ControlCheckBoxList,BtnDoubleCheck} from 'components/Shared';
import {ReserveTimeContainer,ReserveScheduleContainer} from 'containers/Shared';
import * as KEY from 'lib/raemianAES';

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

    handleClick = async () => {
        const { ControlActions, UIActions, uploadFile, use, goout} = this.props;
        const { usertoken } = this.props.loginUserInfo;
        let jsonData;
        if(use === true){
            jsonData = goout;
        }else{
            jsonData = {
                use : use
            }
        }
        console.log('jsonData: ',jsonData);
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        UIActions.setSpinnerVisible(true);
        try {
            await ControlActions.setSmartReserveGoout({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
        const { success } = this.props;
        if(success) {
            const { history } = this.context.router;
            history.push('/control');
        }else{
            alert('예약 설정을 실패하였습니다.')
        }

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
        loginUserInfo: state.auth.get('loginUserInfo'),
        success : state.control.getIn(['reserveControl','wakeupSuccess']),
        wakeup: state.control.getIn(['reserveControl','wakeup']),
        checkBoxListArrayLights: state.control.getIn(['reserveControl','wakeup','lights']),
        checkBoxListArrayDayofWeek: state.control.getIn(['reserveControl','wakeup','dayofweek']),
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ControlActions: bindActionCreators(controlActions, dispatch)
    })
)(ReserveControlWakeupContainer);

