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
import {FamilyListContainer,OnePassTagContainer,ProfilePhotoAliasContainer} from 'containers/Shared'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as KEY from 'lib/raemianAES';

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


class SettingProfileContainer extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    
    async componentDidMount() {
        const { UIActions, AuthActions} = this.props;
        const {usertoken} = this.props.loginUserInfo;
        console.log('usertoken:',usertoken);
        try {
            UIActions.setSpinnerVisible(true);
            await AuthActions.getInitialProfile(usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }

    handleClick = async () => {
        const { AuthActions,UIActions } = this.props;
        const { profile } = this.props.base.toJS();
        const { icon, img, alias, tagcolor } = profile;
        const { usertoken } = this.props.loginUserInfo;
        const jsonData = {
            icon:Number(icon),
            img:img,
            alias:alias,
            tagcolor:tagcolor,
        }
        console.log('jsonData:',jsonData);
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        try {
          await AuthActions.setSettingProfile({'data':data,'usertoken':usertoken});
        } catch(e) {
            console.log(e);
        }
        const { success } = this.props;
        if(success){
            UIActions.changeSideMenuView({sideViewIndex:0,sideViewTitle:'전체 메뉴'});
        }else{
            alert('프로필 수정 에러');
        }

    }

    handleChangeFile = (e) => {
        const { AuthActions} = this.props;
        if(e.target.files.length === 0) return;
        const type =  e.target.files[0].type;
        if(e.target.files[0] && type.split('/')[0] === 'image'){
          let reader = new FileReader();
          reader.onload = function (e) {
            AuthActions.setProfileUploadFile(e.target.result);
            AuthActions.setProfileIcon(0);
          }
          reader.readAsDataURL(e.target.files[0]);
        }
    }


    handleClickTagColor= (val) => {
        const { AuthActions } = this.props;
        AuthActions.setProfileTagColor(val);
    }

    backClickEvent = () => {
        const { history } = this.context.router;
        history.push('/auth/setFamilyGroup');
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
         console.log('iconClick click'+val);
        AuthActions.setProfileIcon(val);
        
    }

    addFamilyClick = () => {
        console.log('addFamilyClick click');
    }

    render() {
 
        const {tagcolor,icon,alias,img} = this.props.profile.toJS();
        
        return (
            <Layout>
                <Wrapper>
                    <SubTitle
                        title = {'프로필 사진 및 애칭'}
                        useCheckBox = {false}
                    />
                    <ProfilePhotoAliasContainer
                        icon={icon}
                        alias={alias}
                        img={img}
                        onClickEventIcon = {this.iconClick}
                        handleChangeFile = {this.handleChangeFile}

                    />

                    <SubTitle
                        title = {'원패스 태그 연동'}
                        useCheckBox = {false}
                    />
                    <OnePassTagContainer
                        tagcolor = {tagcolor}
                     
                        onClickEvent={this.handleClickTagColor}
                    />
                     <OnePassNotice>
                        원패스태그 뒷면에 색상으로 구분되어 있습니다.<br/>태그를 연동하시면 일부 시나리오 서비스를 받을실 수 있습니다.
                    </OnePassNotice>
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
        profile: state.auth.getIn(['register','base','profile']),
        base: state.auth.getIn(['register','base']),
        success: state.auth.getIn(['register','base','profile','success']),
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(SettingProfileContainer);

