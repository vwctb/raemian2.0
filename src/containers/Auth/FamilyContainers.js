import React, { Component } from 'react';
import Layout from 'components/Layout';
import { SubTitle } from 'components/Menu/SideMenu/Setting/Shared'
import AuthHeader from 'components/Auth/AuthHeader';
import * as authActions from 'redux/modules/auth';
import * as uiActions from 'redux/modules/ui';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import {FamilyListContainer,BottomBtnContainer} from 'containers/Shared'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as KEY from 'lib/raemianAES';
import {BtnDoubleModal, Modal, Dimmed} from 'components/Shared';

const Wrapper = styled.div`
    /* 레이아웃 */
    position: absolute;
    width: 100%;
    bottom: 0;
    background:#3e454b;
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
    text-align:center;
    padding: 1.5rem 1rem 1.5rem 1rem;
    line-height: 1.6rem;
    color:#49433c;
`;

const OrangeText = styled.span`
    color:#ff7e5f;
`;


let modalSW=true,userkey=null,userAlias=null;
class FamilyContainers extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    
    async componentDidMount() {
        const { UIActions, AuthActions } = this.props;
        const { authConfirm } = this.props.base.toJS();
       // console.log(authConfirm.registtoken);
        try {
            UIActions.setSpinnerVisible(true);
            await AuthActions.getInitialFamilyGroupAuth(authConfirm.registtoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
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
    }

    familyClick = (val) => {
        const { history } = this.context.router;
        const { AuthActions } = this.props;
        AuthActions.setProfile(val);
        history.push('/auth/setProfile');
    }

    addFamilyClick = () => {
        const { history } = this.context.router;
        history.push('/auth/setProfile');
    }

    reAuthClick = (key,alias) => {
        const { UIActions, visible } = this.props;
        UIActions.setModalVisible(!visible);
        userkey = key;
        userAlias= alias;
        setTimeout(() => {
            modalSW = true;
        },500);
    }

    reAuth = async () => {
      
        const { authConfirm,phonetype } = this.props.base.toJS();
        const { AuthActions, UIActions } = this.props;

        UIActions.setSpinnerVisible(true);
        const uuid = window.deviceId ? window.deviceId : 'uuidkey10120202';
        const pushid = window.tokenId ? window.tokenId : 'tokenid10120202';
        const jsonData = {
            uuid:uuid,
            phonetype:phonetype,
            pushid:pushid
        }
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        try {
            await AuthActions.reAuth({userkey:userkey,data:data,registtoken:authConfirm.registtoken});
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
        if(this.props.reAuthSuccess){
            const { history } = this.context.router;
            history.push('/');
            window.location.reload(true);
        }
    }

    deleteFamilyClick = () => {
        const { history } = this.context.router;
        history.push('/auth/deleteFamilyGroup');
    }

    render() {
        const { pageType, familyListArray, visible } = this.props;
        //const {profile} = this.props.base.toJS();
        return (
            <Layout>
                <AuthHeader
                    btnVisible = {false}
                    titleName = {'가족구성원 선택'}
                    clickEvent = {this.backClickEvent}
                />
                <Wrapper>
                    <SubTitle
                        title = {'아래 중 하나를 선택해주세요!'}
                        useCheckBox = {false}
                    />
                    <FamilyListContainer
                        familyListArray = {familyListArray}
                       // profile={profile}
                        familyClick = {this.familyClick}
                        reAuthClick = {this.reAuthClick}
                        addFamilyClick = {this.addFamilyClick}
                    />
                </Wrapper>
              
                <BottomBtnContainer
                    onClickEvent={this.deleteFamilyClick}
                    title={'삭제하고 싶은 가족구성원이 있습니까?'}
                    btnTitle={'삭 제'}
                />


                <Modal visible={visible} onHide={this.onHide} title={'재인증 확인'}>                
                    <div> 
                        <MainNotice>
                            이 스마트폰에서 '{userAlias}'님으로<br/>
                            재인증하시면 기존 앱에서는<br/>
                            더 이상 사용하실 수 없습니다.<br/>
                            <br/>
                            <OrangeText>
                                재인증하시겠습니까?
                            </OrangeText>
                        </MainNotice>
                        
                        <BtnDoubleModal
                            onClickEvent1={this.reAuth}
                            onClickEvent2={this.onHide}
                            name1={'재인증'}
                            name2={'취소'}
                        />
                    </div>
                </Modal>
                <Dimmed visible={visible}/>


             
            </Layout>
        )
    };
};

export default connect(
    (state) => ({
        familyListArray: state.auth.getIn(['setting','familyList']),
        base: state.auth.getIn(['register','base']),
        visible: state.ui.getIn(['modal','visible']),
        reAuthSuccess: state.auth.get('reAuthSuccess')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(FamilyContainers);

