import React, { Component } from 'react';
import { connect } from 'react-redux';
import FmsgWriteList from 'components/Talk/FmsgWriteList';
import {BtnSingle} from 'components/Shared'

import { bindActionCreators } from 'redux';
import * as talkActions from 'redux/modules/talk';
import * as uiAction from 'redux/modules/ui';
import * as KEY from 'lib/raemianAES';
import PropTypes from 'prop-types';

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
    
    handleChangeFile = (e) => {
      const { TalkActions} = this.props;
      const name = e.target.files[0].name;
      const type =  e.target.files[0].type;
      if(e.target.files[0] && type.split('/')[0] === 'image'){
        let reader = new FileReader();
        reader.onload = function (e) {
            TalkActions.setFmsgsWriteUploadFile(
               {
                    fileData:e.target.result,
                    fileName:name,
                    fileType:type
                } 
            )
        }
        reader.readAsDataURL(e.target.files[0]);
      }

      if(e.target.files[0] && type.split('/')[0] === 'video'){
        var URL = window.URL || window.webkitURL
          var file = e.target.files[0]
          var fileURL = URL.createObjectURL(file)
          TalkActions.setFmsgsWriteUploadFile(
            {
                 fileData:fileURL,
                 fileName:name,
                 fileType:type
             } 
         )
      }
    }

    handleChangeInput = (e) => {
        const { TalkActions } = this.props;
        const { value } = e.target;
        TalkActions.changeInputFmsgsWrite(value);
    }


    HandleClickSendMsg = async ( ) => {
        const { TalkActions, UIActions } = this.props;
        const { usertoken } = this.props.loginUserInfo;
        const {msg, receivetime, receiverkey, fileid} = this.props.write.toJS();

        if(receiverkey.size === 0){
            alert('받는 가족을 선택해주세요!'); 
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
        const {writeSuccess} = this.props;
       
        if(writeSuccess) {
            const { history } = this.context.router;
            history.push('/talk/fmsgs');
        }else{
            alert('메시지 전송을 실패하였습니다.')
        }
    }


    render() {
        const {listArray,write,TalkActions,receiverkey,uploadFile} = this.props;
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
        writeSuccess : state.talk.getIn(['fmsgs','write','success']),
    }),
    (dispatch) => ({
        TalkActions: bindActionCreators(talkActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(FmsgsWriteContainer);

