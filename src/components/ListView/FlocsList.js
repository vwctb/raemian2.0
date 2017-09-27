
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FlocsItem from './FlocsItem'

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

const FlocsList = ({listArray,pageType,selectedType,itemClick,typeClick}) => {
    let index=0;
    const list = listArray.map(
        item => (
            <FlocsItem
                key={index++}
                alias={item.get('alias')}
                icon={item.get('icon')}
                img={item.get('img')}
                location={item.get('location')}
                tagcolor={item.get('tagcolor')}
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

FlocsList.propTypes = {
    listArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            location: PropTypes.string,
            alias: PropTypes.string,
            icon:PropTypes.number,
            img: PropTypes.string,
            tagcolor: PropTypes.string
        })
    ),
    controlType: PropTypes.string
}

export default FlocsList;