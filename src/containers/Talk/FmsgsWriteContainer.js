import React, { Component } from 'react';
import { connect } from 'react-redux';
import FmsgWriteList from 'components/Talk/FmsgWriteList';
import {BtnSingle} from 'components/Shared'
import { bindActionCreators } from 'redux';
import * as talkActions from 'redux/modules/talk';
import * as uiAction from 'redux/modules/ui';
import * as KEY from 'lib/raemianAES';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {BtnSingleModal, Modal, Dimmed} from 'components/Shared';

const MainNotice = styled.div`
    width: 100%;
    font-size:1rem;
    text-align:center;
    padding: 1.5rem 1rem 1.5rem 1rem;
    line-height: 1.6rem;
    color:#49433c;
`;

let modalMsg='';
let modalSW=true;

let tempFile = null;
let tempType = null;
class FmsgsWriteContainer extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    receiverkeyEvnet = async (key) => {
        const { TalkActions} = this.props;
        try {
            await TalkActions.setFmsgsWriteReceiverkey(key);
        } catch(e) {
            console.log(e);
        }
    }
    handleChangeFile = async (e) => {
        const { TalkActions, UIActions , visible} = this.props;
        if(e.target.files.length === 0) return;
        const name = e.target.files[0].name;
        tempType =  e.target.files[0].type;
        tempFile = e.target.files[0];
        const size =  Math.round((e.target.files[0].size/1024)/1024);
        UIActions.setSpinnerVisible(true);

      if(e.target.files[0] && tempType.split('/')[0] === 'image'){
        if(size > 10){
            modalMsg = '이미지파일의 용량은 10MB를 초과할 수 없습니다.';
            UIActions.setModalVisible(!visible);
            setTimeout(() => {
                modalSW = true;
            },500);

            UIActions.setSpinnerVisible(false);
            return;
        }

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
                TalkActions.setFmsgsWriteUploadFile(
                    {
                        fileData:dataURL,
                        fileName:name,
                        fileType:tempType
                    }
                )
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);





      }

      if(e.target.files[0] && tempType.split('/')[0] === 'video'){
        if(size > 50){
            modalMsg = '이미지파일의 용량은 50MB를 초과할 수 없습니다.';
            UIActions.setModalVisible(!visible);
            setTimeout(() => {
                modalSW = true;
            },500);

            UIActions.setSpinnerVisible(false);
            return;
        }
        const URL = window.URL || window.webkitURL;
        const files = e.target.files[0];
        const fileURL = URL.createObjectURL(files);
          TalkActions.setFmsgsWriteUploadFile(
            {
                 fileData:fileURL,
                 fileName:name,
                 fileType:tempType
             } 
         )
      }

      const { usertoken } = this.props.loginUserInfo.toJS();
      const type = (tempType.split('/')[0] === 'image' ? 'imageUpload' : 'videoUpload');

      let formData = new FormData();
          formData.append("uploadFile",e.target.files[0]);
        try {
            await TalkActions.postFmsgsWriteUploadFile({type:type,uploadFile:formData,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }

       const { fileid, success } = this.props.msgFileupload.toJS();
       UIActions.setSpinnerVisible(false);
       if(success){
           TalkActions.setFmsgsWriteFileId(fileid);
       }else{

           modalMsg = '업로드를 실패하였습니다.';
           UIActions.setModalVisible(!visible);
           setTimeout(() => {
               modalSW = true;
           },500);
       }
      
    }

    handleChangeInput = (e) => {
        const { TalkActions } = this.props;
        const { value } = e.target;
        TalkActions.changeInputFmsgsWrite(value);
    }


    HandleClickSendMsg = async () => {
        const { TalkActions, UIActions, uploadFile, visible } = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        //const {  } = this.props.uploadFile;

        const { msg, receivetime, receiverkey, fileid } = this.props.write.toJS();
        if(receiverkey.size === 0){
            modalMsg = '받는 가족을 선택해주세요!';
            UIActions.setModalVisible(!visible);
            setTimeout(() => {
                modalSW = true;
            },500);
            return;
        }

        if(msg === null ||  msg === "" ||  msg === " " ||  msg === "  " || msg === undefined ){

            modalMsg = '메시지를 입력해주세요!';
            UIActions.setModalVisible(!visible);
            setTimeout(() => {
                modalSW = true;
            },500);

            return;
        }

        const jsonData = {
            msg:msg,
            receivetime:receivetime,
            receiverkey:receiverkey,
            fileid:fileid
        }

        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        UIActions.setSpinnerVisible(true);
        try {
            await TalkActions.sendFmsgs({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }

        UIActions.setSpinnerVisible(false);
        const { writeSuccess } = this.props;
        if( writeSuccess ) {
            const { history } = this.context.router;
            history.push('/talk/fmsgs');
        }else{
            modalMsg = '메시지 전송을 실패하였습니다.';
            UIActions.setModalVisible(!visible);
            setTimeout(() => {
                modalSW = true;
            },500);
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
        const {listArray, write, TalkActions, receiverkey, uploadFile, visible} = this.props;
        return (
            <div>
                
            <FmsgWriteList
                listArray={listArray} 
                write={write}
                uploadFile={uploadFile}
                handleChangeInput={this.handleChangeInput}
                handleChangeFile={this.handleChangeFile} 
                checkBoxEvent={TalkActions.checkboxFmsgsWrite} 
                receiverkey = {receiverkey} 
                receiverkeyEvnet={this.receiverkeyEvnet}  
                pageType={'listview/fmsgs'} 
            />
            
            <BtnSingle
                name={'전송'}
                onClickEvent={this.HandleClickSendMsg}
              />

              <Modal visible={visible} onHide={this.onHide} title={'알림'}>                
                    <div>
                        <MainNotice>
                           { modalMsg }
                        </MainNotice>
                        
                        <BtnSingleModal
                            onClickEvent = {this.onHide}
                            name = {'확인'}
                        />
                    </div>
                </Modal>
                <Dimmed visible={visible}/>

            </div>
        )
    };
};

export default connect(
    (state) => ({
        listArray: state.talk.getIn(['fmsgs','familys']),
        write:state.talk.getIn(['fmsgs','write']),
        receiverkey : state.talk.getIn(['fmsgs','write','receiverkey']),
        loginUserInfo: state.auth.get('loginUserInfo'),
        uploadFile : state.talk.getIn(['fmsgs','uploadFile']),
        msgFileupload: state.talk.getIn(['fmsgs','msgfileupload']),
        writeSuccess : state.talk.getIn(['fmsgs','write','success']),
        visible: state.ui.getIn(['modal','visible'])
    }),
    (dispatch) => ({
        TalkActions: bindActionCreators(talkActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(FmsgsWriteContainer);

