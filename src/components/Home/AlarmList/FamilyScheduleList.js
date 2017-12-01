import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FamilyScheduleItem from './FamilyScheduleItem';
import shortid from 'shortid';
import * as Image from 'img';

const Wrapper = styled.div`
    width: 100%;
    top:16.2rem;
    position: relative;
    font-size: 0px; /* inline-block 위아래 사이에 생기는 여백을 제거합니다 */
`;

const TitleBar = styled.div`
    width:100%;
    height:3rem;
    background: #f7f6ef;
    border-bottom:1px solid #d7d1c4;
    display: flex;
    align-items: center;
    padding: 0 1rem 0 1rem;
    justify-content: space-between;
`;

const Title = styled.div`
    font-size: 0.9rem;
    line-height: 3rem;
`;

const Icon = styled.div`
    width:1.4rem;
    height:1.4rem;
    float:left;
    text-align:left;
    font-size: 1rem;
    background-image: url(${Image.Icon_Schedule});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    margin-right:0.5rem;
`;

const DefaultList = styled.div`
    width: 100%;
    height: 3rem;
    background:white;
    color:black;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    padding-left:1rem;
    border-bottom: 1px solid #d7d1c4;
`;

const IconNext = styled.div`
    font-size: 0px; /* inline-block 위아래 사이에 생기는 여백을 제거합니다 */
`;


let cnt = 0;
const FschedulesList = ({fschedulesArray,onClickEvent, svgIconArrowRight, onOpen, index}) => {

    const fschedulesList = fschedulesArray.map(
        fschedules => (
            <FamilyScheduleItem
                key={cnt++}
                fschedules={fschedules}
            />
        )
    );
    return (
        <Wrapper>
            <TitleBar onClick={onClickEvent}>
                <Title>가족 일정</Title>
                <IconNext
                   dangerouslySetInnerHTML={{__html: svgIconArrowRight}}
                />
            </TitleBar>
            {
               fschedulesArray.size === 0 ? <DefaultList><Icon/>등록된 일정이 없습니다.</DefaultList>: fschedulesList
            }
        </Wrapper>
    );
};

 FschedulesList.propTypes = {
    fschedulesArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            date: PropTypes.string,
            remaining: PropTypes.number,
            desc: PropTypes.string
        })
    )
}

export default FschedulesList;