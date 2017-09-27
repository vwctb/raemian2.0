import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import HomeItem from './HomeItem';
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const ItemListWrapper = styled.div`
    width:100%;
    height:100%;
    display: block;
    display: flex;
    align-items:flex-start;
    justify-content: space-between;
    flex-flow: row wrap;
    padding: 1.5rem;
    font-size: 0px; 
`;

let cnt = 0;
const HomeItemList = ({HomeItemListArray,pageType}) => {
    const HomeItemList = HomeItemListArray.map(
        item => (
            <HomeItem
                key={cnt++}
                item={item}
                pageType={pageType}
            />
        )
    );
    return (
        <Wrapper>
            <ItemListWrapper>
                {HomeItemList}
            </ItemListWrapper>
            
        </Wrapper>
    );
};

 HomeItemList.propTypes = {
    HomeItemListArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            name: PropTypes.string,
            icon: PropTypes.string,
            index: PropTypes.number,
            itemClick: PropTypes.func
        })
    ),
    pageType:PropTypes.string
}

export default HomeItemList;