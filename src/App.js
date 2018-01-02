import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Control, ControlLight, ControlHeating,ControlHeatingItem, ControlGas, 
         ControlConcent, ControlAircon,ControlAirconItem, ControlGuard, ListView,Talk, Auth, Signup, SetFamilyGroup, 
         SetProfile, SetAlrim, DeleteFamilyGroup,Test,Complete,ReserveControlGoout,ReserveControlWakeup,
         ListViewVisitors,ListViewVisitorContent,ListViewCCTV,ListViewCCTVContent,ListViewNotices,ListViewNoticeContent,ListViewComehomes,ListViewFlocs,ListViewPlocs,ListViewParcels,
         FSchedules,FSchedulesAdd,FSchedulesUpdate,Fmsgs,FmsgsWrite,FmsgsView,FTalks
        } from 'pages';

import Menu from 'components/Menu';
import ScreenLock from 'components/ScreenLock';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
import * as uiActions from 'redux/modules/ui';
import * as talkActions from 'redux/modules/talk';
import * as homeActions from 'redux/modules/home';
import * as KEY from 'lib/raemianAES';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import { Spinner } from 'components/Shared';
import storage from 'lib/storage';
import * as proxyServer from 'lib/proxyServer';


let isFirstLoad = true;
class App extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    async componentWillMount() {
        //console.log('componentWillMount');
        const { history } = this.context.router;
        //const strAgent = navigator.userAgent.toLowerCase();
        //alert('uuid2:'+window.device.uuid);
        //alert('uuid3:'+window.deviceId);
        const { loginUserInfo } = this.props
        const { usertoken } = loginUserInfo.toJS();   
       // if(usertoken === null){
            if(!history.location.pathname.match('auth')){
              //  this.login();
            }
       // }
        //document.addEventListener("resume", this.onResume, false);
        document.addEventListener("deviceready", this.onResume, false);
        //document.addEventListener("pause", this.onPause, false);
    }

    componentWillUpdate(nextProps, nextState) {
        const { UIActions , spinner} = this.props;
        if(!isFirstLoad){
            const { history } = this.context.router;
            const { loginUserInfo } = this.props
            const { usertoken } = loginUserInfo.toJS();   
            console.log('usertoken:',usertoken); 
            UIActions.getNewTalks(usertoken);
            if(!history.location.pathname.match('auth')){
                if(usertoken === undefined || usertoken === null){
                   // this.login();
                }
            }

            if(spinner){
                UIActions.setSpinnerVisible(false); 
            }
        }
        
    }

    async componentDidMount(){
        const { history } = this.context.router;
        const { HomeActions } = this.props;
        if(!history.location.pathname.match('auth')){
            if(storage.get('screenLockUse')){
                HomeActions.setLockVisible(true);
            }
        }
        this.login();
    }

    login = async()=>{

        console.log('login');
        const { history } = this.context.router;
        const { AuthActions, UIActions} = this.props;

        
        UIActions.setSpinnerVisible(true);
        const dummy = new Date().getTime();
       // const data = KEY.encryptedKey(JSON.stringify({uuid:'uuidkey10120202',dummy:dummy}));
       const uuid = window.deviceId ? window.deviceId : 'uuidkey10120202';
       const pushid = window.tokenId ? window.tokenId : 'tokenid10120202';
       const data = KEY.encryptedKey(JSON.stringify({uuid:uuid,dummy:dummy,pushid:pushid}));
       AuthActions.setUUID(uuid);
       AuthActions.setPUSHID(pushid);

        try {
            await AuthActions.postLogin({'data':data}); 
        } catch(e) {
              console.log('login error: ',e);
        }

        const {loginUserInfo} = this.props
        const {result,usertoken} = loginUserInfo.toJS();  
        isFirstLoad=false;

        if(result === 'fail'){
            history.push('/auth');
        }

        UIActions.getNewTalks(usertoken);
        UIActions.setSpinnerVisible(false);
    }

    onResume = () => {
        const { history } = this.context.router;        
        const { HomeActions,UIActions,loginUserInfo } = this.props;
        const { usertoken } = loginUserInfo.toJS();  
        if(!history.location.pathname.match('auth')){
            UIActions.getNewTalks(usertoken);
            if(storage.get('screenLockUse')){
                HomeActions.setLockVisible(true);
            }
       
        }
    }

    onPause = () => {
        
    }

    render() {
        const {spinner , visible} = this.props;

        return (
            <div>
                {
                    spinner &&
                    <Spinner>
                            <ClipLoader
                                color={'#50bbcd'} 
                                size={50}
                                loading={true} 
                                />
                    </Spinner>
                }
                {
                    visible &&
                    <ScreenLock/>
                }

                <Menu/>
                <Route exact path="/auth/" component={Auth}/>
                <Route exact path="/auth/signup" component={Signup}/>
                <Route exact path="/auth/setFamilyGroup" component={SetFamilyGroup}/>
                <Route exact path="/auth/deleteFamilyGroup" component={DeleteFamilyGroup}/>
                <Route exact path="/auth/setProfile" component={SetProfile}/>
                <Route exact path="/auth/setAlrim" component={SetAlrim}/>
                <Route exact path="/auth/complete" component={Complete}/>
                <Route exact path="/" component={Home}/>
                <Switch>
                <Route exact path="/control/" component={Control}/>
                <Route exact path="/control/gooutAction/:ok" component={Control}/>
                </Switch>
                <Route exact path="/control/light" component={ControlLight}/>
                <Switch>
                    <Route exact path="/control/heating/:name" component={ControlHeatingItem}/>
                    <Route exact path="/control/heating" component={ControlHeating}/>
                </Switch>
                <Route exact path="/control/ReserveControlGoout" component={ReserveControlGoout}/>
                <Route exact path="/control/ReserveControlWakeup" component={ReserveControlWakeup}/>
                <Route exact path="/control/gas" component={ControlGas}/>
                <Route exact path="/control/concent" component={ControlConcent}/>
                <Switch>
                    <Route exact path="/control/aircon/:name" component={ControlAirconItem}/>
                    <Route exact path="/control/aircon" component={ControlAircon}/>
                </Switch>
                <Route exact path="/control/guard" component={ControlGuard}/>
                <Route exact path="/listview/" component={ListView}/>
                <Switch>
                    <Route exact path="/listview/visitors/:index" component={ListViewVisitorContent}/>
                    <Route exact path="/listview/visitors" component={ListViewVisitors}/>
                </Switch>
                <Switch>
                    <Route exact path="/listview/notices/:index" component={ListViewNoticeContent}/>
                    <Route exact path="/listview/notices" component={ListViewNotices}/>
                </Switch>
                <Switch>
                    <Route exact path="/listview/cctvs/:index :name" component={ListViewCCTVContent}/>
                    <Route exact path="/listview/cctvs" component={ListViewCCTV}/>
                </Switch>
                <Route exact path="/listview/parcels" component={ListViewParcels}/>
                <Route exact path="/listview/comehomes" component={ListViewComehomes}/>
                <Route exact path="/listview/plocs" component={ListViewPlocs}/>
                <Route exact path="/listview/flocs" component={ListViewFlocs}/>
                <Route exact path="/talk/" component={Talk}/>
                <Route exact path="/talk/fschedules/update/:seq" component={FSchedulesUpdate}/>
                <Route exact path="/talk/fschedules/add" component={FSchedulesAdd}/>
                <Route exact path="/talk/fschedules" component={FSchedules}/>
                <Route exact path="/talk/fmsgs" component={Fmsgs}/>
                <Route exact path="/talk/fmsgs/write" component={FmsgsWrite}/>
                <Route exact path="/talk/fmsgs/view/:seq" component={FmsgsView}/>
                <Route exact path="/talk/chat_room" component={FTalks}/>
                
                <Route exact path="/test/" component={Test}/>



               
            </div>
        );
    }
}


export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo'),
        fschedulesList: state.talk.getIn(['fschedule','list']),
        date: state.talk.get('date'),
        spinner: state.ui.get('spinner'),
        screenLockUse: state.auth.getIn(['setting','lockPass','use']),
        visible: state.home.getIn(['screenLock','visible'])
    }),
    (dispatch) => ({
        HomeActions:bindActionCreators(homeActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
        TalkActions: bindActionCreators(talkActions, dispatch),
        UIActions: bindActionCreators(uiActions, dispatch),
    })
   
)(App);

//export default App