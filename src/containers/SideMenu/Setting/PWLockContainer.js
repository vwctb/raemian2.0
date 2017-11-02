import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Wrapper, SubTitle } from 'components/Menu/SideMenu/Setting/Shared'
import {KeyPadNumContainer} from 'containers/Shared'
import {BtnSingle} from 'components/Shared';
import * as authActions from 'redux/modules/auth';
import * as uiActions from 'redux/modules/ui';
import { bindActionCreators } from 'redux';
import * as KEY from 'lib/raemianAES';
import storage from 'lib/storage';

let passInput = '○○○○';
class PWLockContainer extends Component {


    componentDidMount() {
        const { AuthActions } = this.props;
        AuthActions.setCheckboxUsePassLock(storage.get('screenLockUse'));   
    }

    componentWillUnmount(){
        const { AuthActions } = this.props;
        AuthActions.changeInputLockPass("");
        passInput = '○○○○';
    }

    handleUpdate = async () => {
        const { AuthActions,UIActions } = this.props;
        const { usertoken } = this.props.loginUserInfo;
        const { use, pass } = this.props.lockPass.toJS();
       
        const newPass = KEY.encryptedKey(JSON.stringify(pass));

        const jsonData = {
            use:use,
            pass:newPass
        }

        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        
       // console.log('jsonData :',jsonData);
        UIActions.setSpinnerVisible(true);
        try {
            await AuthActions.putCPS({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
        const { success } = this.props.lockPass.toJS();
        if(success){
            const {changeSideMenuView} = this.props;
            storage.set('screenLockUse',use);
            changeSideMenuView({sideViewIndex:0});
        }
    }

    pwlockCheckEvent = () => {
        const { AuthActions } = this.props;
        const { use } = this.props.lockPass.toJS();
        AuthActions.setCheckboxUsePassLock(!use);
        if(use === true){
            storage.set('screenLockUse',false);
        }

    }

    onClickEvent = (e) =>{
        //console.log(e.target.innerHTML);
        const { AuthActions } = this.props;
        const { pass, use } = this.props.lockPass.toJS();
        let value = '○○○○';
        //console.log(pass.length);
        if(pass.length === 0){
            value ='●○○○';
        }else if(pass.length === 1){
            value ='●●○○';
        }else if(pass.length === 2){
            value ='●●●○';
        }else if(pass.length === 3){
            value ='●●●●';
        }
       
        /*
        if(lockPass.length >= 3){
           value = '○○○○';
           AuthActions.changeInputLockPass("");
        }*/
       
        passInput = value;
        if(pass.length > 3)return;
        AuthActions.changeInputLockPass(pass+e.target.innerHTML);

  

    }

    onClickEventDelete = () => {
        //console.log('delete');
        const { AuthActions } = this.props;
        const { pass } = this.props.lockPass.toJS();
        let value = '○○○○';
        //console.log(pass.length);
        if(pass.length === 0)return;
        let newLockPass = pass.substring(0,pass.length-1);
        AuthActions.changeInputLockPass(newLockPass);

        if(pass.length === 4){
            value ='●●●○';
        }else if(pass.length === 3){
            value ='●●○○';
        }else if(pass.length === 2){
            value ='●○○○';
        }else if(pass.length === 1){
            value ='○○○○';
        }
        passInput = value;
        
    }



    render() {

       const { pass, use, notice } = this.props.lockPass.toJS();
       
        return (
            <Wrapper>
                <SubTitle
                    title = {'앱 실행시 비밀번호 잠금 사용'}
                    useCheckBox = {true}
                    onCheckEvent = {this.pwlockCheckEvent}
                    checkValue = {use}
                />

                {
                    use &&
                <div>
                    
                    <KeyPadNumContainer
                        notice={notice}
                        passInput={passInput}
                        onClickEventDelete = {this.onClickEventDelete}
                        onClickEvent= {this.onClickEvent}
                    />
                    <BtnSingle
                        onClickEvent={this.handleUpdate}
                        name={'적 용'}
                    />
                </div>
            }
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        visible: state.ui.getIn(['modal','visible']),
        lockPass: state.auth.getIn(['setting','lockPass']),
        loginUserInfo: state.auth.get('loginUserInfo')
        
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UIActions:bindActionCreators(uiActions,dispatch)
    })
   
)(PWLockContainer);