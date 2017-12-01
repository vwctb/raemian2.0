import React, { Component } from 'react';
import Footer from 'components/Footer'
import styled from 'styled-components';
import {HomeContainer} from 'containers/Control';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


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
    background: #aaa;
    color: #49433c;
    box-shadow: 0 -3px 6px rgba(0,0,0,0.10);

    /* 폰트 */
    font-size: 1.3rem;
`;


class ControlHome extends Component {

    async componentDidMount() {
        const { UIActions, ControlActions, auth} = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();

        ControlActions.initializeReserve();
        UIActions.setPageType({pageType:'main'});
        try {
            UIActions.setSpinnerVisible(true);
            await ControlActions.getSmartReserveGoout(usertoken);
            await ControlActions.getSmartReserveMorning(usertoken);
        }catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }

    componentWillUnmount(){
     
    }

   render() {
       return(
        <Wrapper>
            <HomeContainer/>
             <Footer
               selectedPage = "control"
               newFtalk= {this.props.newTalk.get('ftalk')}
               newFmsg = {this.props.newTalk.get('fmsg')}
             />
        </Wrapper>
       
        )
    };
};


export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo'),
        newTalk : state.ui.get('newTalk')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ControlActions: bindActionCreators(controlActions, dispatch),
    })
)(ControlHome);