import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ControlSliderItem from './ControlSliderItem';

const Wrapper = styled.div`
     position:fixed;
     top:3.5rem;
     bottom:4rem;
     overflow-y:auto;
     width:100%;
`;

const ItemListWrapper = styled.div`
    width:100%;
    height:100%;
    display: flex;
    align-content: flex-start;
    justify-content: space-around;
    flex-flow: row wrap;
    padding: 2rem 1rem;
    font-size: 0px; 
`;
let key = 0;
const ControlSliderItemList = ({controlSliderItemListArray,itemClick,controlType}) => {
    const controlSliderItemList = controlSliderItemListArray.map(
        slideritem => (
            <ControlSliderItem 
                key={key++}
                slideritem={slideritem}
                itemClick = {itemClick} 
                controlType={controlType}
            />
        )
    );
    return (
        <Wrapper className={'controlType_'+controlType}>
            <ItemListWrapper>
                {controlSliderItemList}
            </ItemListWrapper>
        </Wrapper>
    );
};

 ControlSliderItemList.propTypes = {
    controlSliderItemListArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            id: PropTypes.string,
            name: PropTypes.string,
            status: PropTypes.string,
            currentTemp: PropTypes.string,
            configTemp: PropTypes.string
        })
    ),
    itemClick: PropTypes.func
}

export default ControlSliderItemList;