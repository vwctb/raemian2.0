import React, { Component } from 'react';
import { connect } from 'react-redux';
import FmsgViewList from 'components/Talk/FmsgViewList';
import {BtnDouble, BtnSingle} from 'components/Shared'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as talkActions from 'redux/modules/talk';
import * as uiAction from 'redux/modules/ui';
import * as KEY from 'lib/raemianAES';

class FmsgsWriteContainer extends Component {
    static contextTypes = {
        router: PropTypes.object
	}
    HandleClickDelete = async () => {
        const { seq } = this.props.msgViewData.toJS();
        const { usertoken } = this.props.loginUserInfo.toJS();
        const {TalkActions,UIActions} = this.props;
        const jsonData = {
            seq:seq
        }
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        UIActions.setSpinnerVisible(true);
        try {
            await TalkActions.deleteFmsgs({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
        const {deleteSuccess} = this.props;
        if(deleteSuccess){
            const{ history } = this.context.router;
            const {TalkActions} = this.props;

            TalkActions.setInitalFmsgsView();
            history.push('/talk/fmsgs');
        }


    }

    HandleClickWrite = () => {
        const{ history } = this.context.router;
        history.push('/talk/fmsgs/write');
    }

    render() {
        const {msgViewData,familysArray,userImageData} = this.props;
        const {fromto} = this.props.msgViewData.toJS();
        return (
            <div>
                <FmsgViewList 
                    msgViewData={msgViewData} 
                    familysArray={familysArray} 
                    userImageData={userImageData}  
                    pageType={'listview/fmsgs'} 
                />
                {
                    fromto === 'from' ? 
                    <BtnDouble
                        name1={'답장'}
                        color1={'50bbcd'}
                        onClickEvent1={this.HandleClickWrite}
                        name2={'삭제'}
                        color2={'ff8062'}
                        onClickEvent2={this.HandleClickDelete}
                        fcolor2={'ffffff'}
                    /> 
                    :
                    <BtnSingle
                        name={'삭제'}
                        color={'ff8062'}
                        onClickEvent={this.HandleClickDelete}
                    />
                }
            </div>
        )
    };
};

export default connect(
    (state) => ({
        msgViewData: state.talk.getIn(['fmsgs','view']),
        userImageData: state.talk.getIn(['fmsgs','user',0,'img']),
        familysArray: state.talk.getIn(['fmsgs','familys']),
        loginUserInfo: state.auth.get('loginUserInfo'),
        deleteSuccess:state.talk.getIn(['fmsgs','deleteSuccess'])
    }),
    (dispatch) => ({
        TalkActions: bindActionCreators(talkActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(FmsgsWriteContainer);

