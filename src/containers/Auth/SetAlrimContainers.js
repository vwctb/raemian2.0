import React, { Component } from 'react';
import Layout from 'components/Layout';
import { SubTitle } from 'components/Menu/SideMenu/Setting/Shared'
import AuthHeader from 'components/Auth/AuthHeader';
import {BtnSingle} from 'components/Shared';
import * as authActions from 'redux/modules/auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as KEY from 'lib/raemianAES';
import CheckBoxList from 'components/Shared/CheckBoxList';



const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    background:#3e454b;
    top: 3.5rem;
    z-index: 0;
    color:white;
    font-size: 1rem;
    overflow-y: auto;
`;

const OnePassNotice = styled.div`
    width: 100%;
    text-align:center;
    color:white;
    opacity: 0.6;
    font-size: 0.6rem;
    line-height:1.2rem;
    padding:2rem 0 1rem 0rem;

`;


class SetAlrimContainers extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    
    handleClick = () => {
        //회원가입 this.props.base.toJS();
       
        const alarms = this.props.alarms.toArray();
        const { dong,ho,uuid,pushid,phonetype, profile } = this.props.base.toJS();
        const { icon,img,alias,tagcolor } = profile;
        const jsonData = {
            dong:dong,
            ho:ho,
            uuid:uuid,
            phonetype:phonetype,
            pushid:pushid,
            profiles:{
                icon:Number(icon),
                img:img,
                alias:alias,
                tagcolor:tagcolor,
            },
            alarms:{
                guard:alarms[0].get('check'),
                visitor:alarms[1].get('check'),
                notice:alarms[2].get('check'),
                parcel:alarms[3].get('check'),
                ploc:alarms[4].get('check'),
                comehome:alarms[5].get('check'),
                fschedule:alarms[6].get('check'),
                ftalk:alarms[7].get('check'),
                fmsg:alarms[8].get('check')
            },
            lockings:{
                use:false,
                pass:''
            },
        }
        console.log('alarms:',alarms);
       
        console.log('jsonData:',jsonData);
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
       
        this.login(data);
    }

    async login(data){
         const { AuthActions } = this.props;
        try {
          await AuthActions.postRegists({'data':data});
        } catch(e) {
            console.log(e);
        }

        const { history } = this.context.router;
        const { success } = this.props;
        if(success){
            history.push('/auth/complete');
        }else{
            
            alert('회원가입실패');
        }

    }

    handleClickTagColor= (val) => {
        const { AuthActions } = this.props;
        AuthActions.setProfileTagColor(val);
    }

    backClickEvent = () => {
        const { history } = this.context.router;
        history.push('/auth/setProfile');
    }

    familyClick = (val) => {
        const { history } = this.context.router;
        const { AuthActions } = this.props;

        AuthActions.setProfileKey(val);
        console.log('familyClick click'+val);
    }

    iconClick = (val) => {
        const { history } = this.context.router;
        const { AuthActions } = this.props;
         console.log('iconClick click'+val);
        AuthActions.setProfileIcon(val);
        
    }


    addFamilyClick = () => {
        console.log('addFamilyClick click');
    }

    deleteFamilyClick = () => {
        const { history } = this.context.router;
        history.push('/auth/deleteFamilyGroup');
    }

    render() {
 
       const { checkBoxListArray,AuthActions } = this.props;
        
        return (
            <Layout>
                <AuthHeader
                    btnVisible = {true}
                    titleName = {'알림 설정'}
                    clickEvent = {this.backClickEvent}
                />
                <Wrapper>
                    <SubTitle
                        title = {'이벤트 알림 사용 여부'}
                        useCheckBox = {false}
                    />


                    <CheckBoxList
                        checkBoxListArray={checkBoxListArray}
                        onCheck={AuthActions.setCheckboxAlrim}
                    />
                    
                </Wrapper>
              
                <BtnSingle
                    onClickEvent={this.handleClick}
                    name={'다 음'}
                />
            </Layout>
        )
    };
};


export default connect(
    (state) => ({
        checkBoxListArray: state.auth.getIn(['setting','alarmsList']),
        base: state.auth.getIn(['register','base']),
        alarms: state.auth.getIn(['setting','alarmsList']),
        success: state.auth.getIn(['register','success'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(SetAlrimContainers);

