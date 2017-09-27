import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ControlItem from './ControlItem';

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

const ControlItemList = ({controlItemListArray,itemClick,controlType}) => {
    const controlItemList = controlItemListArray.map(
        item => (
            <ControlItem
                key={Number(item.get('id'))}
                item={item}
                controlType={controlType}
                itemClick = {itemClick} 
            />
        )
    );
    return (
        <Wrapper className={'controlType_'+controlType}>
            <ItemListWrapper>
                {controlItemList}
            </ItemListWrapper>
        </Wrapper>
    );
};

 ControlItemList.propTypes = {
    controlItemListArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            id: PropTypes.string,
            name: PropTypes.string,
            status: PropTypes.string
        })
    ),
    controlType: PropTypes.string,
    itemClick: PropTypes.func
}

export default ControlItemList;