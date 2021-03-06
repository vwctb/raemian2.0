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
import PropTypes from 'prop-types';
import {BtnDoubleModal, Modal, Dimmed, InputWithLabelModal} from 'components/Shared';
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

const WarningNotice = styled.div`
    width: 100%;
    border:2px solid #ff7e5f;
    padding:0.4rem;
    line-height: 1.2rem;
    font-size:0.8rem;
    text-align:center;
    color:#ff7e5f;
`;

const Notice = styled.div`
    width: 100%;
    padding: 1.5rem;
    line-height: 1.2rem;
    font-size:0.8rem;
    text-align:center;
    color:#ff8062;
    position:absolute;
    bottom:4rem;
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
        const { value } = e.target;
        AuthActions.changeFormatInput(value);
    }
    backClickEvent = () => {
        const { history } = this.context.router;
        history.push('/auth/setFamilyGroup');
    }

    deleteFamilyClick = (val,alias) => {
        const { UIActions,AuthActions,visible } = this.props;
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
        const { userkey } = this.props.familyListDelete.toJS();
        const { authConfirm } = this.props.base.toJS();

        const uuid = window.deviceId ? window.deviceId : 'uuidkey10120202';

        const jsonData = {
            uuid:uuid
        }
        const data = {
            userkey:userkey,
            jsonData:KEY.encryptedKey(JSON.stringify(jsonData)),
            registtoken:authConfirm.registtoken
        }
        console.log('jsonData:',jsonData);
        console.log('data:',data);

        try {
            await AuthActions.deleteFamily(data);
        } catch(e) {
            console.log(e);
        }

        const { success } = this.props.familyListDelete.toJS();
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

        
    handleClickFormat = async () => {
        const { AuthActions } = this.props;
        const { pass } = this.props.familyListFormat.toJS();
        const { dong,ho } = this.props.base.toJS();
        const uuid = window.deviceId ? window.deviceId : 'uuidkey10120202';
        console.log('pass:',pass);
        const data = {
            dong:dong,
            ho:ho,
            pass:KEY.encryptedKey(pass),
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
        const { pass, success } = this.props.familyListFormat.toJS();
    
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
                <Notice>새로 이사 오시는 경우, 초기화를 꼭 실행해주세요</Notice>              
                <BottomBtnContainer
                    onClickEvent={this.handleClick}
                    title={'모든 가족 정보를 초기화하시겠습니까?'}
                    btnTitle={'초기화'}
                />
                <Modal visible={visible} onHide={this.onHide} title={title}>
                    {
                    modalContent === 'init' ? 
                    <div>
                        {
                            success === false ?
                            <MainNotice>
                                외부접속 비밀번호가<br/>
                                일치하지 않습니다.<br/>
                                확인 후 다시 입력해 주세요!
                            </MainNotice>
                            :
                            <MainNotice>
                                현재 등록된 가족구성원을<br/>
                                <OrangeText> 모두삭제하고 초기화</OrangeText>합니다.<br/>
                                한번 더 외부접속 비밀번호를<br/>
                                입력해 주세요!
                            </MainNotice>
                        }
                        
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
                            
                            <WarningNotice>
                            새로 이사오시는 경우, 외부접속 비밀번호를<br/>
                            꼭 변경하시기 바랍니다.
                            </WarningNotice>
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

