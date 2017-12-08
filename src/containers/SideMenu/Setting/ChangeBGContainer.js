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
import PropTypes from 'prop-types';
import  {BG_Basic} from 'img';
import * as SvgIcon from 'lib/icon_svg'
import FileInput from 'react-file-input';
import * as KEY from 'lib/raemianAES';
const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    background:#34393e;
    top:0;
    z-index: 0;
    color:white;
    font-size: 1rem;
    overflow-y: auto;
`;

const Input = styled.input`
    outline: none;
    width: 15rem;
    border-radius: 0px;
    margin-top: 1rem;
    font-size: 0.9rem;
    background: none;
    color: white;
    border: none;
    -webkit-text-align: center;
    text-align: center;
`;

const InputIcon = styled.div`
    position:absolute;
    width:15rem;
    height:0.5rem;
    margin-top: -0.1rem;
    border-left:1px solid #787d81;
    border-bottom:1px solid #787d81;
    border-right:1px solid #787d81;
`;

const InputSpace = styled.div`
    width:100%;
    text-align:center;
    padding: 1rem 0 2rem 0;
    background:#3e454b;
`;


const InputWrapper = styled.div`
    display:inline-block;
`;

const BasicImage = styled.div`
    width:7rem;
    height:5rem;
    border:1px solid gray;
    background-image: url(${BG_Basic});
	background-position: center;
	background-size: cover;
`;


const CustomImage = styled.img`
    width:7rem;
    height:5rem;
    border:1px solid gray;

`;

const FileInputSpace = styled.div`
    width:7rem;
    height:5rem;
    top: 9rem;
    z-index:100;
    position: fixed;
    opacity: 0;
    input {
        height:100%;
    }
    div {
        height:5rem;
    }
`;

const PhotoImage = styled.div`
    width:7rem;
    height:5rem;
    line-height: 5rem;
    font-size:0.8rem;
    color:#b5b6b8;
    border:1px solid gray;
`

const InputNotice =styled.div`
    width:100%;
    text-align:center;
    font-size: 0.6rem;
    margin-top: 1rem;
    color:#b5b6b8;
`;

const ImageSelectSpace = styled.div`
    width:100%;
    text-align:center;
    padding: 2.5rem 1.3rem 1.5rem 1.3rem;
    background:#3e454b;
    display:flex;
    justify-content:space-around;
    flex-wrap:wrap;
    
`;

const ImageSpace = styled.div`
    text-align:center;
    float:left;
`;

const Name = styled.div`
    width:7rem;
    height:5rem;
    line-height: 5rem;
    font-size:0.8rem;
    color:#b5b6b8;
    position:absolute;

`;


const CheckIcon = styled.div`
    position: absolute;
    margin-left: 6rem;
    margin-top: -1rem;
    svg {
        fill:#ffffff;
    }
