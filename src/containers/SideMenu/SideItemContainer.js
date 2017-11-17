import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ControlItemContainer,ListViewItemContainer,TalkItemContainer,SettingItemContainer} from 'containers/SideMenu';
import { PWLockContainer, ChangeBGContainer, SettingAlrimContainer, SettingFamilyContainer, SettingProfileContainer, SettingSmartPhoneContainer, VerInfoContainer } from 'containers/SideMenu/Setting';
import MenuHeader from 'components/Menu/SideMenu/Items/MenuHeader';

import { Link } from 'react-router-dom';
const Wrapper = styled.div`
    /* 레이아웃 */
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 3.5rem;
    z-index: 4;
    /* 색상 */
    color:white;
    /* 폰트 */
    font-size: 1rem;
    overflow-y: auto;
`;
const SettingSpace = styled.div`
    /* 레이아웃 */
    position: absolute;
    width: 100%;
    bottom: 0;
    top: 3.5rem;
    z-index: 5;
    /* 색상 */
    color:white;
    background:#34393e;
    /* 폰트 */
    font-size: 1rem;
    overflow-y: auto;
`;
const TitleBar = styled(Link)`
    display: inline-block;
    width:100%;
    height:2.2rem;
    line-height:2.2rem;
    text-align:left;
    color: white;
    text-decoration: none;
    padding-left:1rem;
    font-size: 1rem;
    background: #34393e;
`;

const SettingTitleBar = styled.div`
    display: inline-block;
    width:100%;
    height:2.2rem;
    line-height:2.2rem;
    text-align:left;
    color: white;
    text-decoration: none;
    padding-left:1rem;
    font-size: 1rem;
    background: #34393e;
`;



const ItemMenu = ({slideBack,changeSideMenuView,sideViewIndex,sideViewTitle,settingInitial}) => (
    <div>
        <MenuHeader
            slideBack = {slideBack}
            sideViewIndex = {sideViewIndex}
            changeSideMenuView = {changeSideMenuView}
            titleName = {sideViewTitle}
            btnVisible={true}
            settingInitial={settingInitial}
        />
             {
                (sideViewIndex !== 0) ?
                <SettingSpace id="sideMenuWrapper">
                    {sideViewIndex === 1 && <PWLockContainer changeSideMenuView={changeSideMenuView}/> }
                    {sideViewIndex === 2 && <ChangeBGContainer changeSideMenuView={changeSideMenuView}/> }
                    {sideViewIndex === 3 && <SettingAlrimContainer changeSideMenuView={changeSideMenuView}/> }
                    {sideViewIndex === 4 && <SettingProfileContainer changeSideMenuView={changeSideMenuView}/>}
                    {sideViewIndex === 5 && <SettingFamilyContainer changeSideMenuView={changeSideMenuView}/>  }
                    {sideViewIndex === 6 && <SettingSmartPhoneContainer changeSideMenuView={changeSideMenuView}/> }
                    {sideViewIndex === 7 && <VerInfoContainer changeSideMenuView={changeSideMenuView}/> }
                </SettingSpace> : null

            }

            <Wrapper id="sideMenuWrapper">
                <TitleBar to="/control" onClick={slideBack}>제어</TitleBar>
                <ControlItemContainer
                    slideBack = {slideBack}
                />
                <TitleBar to="/listview" onClick={slideBack}>조회</TitleBar>
                <ListViewItemContainer
                    slideBack = {slideBack}
                />
                <TitleBar to="/talk" onClick={slideBack}>가족톡</TitleBar>
                <TalkItemContainer
                    slideBack = {slideBack}
                />
                <SettingTitleBar>환경설정</SettingTitleBar>
                <SettingItemContainer
                    slideBack = {slideBack}
                    changeSideMenuView = {changeSideMenuView}
                />
            </Wrapper>
    </div>
);

ItemMenu.PropTypes ={
    slideBack : PropTypes.func,
    changeSideMenuView:PropTypes.func,
    sideViewIndex: PropTypes.number,
    sideViewTitle: PropTypes.string

}



export default ItemMenu;