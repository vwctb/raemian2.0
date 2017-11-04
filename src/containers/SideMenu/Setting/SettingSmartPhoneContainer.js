import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Wrapper, SubTitle } from 'components/Menu/SideMenu/Setting/Shared'
import {BtnSingle} from 'components/Shared';
import * as authActions from 'redux/modules/auth';
import * as uiActions from 'redux/modules/ui';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import * as KEY from 'lib/raemianAES';

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

class SettingSmartPhoneContainer extends Component {
    handleUpdate = async() => {
        const { AuthActions, UIActions, status } = this.props;
        const {usertoken} = this.props.loginUserInfo.toJS();
        const jsonData = {
            status: status ? 'on' : 'off'
        }
        const data = {
            usertoken:usertoken,
            data:KEY.encryptedKey(JSON.stringify(jsonData)),
        }
        UIActions.setSpinnerVisible(true);
        try {
            
            await AuthActions.setRobbycfs(data);   
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false); 

        const { success } = this.props;
        if(success){
            UIActions.changeSideMenuView({sideViewIndex:0,sideViewTitle:'전체 메뉴'});
        }else{
            alert('에러');
        }

    }
    pwlockCheckEvent = () => {
        const { AuthActions, status } = this.props;
        AuthActions.setCheckboxUseLobbyCFS(!status);   
    }
    render() {
        const {status} = this.props;
        return (
            <Wrapper>
                <SubTitle
                    title = {'스마트폰 출입 사용'}
                    useCheckBox = {true}
                    onCheckEvent = {this.pwlockCheckEvent}
                    checkValue = {status}
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
        loginUserInfo: state.auth.get('loginUserInfo'),
        status: state.auth.getIn(['setting','lobbycfs','status']),
        success: state.auth.getIn(['setting','lobbycfs','success'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UIActions: bindActionCreators(uiActions, dispatch)
    })
   
)(SettingSmartPhoneContainer);