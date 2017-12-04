import React, { Component } from 'react';

import {BtnSingle,BtnSingleModal,Modal,Dimmed,InputWithLabelModal} from 'components/Shared';
import {KeyPadNumContainer} from 'containers/Shared'
import * as homeActions from 'redux/modules/home';
import * as authActions from 'redux/modules/auth';
import * as uiActions from 'redux/modules/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {BG_Sub_Reamin,LogoCombi} from 'img';
import {isLength} from 'validator';
import * as KEY from 'lib/raemianAES';
import storage from 'lib/storage';

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    background:#34393e;
    top: 0;
    z-index: 10;
    color:white;
    background-image: url(${BG_Sub_Reamin});
	background-position: center;
    background-size: cover;
    text-align:center;
`;
const Logo = styled.div`
    position: relative;
    width: 100%;
    height:26%;
    background-image: url(${LogoCombi});
    background-position: center;
    background-repeat: no-repeat;
	background-size: 6rem 6rem;
`;
const Annotaion = styled.div`
    position: relative;
    width: 100%;
    height: 4rem;
    line-height: 2rem;
    font-size: 1.1rem;
    text-align:center;
    color:white;
`;

const MainNotice = styled.div`
    width: 100%;
    text-align:center;
    padding: 1rem 0.9rem 1rem 0.9rem;
    line-height: 1.6rem;
    color:#49433c;
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
class ScreenLock extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    validate = {
        dong: (value) => {
            if(!isLength(value, { min:3, max: 4 })) {
                 this.setError('동은 3~4자 이상 입력하세요!');
                return false;
            }
            return true;
        },
        ho: (value) => {
            if(!isLength(value, { min:3, max: 4 })) {
                this.setError('호는 3~4자 이상 입력하세요!');
                return false;
            }
            return true;
        },
        pass: (value) => {

            /*
            if(!isLength(value, { min:3, max: 4 })) {
                this.setError('인증키는 0자 이상 입력하세요!');
                return false;
            }
            */
            return true;
        }
    }
    componentWillUnmount(){
        const { HomeActions } = this.props;
        HomeActions.changeInputLockPass("");
        HomeActions.changeInputLockPassValue('○○○○');
    }

    handleUpdate = () => {
        const {changeSideMenuView} = this.props;
        changeSideMenuView({sideViewIndex:0});
    }

    pwlockCheckEvent = () => {
        const { HomeActions } = this.props;
        const { use } = this.props.screenLock.toJS();
        HomeActions.setCheckboxUsePassLock(!use);   
    }

    onClickEvent = async (e) =>{
        //console.log(e.target.innerHTML);
        const { HomeActions, UIActions } = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        const { pass } = this.props.screenLock.toJS();
        const { success } = this.props.authConfirm.toJS();
        let value = '○○○○';
        if(pass.length === 0){
            value ='●○○○';
        }else if(pass.length === 1){
            value ='●●○○';
        }else if(pass.length === 2){
            value ='●●●○';
        }else if(pass.length === 3){
            value ='●●●●';
        }

        HomeActions.changeInputLockPassValue(value);

        if(pass.length > 3)return;
        HomeActions.changeInputLockPass(pass+e.target.innerHTML);
        if((pass+e.target.innerHTML).length === 4 && success === null){
            const newPass = KEY.encryptedKey(JSON.stringify(pass+e.target.innerHTML));
            const jsonData = {
                pass:newPass
            }
            const data = KEY.encryptedKey(JSON.stringify(jsonData));
            UIActions.setSpinnerVisible(true);
            try {
                await HomeActions.postCPS({data:data,usertoken:usertoken});
            } catch(e) {
                console.log(e);
            }
            UIActions.setSpinnerVisible(false);
            const { success } = this.props.screenLock.toJS();
            if(success){
                HomeActions.setLockVisible(false);
                HomeActions.setScreenLockNotice('잠금 비밀번호를 입력해 주세요!');
            }else{
                HomeActions.setScreenLockNotice('비밀번호가 틀립니다. 다시 입력해 주세요!');
                HomeActions.changeInputLockPass('');
                HomeActions.changeInputLockPassValue('○○○○');
            } 
        }
    }

    onClickEventDelete = () => {
        const { HomeActions } = this.props;
        const { pass } = this.props.screenLock.toJS();
        let value = '○○○○';
        if(pass.length === 0)return;
        let newLockPass = pass.substring(0,pass.length-1);
        HomeActions.changeInputLockPass(newLockPass);

        if(pass.length === 4){
            value ='●●●○';
        }else if(pass.length === 3){
            value ='●●○○';
        }else if(pass.length === 2){
            value ='●○○○';
        }else if(pass.length === 1){
            value ='○○○○';
        }
        HomeActions.changeInputLockPassValue(value);
        
    }

    handleChange = (e) => {
        const { HomeActions } = this.props;
        const { value } = e.target;
        HomeActions.changeInput(value);
    }

    handleClick = (e) => {
        const { UIActions,visible } = this.props;
        if(!modalSW) return; //반복 모달 호출현상 방지
        UIActions.setModalVisible(!visible);
        modalSW = false;
    }

    onHide = () =>{
        const { UIActions, visible } = this.props;
        UIActions.setModalVisible(!visible);
        setTimeout(() => {
            modalSW = true;
        },500);
    }

    handleClickNext = async () => {
        const { HomeActions, UIActions, visible } = this.props;
        const { pass } = this.props.authConfirm.toJS();
        const { usertoken } = this.props.loginUserInfo.toJS();
        //history.push('auth/signup');
        // 검증작업 진행
        const passCheck = this.validate['pass'](pass);
        if(!passCheck)return;
        const data = KEY.encryptedKey(JSON.stringify({pass:pass}));        
        try {
          await  HomeActions.postAuthConfirm({'data':data,'usertoken':usertoken});
        } catch(e) {
            console.log(e);
        }
        const { success } = this.props.authConfirm.toJS();
        if(success){
            UIActions.setModalVisible(!visible);

        }
    }

    handleClickSetLockScreenPass = async () => {
        const { AuthActions,UIActions } = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        const { pass } = this.props.screenLock.toJS();
        const newPass = KEY.encryptedKey(JSON.stringify(pass));

        const jsonData = {  
            use:true,
            pass:newPass
        }
        console.log('pass:',pass);
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        
       // console.log('jsonData :',jsonData);
        UIActions.setSpinnerVisible(true);
        try {
            await AuthActions.putCPS({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
        const { success } = this.props.lockPass.toJS();
        if(success){
            const {HomeActions} = this.props;
            storage.set('screenLockUse',true);
            HomeActions.setLockVisible(false);
        }


    }


    render() {
        const { visible } = this.props;
        const { pass, success } = this.props.authConfirm.toJS();
        let { notice, passValue } = this.props.screenLock.toJS();

        return (
            <Wrapper>
                <Logo/>
                <Annotaion>{notice}</Annotaion>
                {
                    success === true ?
                    <BtnSingle
                        onClickEvent={this.handleClickSetLockScreenPass}
                        name={'적 용'}
                    />
                    :
                    <BtnSingle
                        onClickEvent={this.handleClick}
                        name={'잠금 비밀번호가 기억나지 않으세요?'}
                    />
                }
                <KeyPadNumContainer
                        passInput={passValue}
                        onClickEventDelete = {this.onClickEventDelete}
                        onClickEvent= {this.onClickEvent}
                        type={'screenLock'}
                />
                <Modal visible={visible} onHide={this.onHide} title={'입주민 인증'}>
                    {
                       (success === null || success === undefined)  && 
                        <MainNotice>
                            우리집 외부접속 비밀번호를<br/>입력하세요!
                        </MainNotice>
                    }

                    {
                        success === false &&
                        <MainNotice>
                            외부접속 비밀번호가 일치하지 않습니다.<br/>확인 후 다시 입력해 주세요!
                        </MainNotice>
                    }

                    <InputWithLabelModal
                        autoFocus
                        name="pass"
                        type="text"
                        value={pass}
                        onChange={this.handleChange}
                    />
                    <SubNotice>
                        외부접속 비밀번호는<br/>거실 월패드에서 설정하실 수 있습니다.
                    </SubNotice>
                    <BtnSingleModal
                        onClickEvent={this.handleClickNext}
                        name={'확 인'}
                    />
                </Modal>
                 <Dimmed visible={visible}/>

               
               
            </Wrapper>
        )
    };
};

export default connect(
    (state) => ({
        screenLock: state.home.get('screenLock'),
        loginUserInfo: state.auth.get('loginUserInfo'),
        authConfirm: state.home.get('authConfirm'),
        visible: state.ui.getIn(['modal','visible']),
        lockPass: state.auth.getIn(['setting','lockPass']),

    }),
    (dispatch) => ({
       HomeActions: bindActionCreators(homeActions, dispatch),
       AuthActions: bindActionCreators(authActions, dispatch),
       UIActions:bindActionCreators(uiActions,dispatch)
    })
)(ScreenLock);

