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
import {BtnDoubleModal, Modal, Dimmed} from 'components/Shared';
import * as ori from 'lib/jpegOrientation';

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
        UIActions.setSpinnerVisible(true);

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
            AuthActions.initial('setting');
        }else{
            alert('프로필 수정 에러');
        }

     UIActions.setSpinnerVisible(false);


    }

    handleChangeFile = (e) => {

        /*
        if(e.target.files[0] && type.split('/')[0] === 'image'){
          let reader = new FileReader();
          reader.onload = function (e) {
            AuthActions.setProfileUploadFile(e.target.result);
            AuthActions.setProfileIcon(0);
          }
          reader.readAsDataURL(e.target.files[0]);
        }
        */
        const { AuthActions, UIActions} = this.props;
        UIActions.setSpinnerVisible(true);
        if(e.target.files.length === 0) return;
        const type =  e.target.files[0].type;
        const size =  Math.round((e.target.files[0].size/1024)/1024);
        if(size > 10){
            alert("이미지파일의 용량은 10MB를 초과할 수 없습니다.")
            return;
        }

           //이미지 회전
       const TO_RADIANS = Math.PI/180;
       let x=0,y=0;
       let orientation = 1;
        ori.getOrientation(e.target.files[0], function(_orientation) {
        orientation = _orientation;
        });

        if(e.target.files[0] && type.split('/')[0] === 'image'){
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let reader = new FileReader();
            let ratio;
            reader.onload = function(event){
                var img = new Image();
                img.onload = function(){
                    let width = img.width;
                    let height = img.height;
                    let degrees = 0;
                    if(orientation === 6){
                        degrees=90;
                    }else if(orientation === 8){
                        degrees=-90
                    }
                    if (degrees >= 360) degrees = 0;
                    if (degrees === 0 || degrees === 180 ) {
                        canvas.width = width;
                        canvas.height = height;
                    }
                    else {
                        // swap
                        canvas.width = height;
                        canvas.height = width;
                    }
                    ctx.save();
                    // you want to rotate around center of canvas
                    ctx.translate(canvas.width/2,canvas.height/2);
                    ctx.rotate(degrees*Math.PI/180);
                    ctx.drawImage(img, -width*0.5, -height*0.5);
                    ctx.restore();
                    let dataURL = canvas.toDataURL();
                    AuthActions.setProfileUploadFile(dataURL);
                    AuthActions.setProfileIcon(0);
                }
                img.src = event.target.result;
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


    handleImageLoaded() {
        const { UIActions } = this.props;
        UIActions.setSpinnerVisible(false);
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

