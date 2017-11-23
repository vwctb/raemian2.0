import React, { Component } from 'react';
import { connect } from 'react-redux';
import FTalkList from 'components/Talk/FTalkList';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as talkActions from 'redux/modules/talk';
import * as uiAction from 'redux/modules/ui';
import * as authActions from 'redux/modules/auth';


let sendLastTime = null, beforeScrollTop =0;

class FTalksContainer extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        this.load(null);
        window.myRef.addEventListener('scroll', this.handleScroll);
        window.isFirstLoad=true;
        
    }

    load = async (_lasttime) => {
        //console.log('_lasttime :',_lasttime);
        sendLastTime = _lasttime;
        const { UIActions, TalkActions, AuthActions } = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        UIActions.setSpinnerVisible(true);
        try {
            console.log('beforeScrollTop :',beforeScrollTop);
            await AuthActions.getInitialProfile(usertoken);
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
        if(window.myRef.scrollTop < 15){
            if((sendLastTime == null && beforeLastTime != null) || (sendLastTime != null && beforeLastTime > 0 && sendLastTime > beforeLastTime)){
                beforeScrollTop = window.myRef.scrollHeight;
                this.load(beforeLastTime);
            }

        }
        if(window.myRef.scrollTop < 200){
            window.isFirstLoad = false;
        }
    }
    
    componentWillUnmount(){
        const { TalkActions } = this.props;
        TalkActions.initial('ftalks');
        window.removeEventListener('scroll', this.handleScroll);
    }

 
    itemClick = (seq) => {
        const{ history } = this.context.router;
        history.push('/talk/fmsgs/view/'+seq);
    }

    handleLoaded = () => {
        console.log('handleLoaded');
        if(window.isFirstLoad){
            window.myRef.scrollTop = window.myRef.scrollHeight;
        }
        

    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.listArray !== this.props.listArray;
    }

    handleFocus = (value) => {
        const { TalkActions } = this.props;
        TalkActions.setFtalksInputFocus(value);
        //window.myRef.scrollTop = window.myRef.scrollHeight;
     }
 

    render() {
        const {listArray,userArray} = this.props;
        console.log('listArray:',listArray);
        if(listArray === undefined) return;
        return (
       
                <FTalkList listArray={listArray.reverse()} userArray={userArray} itemClick={this.itemClick} focus={false} handleFocus={this.handleFocus} handleLoaded={this.handleLoaded}   />
                
       
        )
    };
};

export default connect(
    (state) => ({
        beforeLastTime:state.talk.getIn(['ftalks','lasttime']),
        listArray: state.talk.getIn(['ftalks','list']),
        userArray: state.talk.getIn(['ftalks','user']),

        loginUserInfo: state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        TalkActions: bindActionCreators(talkActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(FTalksContainer);

