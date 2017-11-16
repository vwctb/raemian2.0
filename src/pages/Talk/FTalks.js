import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as talkActions from 'redux/modules/talk';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FTalksContainer } from 'containers/Talk';
import socket from 'lib/socket';

class FTalks extends Component {

    async componentDidMount() {
        const { UIActions } = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        socket.initialize(window.store, window.socketURI, usertoken, 'ftalks');
        UIActions.setPageType({pageType:'/talk'});
        UIActions.setHeaderTitle({title:'가족대화방'});

    }

    componentWillUnmount(){
        socket.disconnect();
        window.removeEventListener('scroll', this.handleScroll);
    }
   
    render() {
         return (
            <FTalksContainer/>
        )
    };

};

export default connect(
    (state) => ({
        loginUserInfo:state.auth.get('loginUserInfo'),
        
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        TalkActions : bindActionCreators(talkActions, dispatch)        
    })
)(FTalks);

