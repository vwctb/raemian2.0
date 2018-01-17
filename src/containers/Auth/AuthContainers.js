import React, { Component } from 'react';
import Layout from 'components/Layout';
import {BtnSingle, Modal, Dimmed, Terms, Privacy, ServiceAgree} from 'components/Shared';
import { SubTitle } from 'components/Menu/SideMenu/Setting/Shared'
import AuthHeader from 'components/Auth/AuthHeader';
import * as uiActions from 'redux/modules/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import {CheckBoxListContainer} from 'containers/Shared'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    /* 레이아웃 */
    position: absolute;
    width: 100%;
    bottom: 0;
    background:#34393e;
    top: 3.5rem;
    z-index: 0;
    /* 색상 */
    color:white;
    /* 폰트 */
    font-size: 1rem;
    overflow-y: auto;
`;

const MainNotice = styled.div`
    width: 100%;
    height:25rem;
    text-align:left;
    padding: 1rem;
    font-size:0.8rem;
    line-height: 1.6rem;
    color:#49433c;
    overflow:auto;
`;

const SubNotice = styled.div`
    width: 100%;
    padding: 1.5rem;
    margin-bottom:1rem;
    line-height: 1.2rem;
    font-size:0.8rem;
    text-align:center;
    color:#757371;
`;

let modalSW=true;
let modalTitle = '이용약관';
class AuthContainers extends Component {
    static contextTypes = {
        router: PropTypes.object
	}

    handleClick = () => {
        const { history } = this.context.router;
        const { checkBoxListArray } = this.props;
        let agreeCnt = 0;
        for (var i=0; i < checkBoxListArray.size; i++) {
           if(checkBoxListArray.getIn([i,'check'])){
               agreeCnt++;
           }
        }
        if(agreeCnt === checkBoxListArray.size){
           history.push('auth/signup');
        }else{
            alert('이용약관에 모두 동의해주셔야 합니다.')
        }
    }

    backClickEvent = () => {
        console.log('back click');
        window.location.href = 'http://119.194.107.93/prev';        
    }

    policyClick = () => {
        modalTitle = '개인정보 취급방침';
        const { UIActions,visible } = this.props;
        if(!modalSW) return; //반복 모달 호출현상 방지
        UIActions.setModalVisible(!visible);
        modalSW = false;
    }

    termsClick = () => {
        modalTitle = '이용약관';
        const { UIActions,visible } = this.props;
        if(!modalSW) return; //반복 모달 호출현상 방지
        UIActions.setModalVisible(!visible);
        modalSW = false;
    }

    serviceAgreeClick = () => {
        modalTitle = '서비스 동의';
        const { UIActions, visible } = this.props;
        if(!modalSW) return; //반복 모달 호출현상 방지
        UIActions.setModalVisible(!visible);
        modalSW = false;
    }

    onHide = () =>{
        const { UIActions,visible } = this.props;
        UIActions.setModalVisible(!visible);
        setTimeout(() => {
            modalSW = true;
        },500);
    }

    render() {
        const { pageType, checkBoxListArray,visible } = this.props;
        
        return (
            <Layout>
                <AuthHeader
                    btnVisible = {true}
                    titleName = {'서비스 동의'}
                    clickEvent = {this.backClickEvent}
                    />
                <Wrapper>
                    <SubTitle
                        title = {'아래 중 하나를 선택해주세요!'}
                        useCheckBox = {false}
                    />
                    <CheckBoxListContainer
                        checkBoxListArray ={checkBoxListArray}
                        policyClick = {this.policyClick}
                        termsClick = {this.termsClick}
                        serviceAgreeClick= {this.serviceAgreeClick}
                    />
                </Wrapper>
              
                <BtnSingle
                    onClickEvent={this.handleClick}
                    name={'다 음'}
                />
                <Modal visible={visible} onHide={this.onHide} title={modalTitle}>
                    {
                        modalTitle === '이용약관' &&
                        <Terms/>
                    }
                    {
                        modalTitle === '개인정보 취급방침' &&
                        <Privacy/>
                    }
                    {
                        modalTitle === '서비스 동의' &&
                        <ServiceAgree/>
                    }
                </Modal>
                 <Dimmed visible={visible}/>


            </Layout>
        )
    };
};



export default connect(
    (state) => ({
        visible: state.ui.getIn(['modal','visible']),
        checkBoxListArray: state.auth.getIn(['register','agreementList'])
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(AuthContainers);

