import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CCTVItem from './CCTVItem'
const Wrapper = styled.div`
     position:absolute;
     width:100%;
     top:3.5rem;
     bottom: 0;
     background:white;
     overflow-y:auto;
`;
const ItemListWrapper = styled.div`
    width:100%;
    display: flex;
    align-content: flex-start;
    justify-content: space-around;
    flex-flow: row wrap;
`;

const CCTVList = ({listArray,pageType,itemClick}) => {

    const list = listArray.map(
        item => (
            <CCTVItem
                key={item.get('index')}
                index={item.get('index')}
                pageType={pageType}
                name = {item.get('name')}
                itemClick={itemClick}
           />
        )
    );
    return (
        <Wrapper>
            <ItemListWrapper>
                {list}
            </ItemListWrapper>
        </Wrapper>
    );
};

CCTVList.propTypes = {
    listArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            index: PropTypes.number,
            name: PropTypes.string
        })
    ),
    controlType: PropTypes.string,
    itemClick: PropTypes.func
}

export default CCTVList;