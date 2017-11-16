import React, { Component } from 'react';
import Layout from 'components/Layout';
import { SubTitle } from 'components/Menu/SideMenu/Setting/Shared'
import AuthHeader from 'components/Auth/AuthHeader';
import * as authActions from 'redux/modules/auth';
import * as uiActions from 'redux/modules/ui';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import {FamilyListContainer,BottomBtnContainer} from 'containers/Shared'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as KEY from 'lib/raemianAES';

const Wrapper = styled.div`
    /* 레이아웃 */
    position: absolute;
    width: 100%;
    bottom: 0;
    background:#3e454b;
    top: 3.5rem;
    z-index: 0;
    /* 색상 */
    color:white;
    /* 폰트 */
    font-size: 1rem;
    overflow-y: auto;
`;


class FamilyContainers extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    
    async componentDidMount() {
        const { UIActions, AuthActions } = this.props;
        const { authConfirm } = this.props.base.toJS();
       // console.log(authConfirm.registtoken);
        try {
            UIActions.setSpinnerVisible(true);
            await AuthActions.getInitialFamilyGroupAuth(authConfirm.registtoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }

    handleClick = () => {
        const { history } = this.context.router;
        const { checkBoxListArray } = this.props;
        let agreeCnt = 0;
        for (var i=0; i < checkBoxListArray.size; i++) {
           if(checkBoxListArray.getIn([i,'check'])){
               agreeCnt++;
           }
        }
        if(agreeCnt === checkBoxListArray.size){
           history.push('auth/signup');
        }else{
            alert('이용약관에 모두 동의해주셔야 합니다.')
        }
    }

    backClickEvent = () => {
        console.log('back click');
    }

    familyClick = (val) => {
        const { history } = this.context.router;
        const { AuthActions } = this.props;
        AuthActions.setProfile(val);
        history.push('/auth/setProfile');
    }

    addFamilyClick = () => {
        const { history } = this.context.router;
        history.push('/auth/setProfile');
    }

    deleteFamilyClick = () => {
        const { history } = this.context.router;
        history.push('/auth/deleteFamilyGroup');
    }

    render() {
        const { pageType, familyListArray } = this.props;
        //const {profile} = this.props.base.toJS();
        return (
            <Layout>
                <AuthHeader
                    btnVisible = {false}
                    titleName = {'가족구성원 선택'}
                    clickEvent = {this.backClickEvent}
                />
                <Wrapper>
                    <SubTitle
                        title = {'아래 중 하나를 선택해주세요!'}
                        useCheckBox = {false}
                    />
                    <FamilyListContainer
                        familyListArray = {familyListArray}
                       // profile={profile}
                        familyClick = {this.familyClick}
                        addFamilyClick = {this.addFamilyClick}
                    />
                </Wrapper>
              
                <BottomBtnContainer
                    onClickEvent={this.deleteFamilyClick}
                    title={'삭제하고 싶은 가족구성원이 있습니까?'}
                    btnTitle={'삭 제'}
                />
             
            </Layout>
        )
    };
};

export default connect(
    (state) => ({
        familyListArray: state.auth.getIn(['setting','familyList']),
        base: state.auth.getIn(['register','base'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(FamilyContainers);

