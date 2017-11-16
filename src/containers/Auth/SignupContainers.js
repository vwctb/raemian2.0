import React, { Component } from 'react';
import {BtnSingle,BtnSingleModal,Modal,Dimmed,InputWithLabelModal} from 'components/Shared';
import InputWithLabel from 'components/Auth/InputWithLabel';
import * as authActions from 'redux/modules/auth';
import * as uiActions from 'redux/modules/ui';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import  {BG_Sub_Reamin,LogoCombi} from 'img';
import {isLength} from 'validator';
import * as KEY from 'lib/raemianAES';

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
`;

const Logo = styled.div`
    position: relative;
    width: 100%;
    height:30%;
    background-image: url(${LogoCombi});
    background-position: center;
    background-repeat: no-repeat;
	background-size: 6rem 6rem;
`;

const Annotaion = styled.div`
    position: relative;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.3rem;
    text-align:center;
    color:white;
`;

const InputWrapper = styled.div`
    width: 100%;
    margin-top:3rem;
    display: flex;
    justify-content:center;

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

const BtnWrapper = styled.div`
width: 100%;
height:100%;

`;

let modalSW=true;
class SignupContainers extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    
    componentDidMount() {
         this.setError('"동호수를 입력해주세요!"');
    }

    setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form: 'register',
            message
        });
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
   

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;
       
        AuthActions.changeInput({
            name,
            value,
            form: 'register'
        });
    }

    handleClick = () => {
        const { UIActions,visible } = this.props;
        const { dong, ho} = this.props.base.toJS();

        //history.push('auth/signup');
         // 검증작업 진행
        const validationDong = this.validate['dong'](dong);
        const validationHo = this.validate['ho'](ho);    
        if(validationDong && validationHo){
            if(!modalSW) return; //반복 모달 호출현상 방지
            UIActions.setModalVisible(!visible);
            modalSW = false;
        }
    }

    handleClickNext = () => {
        const { AuthActions, UIActions, visible } = this.props;
        const { dong,ho,pass, authConfirm } = this.props.base.toJS();
        //history.push('auth/signup');
        // 검증작업 진행
        const passCheck = this.validate['pass'](pass);
        if(!passCheck)return;
        const data = KEY.encryptedKey(JSON.stringify({dong:dong,ho:ho,pass:pass}));
        this.ititAuth(data);
    }

    async ititAuth(data){
        const { AuthActions, UIActions, visible } = this.props;
        try {
          await  AuthActions.postAuthConfirm({'data':data});
        } catch(e) {
            console.log(e);
        }
        const { history } = this.context.router;
        const { authConfirm } = this.props.base.toJS();

        console.log('authConfirm:',authConfirm);
        if(authConfirm.success){
            UIActions.setModalVisible(!visible);
            history.push('/auth/setFamilyGroup');
        }
    }

    onHide = () =>{
        const { UIActions,visible } = this.props;
        UIActions.setModalVisible(!visible);
        setTimeout(() => {
            modalSW = true;
        },500);
    }

    render() {
        const { pageType, checkBoxListArray, error, visible } = this.props;
        const { dong, ho, pass, authConfirm } = this.props.base.toJS();
        return (
            <Wrapper>
                <Logo/>
                
                <Annotaion>{error}</Annotaion>
                
                <InputWrapper>
                <InputWithLabel 
                    label="동" 
                    name="dong" 
                    type="number" 
                    value={dong}
                    onChange={this.handleChange}
                />
                <InputWithLabel 
                    label="호" 
                    name="ho" 
                    type="number" 
                    value={ho}
                    onChange={this.handleChange}
                />
                </InputWrapper>
          
                <BtnSingle
                    onClickEvent={this.handleClick}
                    name={'다 음'}
                />
            
                <Modal visible={visible} onHide={this.onHide} title={'입주민 인증'}>
                    {
                        authConfirm.success === null && 
                        <MainNotice>
                            우리집 외부접속 비밀번호를<br/>입력하세요!
                        </MainNotice>
                    }

                    {
                        authConfirm.success === false &&
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
        error: state.auth.getIn(['register','error']),
        visible: state.ui.getIn(['modal','visible']),
        base: state.auth.getIn(['register','base'])
    }),
    (dispatch) => ({
       AuthActions: bindActionCreators(authActions, dispatch),
       UIActions:bindActionCreators(uiActions,dispatch)
    })
)(SignupContainers);

