

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import SettingItem from './SettingItem';
import * as SvgIcon from 'lib/icon_svg'

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const ItemListWrapper = styled.div`
    width:100%;
    height:100%;
    display: block;
    font-size: 0px; 
`;

const Body = styled.div`
    height:3rem;
    line-height:3rem;

    color:white;
    text-align:center;
    font-size: 0.9rem;
    opacity: 0.6;
    float:left;
`;

const IconNext = styled.div`
    margin-left:1rem;
    font-size: 0px;
`;

let cnt = 0;

const ControlHomeItemList = ({controlHomeItemListArray,changeSideMenuView,pageType}) => {
    const controlHomeItemList = controlHomeItemListArray.map(
        controlitem => (
            <SettingItem
                key={cnt++}
                controlitem={controlitem}
                changeSideMenuView={changeSideMenuView}
            >
                <Body>{controlitem.get('name')}</Body>
                <IconNext
                    dangerouslySetInnerHTML ={{__html : SvgIcon.getInitialSvgIcon('arrowRight')}}
                />
            </SettingItem>
        )
    );
    return (
        <Wrapper>
            <ItemListWrapper>
                {controlHomeItemList}
            </ItemListWrapper>
        </Wrapper>
    );
};

 ControlHomeItemList.propTypes = {
    controlHomeItemListArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            name: PropTypes.string,
            index: PropTypes.number
        })
    ),
    changeSideMenuView: PropTypes.func
}

export default ControlHomeItemList;