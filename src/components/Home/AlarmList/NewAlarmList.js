import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import NewAlarmItem from './NewAlarmItem';

const Wrapper = styled.div`
    width: 100%;
    top:16.2rem;
    position: relative;
    padding-bottom:2rem;
    font-size: 0px; /* inline-block 위아래 사이에 생기는 여백을 제거합니다 */
`;

const TitleBar = styled.div`
    width:100%;
    height:3rem;
    background: #f7f6ef;
    border-bottom:1px solid #d7d1c4;
`;

const Title = styled.div`
    font-size: 0.9rem;
    line-height: 3rem;
    margin-left: 1rem;
`;

const IconNext = styled.div`
    font-size: 0px; /* inline-block 위아래 사이에 생기는 여백을 제거합니다 */
`;


let cnt = 0;

const NewAlarmList = ({newalarms, onClickEventParcels, onClickEventNotices, onClickEventVisitors}) => {
    return (
        <Wrapper>
            <TitleBar>
                <Title>새로운 알림</Title>
                <IconNext/>
            </TitleBar>

            {
                newalarms.get('homecom') &&
                <NewAlarmItem
                    onClickEvent= {onClickEventVisitors}
                    item = {'homecom'}
                    comehome = {newalarms.get('homecom')}
                    icon = {newalarms.get('homecomIcon')}
                    img = {newalarms.get('homecomImg')}
                />
            }
            <NewAlarmItem
                onClickEvent= {onClickEventParcels}
                item = {'parcel'}
                value = {newalarms.get('parcel')}
            />
            <NewAlarmItem
                onClickEvent= {onClickEventNotices}
                item = {'notice'}
                value = {newalarms.get('notice')}
            />
            <NewAlarmItem
                onClickEvent= {onClickEventVisitors}
                item = {'visitor'}
                value = {newalarms.get('visitor')}
            />
        </Wrapper>
    );
};

NewAlarmList.propTypes = {
    newalarms:  ImmutablePropTypes.mapContains({
            parcel: PropTypes.number,
            homecomeImg: PropTypes.string,
            visitor: PropTypes.number,
            homecome:  PropTypes.string,
            homecomeIcon: PropTypes.number,
            notice: PropTypes.number
    }),
    onClickEventParcels:PropTypes.func,
    onClickEventNotices:PropTypes.func,
    onClickEventVisitors:PropTypes.func
    
}

export default NewAlarmList;