import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import SettingItemList from 'components/Menu/SideMenu/Items/SettingItemList';

const Wrapper = styled.div`
    /* 레이아웃 */
    width: 100%;
    z-index: 1;
    overflow:auto;
    /* 색상 */
    color: #49433c;
    /* 폰트 */
    font-size: 1.3rem;
`;

class SettingItemContainer extends Component {

    render() {
        const { controlHomeItemListArray, changeSideMenuView,slideBack } = this.props;
        
        return (
            <Wrapper>
                <SettingItemList
                    controlHomeItemListArray={controlHomeItemListArray}
                    slideBack={slideBack}
                    changeSideMenuView={changeSideMenuView}
                    pageType={'setting'}
                />
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        controlHomeItemListArray: state.ui.getIn(['sideMenu', 'settingItemList'])
    }),
    (dispatch) => ({
    })
   
)(SettingItemContainer);