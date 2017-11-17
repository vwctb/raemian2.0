

import React, { Component } from 'react';
import Layout from 'components/Layout';
import { SubTitle } from 'components/Menu/SideMenu/Setting/Shared'
import AuthHeader from 'components/Auth/AuthHeader';
import * as uiActions from 'redux/modules/ui';
import * as authActions from 'redux/modules/auth';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import {FamilyListContainer,BottomBtnContainer} from 'containers/Shared'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {BtnSingle,BtnDoubleModal,Modal,Dimmed,InputWithLabelModal} from 'components/Shared';
import * as KEY from 'lib/raemianAES';

const Wrapper = styled.div`
    /* 레이아웃 */
    position: absolute;
    width: 100%;
    bottom: 0;
    background:#3e454b;
    top: 0;
    z-index: 0;
    /* 색상 */
    color:white;
    /* 폰트 */
    font-size: 1rem;
    overflow-y: auto;
`;

const OrangeText = styled.span`
    color:#ff7e5f;
`;
const MainNotice = styled.div`
    width: 100%;
    text-align:center;
    padding: 1.5rem 1rem 1.5rem 1rem;
    line-height: 1.6rem;
    color:#49433c;
`;

const SubNotice = styled.div`
    width: 100%;
    padding: 1.5rem;
    line-height: 1.2rem;
    font-size:0.8rem;
    text-align:center;
    color:#757371;
`;

let modalSW=true;
let title = '';
let modalContent = '';
let deleteUserkey = '';
class FamilyContainers extends Component {
    static contextTypes = {
        router: PropTypes.object
	}

