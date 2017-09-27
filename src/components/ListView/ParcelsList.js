import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ParcelsItem from './ParcelsItem'
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

const ParcelsList = ({listArray,pageType,selectedType,itemClick,typeClick}) => {
    let index=0;
    const list = listArray.map(
        item => (
            <ParcelsItem
                key={index++}
                location={item.get('location')}
                company={item.get('company')}
                status={item.get('status')}
                date = {moment(item.get('parceldate').split(' ')[0]).format('YYYY년 M월 D일')}
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

ParcelsList.propTypes = {
    listArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            location:PropTypes.string,
            company: PropTypes.string,
            parceldate: PropTypes.string,
            status: PropTypes.string
        })
    ),
    controlType: PropTypes.string
}

export default ParcelsList;