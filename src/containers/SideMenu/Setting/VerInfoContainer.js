import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Wrapper, SubTitle } from 'components/Menu/SideMenu/Setting/Shared'

import {KeyPadNumContainer} from 'containers/Shared'
import {BtnSingle,BtnSingleModal,Modal,Dimmed} from 'components/Shared';
import * as authActions from 'redux/modules/auth';
import * as uiActions from 'redux/modules/ui';
import { bindActionCreators } from 'redux';

import styled from 'styled-components';

const InnerWrapper = styled.div`
    position:fixed;
    width:100%;
    top:3.5rem;
    bottom:0;
    background:#34393e;
`;


const NoticeTitle = styled.div`
    width: 100%;
    text-align:center;
    color:white;
    font-size: 1.2rem;
    line-height:1.5rem;
    padding:3rem 0 3rem 0rem;
    background:#3e454b;
    
`;
const Span = styled.span`
    color:white;
    opacity: 0.6;
    font-size: 0.7rem;
`;
const Notice = styled.div`
    width: 100%;
    text-align:center;
    color:white;
    font-size: 0.8rem;
    line-height:1.4rem;
    padding:0.5rem 0 1.5rem 0rem;
    position: fixed;
    bottom: 4rem;
  
`;


class VerInfoContainer extends Component {

/*
    componentDidMount() {
        const { AuthActions } = this.props;
        AuthActions.changeInputLockPass("");
        passInput = '○○○○';
    }*/

    componentWillUnmount(){

    }

    handleUpdate = () => {
        console.log('update click');
    }


    render() {
        const {lobbycfs} = this.props;
        return (
            <Wrapper>
                <InnerWrapper>
                <SubTitle
                    title = {'앱 버전'}
                    useCheckBox = {false}
                />
                <NoticeTitle>
                      Ver.201700102A<br/>
                     <Span> 2017.01.06 업데이트 됨</Span>
                </NoticeTitle>
                {
                    /*
                <Notice>
                       업데이트 가능한 새로운 버전이 있습니다.<br/>
                       업데이트 하시겠습니까?
                </Notice>

                <BtnSingle
                    onClickEvent={this.handleUpdate}
                    name={'지금 업데이트'}
                />
                */
               }
                </InnerWrapper>
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
   
)(VerInfoContainer);