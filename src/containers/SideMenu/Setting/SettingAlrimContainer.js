import React, { Component } from 'react';
import Layout from 'components/Layout';
import { SubTitle } from 'components/Menu/SideMenu/Setting/Shared'
import AuthHeader from 'components/Auth/AuthHeader';
import {BtnSingle} from 'components/Shared';
import * as authActions from 'redux/modules/auth';
import * as uiActions from 'redux/modules/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as KEY from 'lib/raemianAES';
import CheckBoxList from 'components/Shared/CheckBoxList';



const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    background:#3e454b;
    top:0;
    z-index: 0;
    color:white;
    font-size: 1rem;
    overflow-y: auto;
`;

const OnePassNotice = styled.div`
    width: 100%;
    text-align:center;
    color:white;
    opacity: 0.6;
    font-size: 0.6rem;
    line-height:1.2rem;
    padding:2rem 0 1rem 0rem;

`;


class SettingAlrimContainers extends Component {
    static contextTypes = {
        router: PropTypes.object
	}

    handleClick = async () => {

        const { AuthActions, UIActions, checkBoxListArray } = this.props;
        const {usertoken} = this.props.loginUserInfo.toJS();
        const jsonData = {
            guard:checkBoxListArray.getIn([0,'check']),
            visitor:checkBoxListArray.getIn([1,'check']),
            notice:checkBoxListArray.getIn([2,'check']),
            parcel:checkBoxListArray.getIn([3,'check']),
            ploc:checkBoxListArray.getIn([4,'check']),
            comehome:checkBoxListArray.getIn([5,'check']),
            fschedule:checkBoxListArray.getIn([6,'check']),
            ftalk:checkBoxListArray.getIn([7,'check']),
            fmsg:checkBoxListArray.getIn([8,'check'])
        }
        console.log('jsonData:',jsonData);
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        try {
            await AuthActions.setAlarms({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
        const { history } = this.context.router;
        const { success } = this.props;
        if(success){
            UIActions.changeSideMenuView({sideViewIndex:0,sideViewTitle:'전체 메뉴'});
        }else{
            alert('실패');
        }

    }

    handleClickTagColor= (val) => {
        const { AuthActions } = this.props;
        AuthActions.setProfileTagColor(val);
    }

    backClickEvent = () => {
        const { history } = this.context.router;
        history.push('/auth/setProfile');
    }

    familyClick = (val) => {
        const { history } = this.context.router;
        const { AuthActions } = this.props;

        AuthActions.setProfileKey(val);
        console.log('familyClick click'+val);
    }

    iconClick = (val) => {
        const { history } = this.context.router;
        const { AuthActions } = this.props;
        AuthActions.setProfileIcon(val);
    }

    render() {
       const { checkBoxListArray, AuthActions } = this.props;
        return (
            <Layout>
                <AuthHeader
                    btnVisible = {true}
                    titleName = {'알림 설정'}
                    clickEvent = {this.backClickEvent}
                />
                <Wrapper>
                    <SubTitle
                        title = {'이벤트 알림 사용 여부'}
                        useCheckBox = {false}
                    />
                    <CheckBoxList
                        checkBoxListArray={checkBoxListArray}
                        onCheck={AuthActions.setCheckboxAlrim}
                    />
                </Wrapper>
              
                <BtnSingle
                    onClickEvent={this.handleClick}
                    name={'적 용'}
                />
            </Layout>
        )
    };
};


export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo'),
        checkBoxListArray: state.auth.getIn(['setting','alarmsList']),
        success: state.auth.getIn(['setting','alarmsListSuccess'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UIActions: bindActionCreators(uiActions, dispatch),
    })
)(SettingAlrimContainers);

