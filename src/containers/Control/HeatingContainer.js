import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { ControlSliderItemList } from 'components/Control';
import { bindActionCreators } from 'redux';
import { BtnDouble } from 'components/Shared';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';
import * as KEY from 'lib/raemianAES';

const Wrapper = styled.div`
    /* 레이아웃 */
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    top: 3.5rem;
    z-index: 1;
    overflow:auto;
    /* 색상 */
    background: #f7f6ef;
    color: #49433c;
    box-shadow: 0 -3px 6px rgba(0,0,0,0.10);
    /* 폰트 */
    font-size: 1.3rem;
`;

class ControlHeatingContainer extends Component {

    handleUpdate = (allon) => {
        const { ControlActions } = this.props;
    }


    handleControlAll = async (status)=>{
        const jsonData = {
            id:'all',
            status:status
        }
        const data = KEY.encryptedKey(JSON.stringify(jsonData));
        const { ControlActions, UIActions } = this.props;
        const {usertoken} = this.props.loginUserInfo.toJS();
        UIActions.setSpinnerVisible(true);
        try {
            await ControlActions.setControlHeatingOnOff({data:data,usertoken:usertoken});
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }

  
    render() {
        const { controlSliderItemListArray,UIActions} = this.props;
        return (
            <Wrapper>
                    <ControlSliderItemList
                        controlSliderItemListArray={controlSliderItemListArray}
                        itemClick = {UIActions.setControlSelectId}
                        controlType = {'heating'}
                    />
                    <BtnDouble
                        name1={'전체켜기'}
                        onClickEvent1={()=>this.handleControlAll('on')}
                        color1={'50bbcd'} 
                        name2={'전체끄기'}
                        onClickEvent2={()=>this.handleControlAll('off')}
                        color2={'cccbca'} 
                    />
                       
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        controlSliderItemListArray: state.control.get('data_heatings'),
        loginUserInfo: state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
         UIActions: bindActionCreators(uiActions, dispatch),
         ControlActions: bindActionCreators(controlActions, dispatch),
    })
)(ControlHeatingContainer);