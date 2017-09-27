import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Wrapper, SubTitle } from 'components/Menu/SideMenu/Setting/Shared'

import {KeyPadNumContainer} from 'containers/Shared'
import {BtnSingle,BtnSingleModal,Modal,Dimmed} from 'components/Shared';
import * as authActions from 'redux/modules/auth';
import * as uiActions from 'redux/modules/ui';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';


const NoticeTitle = styled.div`
    width: 100%;
    text-align:center;
    color:white;
    font-size: 1rem;
    line-height:1.5rem;
    padding:4rem 0 1rem 0rem;
`;
const Notice = styled.div`
    width: 100%;
    text-align:center;
    color:white;
    opacity: 0.6;
    font-size: 0.8rem;
    line-height:1.4rem;
    padding:0.5rem 0 1rem 0rem;
`;

let passInput = '○○○○';
class PWLockContainer extends Component {

/*
    componentDidMount() {
        const { AuthActions } = this.props;
        AuthActions.changeInputLockPass("");
        passInput = '○○○○';
    }*/

    componentWillUnmount(){
        const { AuthActions } = this.props;
        AuthActions.changeInputLockPass("");
        passInput = '○○○○';
    }

    handleUpdate = () => {
        console.log('click');
    }

    pwlockCheckEvent = () => {
        const { AuthActions, lobbycfs } = this.props;
        AuthActions.setCheckboxUseLobbyCFS(!lobbycfs);   
    }

    render() {
        const {lobbycfs} = this.props;
        return (
            <Wrapper>
                <SubTitle
                    title = {'스마트폰 출입 사용'}
                    useCheckBox = {true}
                    onCheckEvent = {this.pwlockCheckEvent}
                    checkValue = {lobbycfs}
                />
                <NoticeTitle>
                      스마트폰을 통해<br/>공동현관문 문열림이 가능합니다.
                </NoticeTitle>
                <Notice>
                       단,스마트홈2.0 앱이 실행되어 있고<br/>블루투스와 데이터통신이<br/>켜져있어야 합니다.
                </Notice>

                <BtnSingle
                    onClickEvent={this.handleUpdate}
                    name={'적 용'}
                />
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        lobbycfs: state.auth.getIn(['setting','lobbycfs'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
   
)(PWLockContainer);