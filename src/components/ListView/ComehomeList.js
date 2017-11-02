
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ComehomeItem from './ComehomeItem'

import convertDateTime from 'lib/convertDateTime'

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

const ComehomeList = ({listArray,pageType,selectedType,itemClick,typeClick}) => {
    let index=0;
    const parseData = (date)=>{
        if(date === '') return;
        const tempDate = date.split(' ')[0];
        const temptime = date.split(' ')[1]
        const yyyymmdd = convertDateTime.convertDate(tempDate);
        const time = convertDateTime.convert12H(temptime.substring(0, 5));
        return yyyymmdd+' '+time;
    }

    const list = listArray.map(
        item => (
            <ComehomeItem
                key={index++}
                alias={item.get('alias')}
                icon={item.get('icon')}
                img={item.get('img')}
                company={item.get('company')}
                status={item.get('status')}
                date = {parseData(item.get('insertdate'))}
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

ComehomeList.propTypes = {
    listArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            alias: PropTypes.string,
            icon:PropTypes.number,
            img: PropTypes.string,
            insertdate: PropTypes.string,
            new: PropTypes.bool
        })
    ),
    controlType: PropTypes.string
}

export default ComehomeList;