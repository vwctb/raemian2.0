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

import CheckBoxList from 'components/Shared/CheckBoxList';



const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    background:#3e454b;
    top:0;
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


class SettingAlrimContainers extends Component {
    static contextTypes = {
        router: PropTypes.object
	}

    handleClick = () => {
        const { history } = this.context.router;
        history.push('/auth/complete');
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
                    name={'적 용'}
                />
            </Layout>
        )
    };
};


export default connect(
    (state) => ({
        checkBoxListArray: state.auth.getIn(['setting','alarmsList'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
)(SettingAlrimContainers);

