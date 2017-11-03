import React, { Component } from 'react';
import Header from './Header'
import Sidebar from 'react-sidebar'
import SideItemContainer from 'containers/SideMenu/SideItemContainer'
import { connect } from 'react-redux';
import * as homeActions from 'redux/modules/home';
import * as uiActions from 'redux/modules/ui';
import * as authActions from 'redux/modules/auth';
import * as talkActions from 'redux/modules/talk';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as KEY from 'lib/raemianAES';

class Menu extends Component {
    static contextTypes = {
        router: PropTypes.object
	}
    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false
        }
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }

    onSetSidebarOpen = (open) => {
        this.setState({sidebarOpen: open});
    }

    clickEventSlideOpen = () => {
        document.getElementById("sideMenuWrapper").scrollTop = 0;
        this.setState({sidebarOpen: true});
    }

    clickEventSlideClose = () => {
        this.setState({sidebarOpen: false});
        this.changeSideMenuView({sideViewIndex:0,sideViewTitle:'전체 메뉴'});
    }
    onClickBackPage = () => {
        const { pageType,TalkActions } = this.props;
        const{ history } = this.context.router;
        history.push(pageType);
        if(pageType === '/talk/fmsgs'){
            TalkActions.setInitalFmsgsView();
        }


    }

    logoClick = async () => {
   
            const { AuthActions, UIActions} = this.props;
            
           // UIActions.setSpinnerVisible(true);
            
            const dummy = new Date().getTime();
           // const data = KEY.encryptedKey(JSON.stringify({uuid:'uuidkey10120202',dummy:dummy}));
           const uuid = window.deviceId ? window.deviceId : 'uuidkey10120202';
           const pushid = window.tokenId ? window.tokenId : 'tokenid10120202'
           const data = KEY.encryptedKey(JSON.stringify({uuid:uuid,dummy:dummy}));
           AuthActions.setUUID(uuid);
           AuthActions.setPUSHID(pushid);
            try {
                await AuthActions.postLogin({'data':data});
            } catch(e) {
                  console.log('login error: ',e);
            }
            const {loginUserInfo} = this.props
        
           // UIActions.setSpinnerVisible(false);
            
        
    }

    changeSideMenuView = async (sideView) => {
        const { UIActions, AuthActions } = this.props;
        const {usertoken} = this.props.loginUserInfo;
        
        UIActions.changeSideMenuView(sideView);
        //console.log('sideView:',sideView.sideViewIndex);
        UIActions.setSpinnerVisible(true);
        try {
            switch(sideView.sideViewIndex){
                case 1 :  // 1. 비밀번호잠금
                    //await AuthActions.getHomeBgs(usertoken);
                    break;
                case 2 :  // 2. 홈 배경 변경
                    await AuthActions.getHomeBgs(usertoken);
                    break;
                case 3 : // 3. 알림 설정
                    await AuthActions.getAlarms(usertoken);
                    break;
                case 4 : // 4. 프로필 관리
                    await AuthActions.getInitialProfile(usertoken);
                    break;
                case 5 : // 5. 가족관리
                    await AuthActions.getInitialFamilyGroupSetting(usertoken);
                    
                    break;
                case 6 : // 6. 스마트폰 출입
                    await AuthActions.getRobbycfs(usertoken);
                    break;
                default : // 7. 버전정보
                    //await AuthActions.getHomeBgs(usertoken);
                    break;
            }
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);

    }

    render() {
        const { pageType, title,sideView } = this.props;
        const { sideViewIndex, sideViewTitle } = this.props.sideView.toJS();

        const style ={
            sidebar: {
                zIndex: 200,
                background:'#3e454b',
                width: '90%',
                overflow:'none !important'
            },
            overlay: {
                zIndex: 199,
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }
        }

        const sideBar = 
            <div>
                <SideItemContainer
                    slideBack= {this.clickEventSlideClose}
                    sideViewIndex={sideViewIndex}
                    changeSideMenuView = {this.changeSideMenuView}
                    sideViewTitle={sideViewTitle}
                />
            </div>
        ;

        return(
               <div>
                    <Sidebar sidebar={sideBar}
                            open={this.state.sidebarOpen}
                            onSetOpen={this.onSetSidebarOpen}
                            pullRight={true}
                            shadow={false}
                            touch={false}
                            styles={style}>
                            <div></div>
                    </Sidebar>
                    <Header
                            sideOpen = {this.clickEventSlideOpen}
                            pageType = {pageType}
                            title = {title}
                            sideBack= {this.onClickBackPage}
                            logoClick = {this.logoClick}
                    />
                </div>
        )
    }
}

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo'),
        sideOpen: state.ui.getIn(['sideMenu','sideOpen']),
        sideView: state.ui.getIn(['sideMenu','sideView']),
        pageType: state.ui.getIn(['roots', 'pageType']),
        title: state.ui.getIn(['roots', 'title'])
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
        HomeActions: bindActionCreators(homeActions, dispatch),
        TalkActions: bindActionCreators(talkActions, dispatch),
    })
)(Menu);