`;
class SettingFamilyContainer extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    handleImageLoaded() {
        const { UIActions } = this.props;
        UIActions.setSpinnerVisible(false);
    }
    
    handleImageErrored() {
        const { UIActions } = this.props;
        UIActions.setSpinnerVisible(false);
    }

    
    handleClick  = async () => {
        const { AuthActions, UIActions } = this.props;
        UIActions.setSpinnerVisible(true);

        const { desc, phototype, img } = this.props.homebgs.toJS();
        const { usertoken, result } = this.props.loginUserInfo.toJS();
 

        const jsonData = {
            img:img,
            desc:desc,
            phototype:phototype,
        }
        console.log('this.props.homebgs : ',this.props.homebgs)
        console.log('jsonData:',jsonData);
        console.log('usertoken:',usertoken);
        if(result !== 'true') {   
            const data = KEY.encryptedKey(JSON.stringify(jsonData));
            try {
            await AuthActions.setHomeBgs({'data':data,'usertoken':usertoken});
            } catch(e) {
                console.log(e);
            }
            const { success } = this.props.homebgs.toJS();
            console.log('success:',success);
            if(success){
                UIActions.changeSideMenuView({sideViewIndex:0,sideViewTitle:'전체 메뉴'});
                AuthActions.setHomeHomeBgsImage(jsonData);
            }else{
                alert('파일 업로드를 실패하였습니다.');
            }
            UIActions.setSpinnerVisible(false);
        }
    }


    backClickEvent = () => {
        const { history } = this.context.router;
        history.push('/auth/setFamilyGroup');
    }

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { value } = e.target;
        if(value.length > 16)return;
        AuthActions.changeHomeTitleInput(value);
    }

   
    handleChangeFile = (e) => {
       
        const { AuthActions, UIActions } = this.props;
        if(e.target.files.length === 0) return;
        /* 
        
        UIActions.setSpinnerVisible(true);
    
          let reader = new FileReader();
          reader.onload = function (e) {
            AuthActions.setCheckboxHomeBGType(2);
            AuthActions.setHomeBgsImage(e.target.result);
          }
          reader.readAsDataURL(e.target.files[0]);
        }*/
       console.log('e.target.files:',e.target.files);
       const size =  Math.round((e.target.files[0].size/1024)/1024);
       if(size > 10){
           alert("이미지파일의 용량은 10MB를 초과할 수 없습니다.")
           return;
       }
        const type =  e.target.files[0].type;
        if(e.target.files[0] && type.split('/')[0] === 'image'){
            UIActions.setSpinnerVisible(true);
            let canvas = document.createElement('canvas');
            let ctx = canvas.getContext('2d');
            let reader = new FileReader();
            let ratio;
            reader.onload = function(event){
                var img = new Image();
                img.onload = function(){
                    if(img.width > img.height){
                    //가로 이미지
                    if(img.width > 1500){
                        ratio = 0.4;
                    } 
                    if(img.width > 3000){
                        ratio = 0.2;
                    }
                    }else{
                    //세로 이미지
                    if(img.height > 1500){
                        ratio=0.4;
                    }
                    if(img.height > 3000){
                        ratio=0.2;
                    }
                    }
                    canvas.width = img.width * ratio;
                    canvas.height = img.height * ratio;
                    ctx.imageSmoothingEnabled= true;
                    ctx.drawImage(img,0,0,img.width * ratio,img.height * ratio);
                    var dataURL = canvas.toDataURL();
                    AuthActions.setCheckboxHomeBGType(2);
                    AuthActions.setHomeBgsImage(dataURL);
                }
                img.src = event.target.result;
            }

            reader.readAsDataURL(e.target.files[0]);

            UIActions.setSpinnerVisible(false);
        }
    }
    basicImageClich=()=>{ 
        const { AuthActions} = this.props;
        AuthActions.setCheckboxHomeBGType(1);
    }


    handleKeyPressEvent = (e) => {
        if(e.key === 'Enter'){
            e.target.blur();
        }
    }

    render() {
        const {desc, phototype, img } = this.props.homebgs.toJS();
        const $CheckIcon = <CheckIcon dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('checkSmall')}} />;
        return (
            <Layout>
                <AuthHeader
                    btnVisible = {true}
                    titleName = {'홈 배경 변경'}
                    clickEvent = {this.backClickEvent}
                />
                <Wrapper>
                    <SubTitle
                        title = {'홈 배경 이미지 선택'}
                        useCheckBox = {false}
                    />
                    <ImageSelectSpace>
                        <ImageSpace>
                            {phototype === 1 && $CheckIcon}
                            <BasicImage onClick={this.basicImageClich}/>
                        </ImageSpace>
                        <ImageSpace>
                            {phototype === 2 && $CheckIcon}

                            <FileInputSpace>
                            <FileInput
                                    name="myImage"
                                    className="inputFileClass"
                                    onChange={this.handleChangeFile}
                                />
                            </FileInputSpace>
                            {
                            (img !== "") ?
                            <CustomImage 
                            src={img} 
                            onLoad={this.handleImageLoaded.bind(this)}
                            onError={this.handleImageErrored.bind(this)}
                            
                            >
                            </CustomImage>
                            :
                            <PhotoImage >
                                <Name>사진 선택</Name>
                               
                            </PhotoImage>
                            }
                       
                        </ImageSpace>
                    </ImageSelectSpace>
                    <SubTitle
                        title = {'홈 문구 변경'}
                        useCheckBox = {false}
                    />
                    <InputSpace>
                        <InputWrapper>
                            <Input 
                                onKeyPress={this.handleKeyPressEvent}
                                onChange = {this.handleChange}
                                value = {desc === null ? "행복한 래미안 하우스" : desc}
                            />
                            <InputIcon />
                            <InputNotice>{'(16자 이내)'}</InputNotice>
                        </InputWrapper>
                    </InputSpace>
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
        homebgs:state.auth.getIn(['setting','homebgs']),
        profile: state.auth.getIn(['register','base','profile']),
        base: state.auth.getIn(['register','base'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(SettingFamilyContainer);

