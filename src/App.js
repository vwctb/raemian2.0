import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, Control, ControlLight, ControlHeating,ControlHeatingItem, ControlGas, 
         ControlConcent, ControlAircon,ControlAirconItem, ControlGuard, ListView,Talk, Auth, Signup, SetFamilyGroup, 
         SetProfile, SetAlrim, DeleteFamilyGroup,Test,Complete,ReserveControlGoout,ReserveControlWakeup,
         ListViewVisitors,ListViewVisitorContent,ListViewCCTV,ListViewCCTVContent,ListViewNotices,ListViewNoticeContent,ListViewComehomes,ListViewFlocs,ListViewPlocs,ListViewParcels,
         FSchedules,FSchedulesAdd,FSchedulesUpdate,Fmsgs,FmsgsWrite,FmsgsView
        } from 'pages';

import storage from 'lib/storage';
import Menu from 'components/Menu'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
import * as uiActions from 'redux/modules/ui';
import * as KEY from 'lib/raemianAES';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import { Spinner } from 'components/Shared';
import configureStore from 'redux/configureStore';
import socket from 'lib/socket';
import 'lib/cordova';
import 'lib/plugin_natice_interface';
class App extends Component { 
    static contextTypes = {
        router: PropTypes.object
    }
    
    async initializeUserInfo(){
        const { history } = this.context.router;
        const strAgent = navigator.userAgent.toLowerCase();
        console.log('strAgent',strAgent);
        console.log('window', window);
        console.log('module', module.device);
        console.log('module', module.device.uuid);
        alert('module', module.device.uuid);

        if(!history.location.pathname.match('auth')){
            const { AuthActions } = this.props;
            const dummy = new Date().getTime();
            const data = KEY.encryptedKey(JSON.stringify({uuid:'uuidkey10120202',dummy:dummy}));
            try {
                await AuthActions.postLogin({'data':data});
            } catch(e) {
                  console.log(e);
            }
            const {usertoken, result} = this.props.loginUserInfo;    
            console.log(this.props.loginUserInfo);
            
            if(result !== 'true') {   
                try {
                    await AuthActions.getHomeBgs(usertoken);
                } catch(e) {
                    console.log(e);
                }
            }   

        }
        if(this.props.loginUserInfo.result === 'fail'){
            history.push('/auth');
        }
    }

    componentWillReceiveProps(){
        const { history } = this.context.router;
        //console.log(this);
        if(history.location.pathname.match('control')){
           // socket.initialize(store, socketURI,'usertoken',this.props.UIAction);
        }else{
           // socket.disconnect();
        }
    }

    componentWillMount() {
        this.initializeUserInfo();
    }

    render() {
        const {spinner} = this.props;

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
                
                <Menu/>
                <Route exact path="/auth/" component={Auth}/>
                <Route exact path="/auth/signup" component={Signup}/>
                <Route exact path="/auth/setFamilyGroup" component={SetFamilyGroup}/>
                <Route exact path="/auth/deleteFamilyGroup" component={DeleteFamilyGroup}/>
                <Route exact path="/auth/setProfile" component={SetProfile}/>
                <Route exact path="/auth/setAlrim" component={SetAlrim}/>
                <Route exact path="/auth/complete" component={Complete}/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/control/" component={Control}/>
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
                <Route exact path="/test/" component={Test}/>
            </div>
        );
    }
}


export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo'),
        spinner: state.ui.get('spinner')
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UIAction: bindActionCreators(uiActions, dispatch),
    })
   
)(App);

//export default App