    handleClick = () => {
        const { UIActions,visible } = this.props;
        console.log('초기화 클릭');
        title = '초기화 경고!';
        modalContent= 'init';

        if(!modalSW) return; //반복 모달 호출현상 방지
        UIActions.setModalVisible(!visible);
        modalSW = false;
    }
    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;
        const { pass } = this.props.base.toJS();
        AuthActions.changeInput({
            name,
            value,
            form: 'register'
        });
    }
    backClickEvent = () => {
        const { history } = this.context.router;
        history.push('/auth/setFamilyGroup');
    }

    deleteFamilyClick = (val,alias)  => {
       const { UIActions,AuthActions,visible } = this.props;
        const { history } = this.context.router;
        console.log('deleteFamily click'+val);

        AuthActions.setDeleteSelectFamily(val);
        AuthActions.setDeleteSelectFamilyAlias(alias);
        deleteUserkey = val;
        title = '삭제 경고!';
        modalContent= 'delete';

        if(!modalSW) return; //반복 모달 호출현상 방지
        UIActions.setModalVisible(!visible);
        modalSW = false;

    }

    onHide = () =>{
        const { UIActions,visible } = this.props;
        UIActions.setModalVisible(!visible);
        setTimeout(() => {
            modalSW = true;
        },500);
    }

    onDelete = async () => {
        const { AuthActions } = this.props;
        const { userkey, alias } = this.props.familyListDelete.toJS();
        const { usertoken } = this.props.loginUserInfo.toJS();
        const {  uuid } = this.props.base.toJS();
        const jsonData = {
            uuid:uuid
        }
        const data = {
            userkey:userkey,
            jsonData:KEY.encryptedKey(JSON.stringify(jsonData)),
            headers:{
                'usertoken':usertoken,
            }
        }
        console.log('data:',data);
        try {
            await AuthActions.deleteFamily(data);
        } catch(e) {
            console.log(e);
        }

        const { success } = this.props.familyListDelete.toJS();
        if(success){
            const { UIActions, visible } = this.props;
            UIActions.setModalVisible(!visible);
            UIActions.changeSideMenuView({sideViewIndex:0,sideViewTitle:'전체 메뉴'});
            window.location.reload(true);
            setTimeout(() => {
                modalSW = true;

            },500);
        }
    }

         
    handleClickFormat = async () => {
        const { AuthActions } = this.props;
        const { pass } = this.props.familyListFormat.toJS();
        const { uuid,dong,ho } = this.props.base.toJS();
        console.log('pass:',pass);
        const data = {
            dong:dong,
            ho:ho,
            pass:KEY.encryptedKey(JSON.stringify(pass)),
            uuid:uuid
        }
        console.log('data:',data);
        try {
            await AuthActions.setFormatFamily(KEY.encryptedKey(JSON.stringify(data)));
        } catch(e) {
            console.log(e);
        }
        const { success } = this.props.familyListFormat.toJS();
        if(success){
            const { history } = this.context.router;
            const {  UIActions, visible } = this.props;
            UIActions.setModalVisible(!visible);
            history.push('/auth/setFamilyGroup');
            setTimeout(() => {
                modalSW = true;
            },500);
        }
    }

    render() {
        const { pageType, familyListArray,profile,visible } = this.props;
        const { alias } = this.props.familyListDelete.toJS();
        const { pass } = this.props.base.toJS();
        return (
            <Layout>
                <AuthHeader
                    btnVisible = {true}
                    titleName = {'가족구성원 삭제'}
                    clickEvent = {this.backClickEvent}
                />
                <Wrapper>
                    <SubTitle
                        title = {'삭제할 가족구성원을 선택해주세요!'}
                        useCheckBox = {false}
                    />
                    <FamilyListContainer
                        familyListArray = {familyListArray}
                        profile={profile}
                        deleteFamilyClick={this.deleteFamilyClick}
                    />
                </Wrapper>
              
                <BottomBtnContainer
                    onClickEvent={this.handleClick}
                    title={'모든 가족 정보를 초기화하시겠습니까?'}
                    btnTitle={'초기화'}
                />


                <Modal visible={visible} onHide={this.onHide} title={title}>
                    
                {
                modalContent === 'init' ? 
                <div>
                    <MainNotice>
                        현재 등록된 가족구성원을<br/>
                        <OrangeText> 모두삭제하고 초기화</OrangeText>합니다.<br/>
                        한번 더 외부접속 비밀번호를<br/>
                        입력해 주세요!
                    </MainNotice>
                    <InputWithLabelModal
                        autoFocus
                        name="pass"
                        type="text"
                        value={pass}
                        onChange={this.handleChange}
                    />
                    <SubNotice>
                        외부접속 비밀번호는<br/>
                        거실 월패드에서 설정하실 수 있습니다.<br/>
                        <br/>
                        
                        <OrangeText>
                        새로 이사오시는 경우, 외부접속 비밀번호를<br/>
                        꼭 변경하시기 바랍니다.
                        </OrangeText>
                    </SubNotice>
                    <BtnDoubleModal
                        onClickEvent2={this.onHide}
                        onClickEvent1={this.handleClickFormat}
                        name1={'초기화 실행'}
                        name2={'취소'}
                    />
                </div>
                :
                <div>
                    <MainNotice>
                        '{alias}'님의<br/>
                        모든 기록과 데이터도 같이 삭제됩니다.<br/>
                        <br/>
                        <OrangeText>
                        삭제하시겠습니까?
                        </OrangeText>
                    </MainNotice>
                    
                    <BtnDoubleModal
                        onClickEvent1={this.onDelete}
                        onClickEvent2={this.onHide}
                        name1={'삭제'}
                        name2={'취소'}
                    />
                </div>


                }

                </Modal>
                <Dimmed visible={visible}/>


             
            </Layout>
        )
    };
};


export default connect(
    (state) => ({
        visible: state.ui.getIn(['modal','visible']),
        loginUserInfo: state.auth.get('loginUserInfo'),
        familyListArray: state.auth.getIn(['setting','familyList']),
        familyListDelete: state.auth.getIn(['setting','familyListDelete']),
        familyListFormat: state.auth.getIn(['setting','familyListFormat']),
        base: state.auth.getIn(['register','base']),
        profile: state.auth.getIn(['register','base','profile'])
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(FamilyContainers);

