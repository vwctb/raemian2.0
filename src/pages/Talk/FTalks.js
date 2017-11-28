import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as talkActions from 'redux/modules/talk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FTalksContainer } from 'containers/Talk';
import socket from 'lib/socket';
import {TalkInput} from 'components/Shared'
import * as KEY from 'lib/raemianAES';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import moment from 'moment';

const Wrapper = styled.div`

`;

let tempFile = null;
let tempType = null;
class FTalks extends Component {

    async componentDidMount() {
        const { UIActions } = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        socket.initialize(window.store, window.socketURITalk, usertoken, 'ftalks');
        UIActions.setPageType({pageType:'/talk'});
        UIActions.setHeaderTitle({title:'가족대화방'});
        const height = window.innerHeight
        console.log('height:',height);
        //this.talkWrapper.style.height = height+"px";
    }

    componentWillUnmount(){
        socket.disconnect();
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleChangeInput = (e) => {
        //window.myRef.scrollTop = window.myRef.scrollHeight;
        this.props.TalkActions.changeInputFtalkWrite(e.target.value);
    }

    handleFocus = (value) => {
       const { TalkActions } = this.props;
       TalkActions.setFtalksInputFocus(value);
       window.myRef.scrollTop = window.myRef.scrollHeight;
    }


    handleClickSendMsg = async () => {
        const { TalkActions, UIActions, uploadFile, sendMsg } = this.props;
        const { usertoken, } = this.props.loginUserInfo.toJS();
        //const {  } = this.props.uploadFile;

        const { msg } = sendMsg.toJS();
        if(msg === ''){
            alert('메시지를 입력해주세요!'); 
            return;
        }

        const { icon, img } = this.props.profile.toJS();
        const insertDate = moment().format('YYYY-MM-DD HH:mm:ss');
        const newMsg ={
            message:msg,
            insertDate:insertDate,
            userToken:usertoken,
            alias:'',
            userIcon:icon,
            userImg:img,
            filePath:'',
            thumbPath:'',
            fileFlag:false,
            fileType:'',
        }
        const jsonData = {
            msg:msg
        }
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        //UIActions.setSpinnerVisible(true);
        try {
            await TalkActions.receiveFtalksNewMsg({value:newMsg,userToken:usertoken});
            window.myRef.scrollTop = window.myRef.scrollHeight;
            await TalkActions.postFtalksSendMessage({data:data,usertoken:usertoken});

        } catch(e) {
            console.log(e);
        }
        //UIActions.setSpinnerVisible(false);
        const { successSendMsg } = this.props.sendMsg.toJS();
     
  
        if(successSendMsg) {
          
            
        }else{
            alert('메시지 전송을 실패하였습니다.');
        }
    }

       
    handleChangeFile = async (e)=>{

        const { TalkActions, UIActions } = this.props;
        if(e.target.files.length === 0) return;
        
        tempType =  e.target.files[0].type;
        tempFile = e.target.files[0];


        const { usertoken } = this.props.loginUserInfo.toJS();
        const type = (tempType.split('/')[0] === 'image' ? 'imageUpload' : 'videoUpload');

        let formData = new FormData();
        formData.append("uploadFile",e.target.files[0]);

        let size =  Math.round((e.target.files[0].size/1024)/1024);
        let fileSizeMax = (type === 'imageUpload') ? 10 : 50;

        if(size > fileSizeMax){
            alert("파일의 용량은 "+fileSizeMax+"MB를 초과할 수 없습니다.")
            return;
        }

        UIActions.setSpinnerVisible(true);

        try {
            window.isFirstLoad = true;
            await TalkActions.postFtalksUploadFile({type:type,uploadFile:formData,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
        const { successUploadFile } = this.props.sendMsg.toJS();
        if(!successUploadFile) {
            alert('업로드 실패');
        }
        
    }
        
    render() {
         return (
             <Wrapper innerRef={ref=>this.talkWrapper=ref}>
                <FTalksContainer/>
                <TalkInput
                        handleFocus={this.handleFocus}
                        sendMsg={this.props.sendMsg}
                        handleChangeFile={this.handleChangeFile}
                        handleClickSendMsg={this.handleClickSendMsg}
                        handleChangeInput={this.handleChangeInput}
                />
            </Wrapper>
        )
    };

};

export default connect(
    (state) => ({
        loginUserInfo:state.auth.get('loginUserInfo'),
        profile:state.auth.getIn(['register','base','profile']),
        sendMsg: state.talk.get('ftalksSendMsg')
        
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        TalkActions : bindActionCreators(talkActions, dispatch)        
    })
)(FTalks);

