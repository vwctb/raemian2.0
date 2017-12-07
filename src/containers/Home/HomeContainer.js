import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {FamilyScheduleList,NewAlarmList } from 'components/Home/AlarmList';
import { bindActionCreators } from 'redux';
import * as uiActions from 'redux/modules/ui';
import * as authActions from 'redux/modules/auth';
import BG from 'components/Home/Background';
import * as SvgIcon from 'lib/icon_svg'
import { Map, List, fromJS } from 'immutable';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    /* 레이아웃 */
    display: flex;
    position: fixed;
    bottom: 3.5rem;
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

const ListContainer = styled.div`
    width: 100%;
`;
let isFirstLoad = false;
class HomeContainer extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    componentDidMount(){
        const { AuthActions} = this.props;
        const { usertoken } = this.props.loginUserInfo.toJS();
        if(usertoken === '') return;
        AuthActions.getMain(usertoken);
        isFirstLoad = true;
    }
    handleClickFamilySchedule =()=>{
        const { history } = this.context.router;
        history.push('/talk/fschedules');
    }

    handleClickParcels =()=>{
        const { history } = this.context.router;
        history.push('/listview/parcels');
    }

    handleClickNotices =()=>{
        const { history } = this.context.router;
        history.push('/listview/notices');
    }

    handleClickVisitors =()=>{
        const { history } = this.context.router;
        history.push('/listview/visitors');
    }

    handleImageLoaded() {
        /*
        if(this.props){
            const { UIActions } = this.props;
            UIActions.setSpinnerVisible(false);
        }*/
        
    }
    
    render() {
        let { loginUserInfo } = this.props;
        let fschedules, newalarms; 
            fschedules = loginUserInfo.get('fschedules');
            newalarms = loginUserInfo.get('newalarms');
        if(newalarms === undefined) newalarms = Map({});
        if(fschedules === undefined) fschedules = List();
        return (
            <Wrapper>
                <BG
                    homebgs = {loginUserInfo.get('homebgs')}
                    handleImageLoaded = {this.handleImageLoaded}

                />
                <ListContainer>
                    <FamilyScheduleList
                        onClickEvent={this.handleClickFamilySchedule}
                        fschedulesArray={fschedules}
                        svgIconArrowRight = {SvgIcon.getInitialSvgIcon('arrowRight')}
                    />
                    <NewAlarmList
                        onClickEventParcels={this.handleClickParcels}
                        onClickEventNotices={this.handleClickNotices}
                        onClickEventVisitors={this.handleClickVisitors}
                        newalarms={newalarms}
                    />
                </ListContainer>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo'),
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        UIActions: bindActionCreators(uiActions, dispatch),
    })
   
)(HomeContainer);