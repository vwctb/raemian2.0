import React, { Component } from 'react';
import { connect } from 'react-redux';
import FTalkList from 'components/Talk/FTalkList';
import {TalkInput} from 'components/Shared'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as talkActions from 'redux/modules/talk';
import * as uiAction from 'redux/modules/ui';
import * as KEY from 'lib/raemianAES';


let sendLastTime = null, beforeScrollTop =0;
let tempFile = null;
let tempType = null;

class FTalksContainer extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        this.load(null);
        window.myRef.addEventListener('scroll', this.handleScroll);
    }

    load = async (_lasttime) => {
        //console.log('_lasttime :',_lasttime);
        sendLastTime = _lasttime;
        const { UIActions, TalkActions } = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        UIActions.setSpinnerVisible(true);
        try {
            console.log('beforeScrollTop :',beforeScrollTop);
            await TalkActions.getFTalksList({lasttime:_lasttime,usertoken:usertoken});
            if(_lasttime === null){
                window.myRef.scrollTop = window.myRef.scrollHeight;
            }else{
                window.myRef.scrollTop = window.myRef.scrollHeight - beforeScrollTop;
            }
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }

    // 스크롤 리스너
    handleScroll = () => {
        const { beforeLastTime } = this.props;
        if(window.myRef.scrollTop < 200){
            if((sendLastTime == null && beforeLastTime != null) || (sendLastTime != null && beforeLastTime > 0 && sendLastTime > beforeLastTime)){
                beforeScrollTop = window.myRef.scrollHeight;
                this.load(beforeLastTime);
            }
        }
    }
    
    componentWillUnmount(){
        const { TalkActions } = this.props;
        TalkActions.initial('ftalks');
        window.removeEventListener('scroll', this.handleScroll);
    }

    HandleClickWriteMsg = () => {
        const{ history } = this.context.router;
        history.push('/talk/fmsgs/write');
    }

    itemClick = (seq) => {
        const{ history } = this.context.router;
        history.push('/talk/fmsgs/view/'+seq);
    }

    handleClickSendMsg = async () => {
        const { TalkActions, UIActions, uploadFile, sendMsg } = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        //const {  } = this.props.uploadFile;

        const { msg } = sendMsg.toJS();
        if(msg === ''){
            alert('메시지를 입력해주세요!'); 
            return;
        }
        const jsonData = {
            msg:msg
        }
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        UIActions.setSpinnerVisible(true);
        try {
            await TalkActions.postFtalksSendMessage({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
        const { successSendMsg } = this.props.sendMsg.toJS();
        if(!successSendMsg) {
            alert('메시지 전송을 실패하였습니다.')
        }
    }


    handleChangeInput = (e) => {
        const { TalkActions } = this.props;
        const { value } = e.target;
        TalkActions.changeInputFtalkWrite(value);
    }

    handleFocus = (value) => {
       const { TalkActions } = this.props;
       TalkActions.setFtalksInputFocus(value);
       //window.myRef.scrollTop = window.myRef.scrollHeight;
    }
    
    handleChangeFile = async (e)=>{

      const { TalkActions} = this.props;
      tempType =  e.target.files[0].type;
      tempFile = e.target.files[0];

      const { usertoken } = this.props.loginUserInfo.toJS();
      const type = (tempType.split('/')[0] === 'image' ? 'imageUpload' : 'videoUpload');

      let formData = new FormData();
      formData.append("uploadFile",e.target.files[0]);
      try {
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
        const {listArray,userArray,sendMsg} = this.props;

        return (
            <div>
                <FTalkList listArray={listArray.reverse()} userArray={userArray} itemClick={this.itemClick} focus={false} handleFocus={this.handleFocus}  />
                <TalkInput
                    handleFocus={this.handleFocus}
                    sendMsg={sendMsg}
                    handleChangeFile={this.handleChangeFile}
                    handleClickSendMsg={this.handleClickSendMsg}
                    handleChangeInput={this.handleChangeInput}
                />
            </div>
        )
    };
};

export default connect(
    (state) => ({
        beforeLastTime:state.talk.getIn(['ftalks','lasttime']),
        listArray: state.talk.getIn(['ftalks','list']),
        userArray: state.talk.getIn(['ftalks','user']),
        sendMsg: state.talk.get('ftalksSendMsg'),
        loginUserInfo: state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        TalkActions: bindActionCreators(talkActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(FTalksContainer);

