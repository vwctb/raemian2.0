import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import NoticesItem from './NoticesItem'
import {BtnDoubleCheck} from 'components/Shared';
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

const NoticesList = ({listArray,pageType,selectedType,itemClick,typeClick}) => {
    const list = listArray.map(
        item => (
            <NoticesItem
                key={item.get('index')}
                index={item.get('index')}
                subject={item.get('subject')}
                writer={item.get('writer')}
                read={item.get('read')}
                selectedType={selectedType}
                pageType={pageType}
                date = {moment(item.get('insertdate').split(' ')[0]).format('YYYY년 M월 D일')}
                itemClick={itemClick}
           />
        )
    );
    return (
        <Wrapper>
            <BtnDoubleCheck
                name1={'전체 공지사항'}
                from={'wakeup'}
                onClickEvent={typeClick} 
                name2={'개별 공지사항'}
                check={selectedType === 'all' ? true : false}
            />
            <ItemListWrapper>
                {list}
            </ItemListWrapper>
        </Wrapper>
    );
};

NoticesList.propTypes = {
    listArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            index: PropTypes.number,
            subject:PropTypes.string,
            writer: PropTypes.string,
            insertdate: PropTypes.string,
            read:PropTypes.bool
        })
    ),
    selectedType: PropTypes.string,
    controlType: PropTypes.string,
    itemClick: PropTypes.func,
    typeClick: PropTypes.func
}

export default NoticesList;