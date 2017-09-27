import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {FamilyScheduleList,NewAlarmList } from 'components/Home/AlarmList';
import { bindActionCreators } from 'redux';
import * as uiActions from 'redux/modules/ui';
import BG from 'components/Home/Background';
import * as SvgIcon from 'lib/icon_svg'
import { Map, List, fromJS } from 'immutable';

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

class HomeContainer extends Component {

    render() {
        let { fschedulesArray, newalarms, uiActions } = this.props;
        const { desc, phototype } = this.props.homebgs.toJS();
        if(fschedulesArray === undefined) fschedulesArray = List([]);
        if(newalarms === undefined) newalarms = Map({});
        
        
        return (
            <Wrapper>
                <BG
                    desc={desc}
                />
                <ListContainer>
                    <FamilyScheduleList
                        fschedulesArray={fschedulesArray}
                        svgIconArrowRight = {SvgIcon.getInitialSvgIcon('arrowRight')}
                    />
                    <NewAlarmList
                        newalarms={newalarms}
                    />
                </ListContainer>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        fschedulesArray: state.auth.getIn(['loginUserInfo','fschedules']),
        newalarms: state.auth.getIn(['loginUserInfo','newalarms']),
        homebgs: state.auth.getIn(['setting','homebgs']),
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
   
)(HomeContainer);