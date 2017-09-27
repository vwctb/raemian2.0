
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PlocsItem from './PlocsItem'
import moment from 'moment';

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

const PlocsList = ({listArray,pageType,selectedType,itemClick,typeClick}) => {
    let index=0;
    const list = listArray.map(
        item => (
            <PlocsItem
                key={index++}
                location={item.get('location')}
                tagcolor={item.get('tagcolor')}
                date={moment(item.get('insertdate').split(' ')[0]).format('YYYY년 M월 D일')}
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

PlocsList.propTypes = {
    listArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            location: PropTypes.string,
            insertdate: PropTypes.string,
            tagcolor: PropTypes.string
        })
    ),
    controlType: PropTypes.string
}

export default PlocsList;