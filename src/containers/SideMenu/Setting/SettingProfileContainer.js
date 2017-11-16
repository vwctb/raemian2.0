import React, { Component } from 'react';
import Layout from 'components/Layout';
import { SubTitle } from 'components/Menu/SideMenu/Setting/Shared'
import {BtnSingle} from 'components/Shared';
import * as authActions from 'redux/modules/auth';
import * as uiActions from 'redux/modules/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import {OnePassTagContainer,ProfilePhotoAliasContainer} from 'containers/Shared'
import PropTypes from 'prop-types';
import * as KEY from 'lib/raemianAES';
import {BtnDoubleModal, Modal, Dimmed, InputWithLabelModal} from 'components/Shared';

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

let tempTagColor=null;
let modalSW=true;
class SettingProfileContainer extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
     /*
    async componentDidMount() {
        const { UIActions, AuthActions} = this.props;
        const {usertoken} = this.props.loginUserInfo.toJS();
        console.log('usertoken:',usertoken);
       
        try {
            UIActions.setSpinnerVisible(true);
            await AuthActions.getInitialProfile(usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
     
    }
   */
    handleClick = async () => {
        const { AuthActions,UIActions } = this.props;
        const { profile } = this.props.base.toJS();
        const { icon, img, alias, tagcolor } = profile;
        const { usertoken } = this.props.loginUserInfo.toJS();
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

    handleClickTagColor= async (val) => {
        tempTagColor = val;
        const { AuthActions,UIActions,visible } = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        try {
            await AuthActions.checkTagColor(
                {
                    tagcolor:val,
                    headers:{'Content-Type':'application/json; charest=utf-8','usertoken':usertoken}
                }
            );
          } catch(e) {
              console.log(e);
          }
        const { checkTagColor } = this.props;
        if(!checkTagColor){
            AuthActions.setProfileTagColor(val);
        }else{
            if(!modalSW) return; //반복 모달 호출현상 방지
            UIActions.setModalVisible(!visible);
            modalSW = false;
        }
        
    }

    onHide = () =>{
        const { UIActions,visible } = this.props;
        UIActions.setModalVisible(!visible);
        setTimeout(() => {
            modalSW = true;
        },500);
    }

    onSetTagColor = () => {
        const { AuthActions,visible,UIActions } = this.props;
        AuthActions.setProfileTagColor(tempTagColor);
        UIActions.setModalVisible(!visible);
        setTimeout(() => {
            modalSW = true;
        },500);
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
        const {visible} = this.props;
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

                <Modal visible={visible} onHide={this.onHide} title={'알림'}>                
                    <div>
                        <MainNotice>
                            선택하신 색상은 다른 가족과<br/>
                            이미 연동되어 있습니다.<br/>
                            <br/>
                            <OrangeText>
                                무시하고 연동하겠습니까?
                            </OrangeText>
                        </MainNotice>
                        
                        <BtnDoubleModal
                            onClickEvent1={this.onSetTagColor}
                            onClickEvent2={this.onHide}
                            name1={'확인'}
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
        loginUserInfo: state.auth.get('loginUserInfo'),
        profile: state.auth.getIn(['register','base','profile']),
        base: state.auth.getIn(['register','base']),
        checkTagColor: state.auth.get('checkTagColor'),
        success: state.auth.getIn(['register','base','profile','success']),
        visible: state.ui.getIn(['modal','visible'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(SettingProfileContainer);

