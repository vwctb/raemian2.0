import React, { Component } from 'react';
import Layout from 'components/Layout';
import { SubTitleWithIcon } from 'components/Control'
import {BtnSingle} from 'components/Shared';
import * as controlActions from 'redux/modules/control';
import * as uiActions from 'redux/modules/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ControlCheckBoxList,BtnDoubleCheck} from 'components/Shared';
import * as KEY from 'lib/raemianAES';

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 4rem;
    background:#f7f6ef;
    top: 3.5rem;
    z-index: 0;
    color:white;
    font-size: 1rem;
    overflow-y: auto;
`;

const Notice = styled.div`
    float:left;
    color:#49433c;
    font-size:0.8rem;
    text-align:center;
    padding:3rem;
    width:100%;
`;

class ReserveControlGooutContainer extends Component {
    static contextTypes = {
        router: PropTypes.object
	}

    handleClick = async () => {
        const { ControlActions, UIActions, uploadFile, use, goout} = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        let jsonData;
        if(use === true){
            jsonData = goout;
        }else{
            jsonData = {
                use : use
            }
        }
        console.log('jsonData: ',jsonData);
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        UIActions.setSpinnerVisible(true);
        try {
            await ControlActions.setSmartReserveGoout({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
        const { success } = this.props;
        if(success) {
            const { history } = this.context.router;
            history.push('/control');
        }else{
            alert('예약 설정을 실패하였습니다.')
        }

    }
    

    render() {
        const { checkBoxListArrayLights,checkBoxListArrayConcents,ControlActions, use } = this.props;
        return (
            <Layout>
                <Wrapper>
                    <BtnDoubleCheck
                        from={'goout'}
                        name1={'사용함'}
                        onClickEvent={ControlActions.setCheckboxReserveControlUse} 
                        name2={'사용안함'}
                        check={use}
                    />
                    <SubTitleWithIcon
                        title = {'조명 끄기'}
                        icon = {'light'}
                    />
                    <ControlCheckBoxList
                        from1={'goout'}
                        from2={'lights'}
                        use={use}
                        checkBoxListArray={checkBoxListArrayLights}
                        onCheck={use ? ControlActions.setCheckboxReserveControl : ()=>{return}}
                    />
                    <SubTitleWithIcon
                        title = {'콘센트 끄기'}
                        icon = {'plug'}
                    />
                    <ControlCheckBoxList
                        from1={'goout'}
                        from2={'concents'}
                        use={use}
                        checkBoxListArray={checkBoxListArrayConcents}
                        onCheck={use ? ControlActions.setCheckboxReserveControl :()=>{return} }
                    />
                    <Notice>
                        {
                            '원패스 태그를 가지고 외출할 경우'}<br/>{
                            '설정된 제어가 실행됩니다.'
                        }
                    </Notice>
                </Wrapper>
                <BtnSingle
                    onClickEvent={this.handleClick}
                    name={'확 인'}
                />
            </Layout>
        )
    };
};


export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo'),
        success : state.control.getIn(['reserveControl','gooutSuccess']),
        goout: state.control.getIn(['reserveControl','goout']),
        checkBoxListArrayLights: state.control.getIn(['reserveControl','goout','lights']),
        checkBoxListArrayConcents: state.control.getIn(['reserveControl','goout','concents']),
        use: state.control.getIn(['reserveControl','goout','use'])
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ControlActions: bindActionCreators(controlActions, dispatch)
    })
)(ReserveControlGooutContainer);

