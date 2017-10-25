import React, { Component } from 'react';
import Layout from 'components/Layout';
import { SubTitle } from 'components/Menu/SideMenu/Setting/Shared'
import AuthHeader from 'components/Auth/AuthHeader';
import {BtnSingle} from 'components/Shared';
import * as authActions from 'redux/modules/auth';
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
    top: 3.5rem;
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


class SetProfileContainers extends Component {
    static contextTypes = {
        router: PropTypes.object
	}
/*
    handleClick = () => {
        const { history } = this.context.router;
       // history.push('/auth/setAlrim');
       history.push('/auth/complete');
    }
*/

    handleClick = () => {
        //회원가입 this.props.base.toJS();   
        const { dong, ho, phonetype, profile } = this.props.base.toJS();
        const { icon, img, alias, tagcolor } = profile;
        const jsonData = {
            dong:dong,
            ho:ho,
            uuid:window.deviceId,
            phonetype:phonetype,
            pushid:window.tokenId,
            profiles:{
                icon:Number(icon),
                img:img,
                alias:alias,
                tagcolor:tagcolor,
            },
            alarms:{
                guard:false,
                visitor:false,
                notice:false,
                parcel:false,
                ploc:false,
                comehome:false,
                fschedule:false,
                ftalk:false,
                fmsg:false,
            },
            lockings:{
                use:false,
                pass:''
            },
        }
        
        console.log('jsonData:',jsonData);
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        this.login(data);
    }

    async login(data){
        const { AuthActions } = this.props;
        try {
          await AuthActions.postRegists({'data':data});
        } catch(e) {
            console.log(e);
        }

        const { history } = this.context.router;
        const { success } = this.props;
        if(success){
            history.push('/auth/complete');
        }else{
            alert('회원가입실패');
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

    addFamilyClick = () => {
        console.log('addFamilyClick click');
    }

    deleteFamilyClick = () => {
        const { history } = this.context.router;
        history.push('/auth/deleteFamilyGroup');
    }

    render() {
 
        const {tagcolor,icon,alias, img} = this.props.profile.toJS();
        return (
            <Layout>
                <AuthHeader
                    btnVisible = {true}
                    titleName = {'프로필 설정'}
                    clickEvent = {this.backClickEvent}
                />
                <Wrapper>
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
              
                    <SubTitle
                        title = {'프로필 사진 및 애칭'}
                        useCheckBox = {false}
                    />
                    <ProfilePhotoAliasContainer
                        icon={icon}
                        alias={alias}
                        img = {img}
                        onClickEventIcon = {this.iconClick}
                        handleChangeFile = {this.handleChangeFile}
                        onClickEvent={this.handleClick}
                    />
                    <BtnSingle
                    onClickEvent={this.handleClick}
                    name={'다 음'}
                     />
                </Wrapper>
            </Layout>
        )
    };
};


export default connect(
    (state) => ({
        profile: state.auth.getIn(['register','base','profile']),
        base: state.auth.getIn(['register','base']),
        success : state.auth.getIn(['register','success'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(SetProfileContainers);

