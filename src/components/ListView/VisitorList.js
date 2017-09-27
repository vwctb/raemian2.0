import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import VisitorItem from './VisitorItem'
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

const VisitorList = ({listArray,pageType,itemClick}) => {
    const list = listArray.map(
        item => (
            <VisitorItem
                key={item.get('index')}
                index={item.get('index')}
                pageType={pageType}
                date = {moment(item.get('insertdate').split(' ')[0]).format('YYYY년 M월 D일')}
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

VisitorList.propTypes = {
    listArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            index: PropTypes.number,
            location: PropTypes.string,
            insertdate: PropTypes.string,
            read: PropTypes.bool
        })
    ),
    controlType: PropTypes.string,
    itemClick: PropTypes.func
}

export default VisitorList;