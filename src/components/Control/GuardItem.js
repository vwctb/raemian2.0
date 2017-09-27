
import React from 'react';
import styled, { css } from 'styled-components';
import { CheckBox }from 'components/Shared';
import PropTypes from 'prop-types';
import * as Image from 'img';

const ColorArray =
{
    0 : '#aaa6a1',
    1 : '#ff8062',
    2 : '#50bbcd'
}
const WrapperSpace = styled.div`
    width: 100%;
    top:0;
    bottom:0;
    position:fixed;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background: #f7f6ef;
`;

const Icon = styled.div`
    width:15rem;
    height:11rem;
    margin-bottom:3rem;
    float:left;
    text-align:left;
    font-size: 1rem;
    background-image: url(${Image.Icon_Guard_House});
    background-color: ${props => ColorArray[props.icon]};
    background-position: center;
    background-repeat: no-repeat;
    background-size: 45%;
    border-radius:1rem;
`;

Icon.propTypes = {
    icon : PropTypes.number
}

const Title =styled.div`
    width:100%;
    text-align:center;
    font-size:1.3rem;
    margin-bottom:1.4rem;
    color:#49433c;

`;

const SubTitle = styled.div`
    width:100%;
    color:#ff8062;
    text-align:center;
    font-size:0.9rem;
    line-height:1.7rem;
`;



const ConditionTitle = styled.div`
    width:2.6rem;
    height:1rem;
    font-size:0.7rem;
    border-bottom:2px solid #ffffff;
    margin-top:0.8rem;
    margin-left:0.8rem;
    color:white;
    text-align:center;

`;

const Condition = styled.div`
    margin-top:3.6rem;
    width:100%;
    height:7rem;
    color:white;
    text-align:center;
    font-size:2.2rem;
    line-height:1.7rem;
`;


const GuardItem = ({guard}) => (
    <WrapperSpace>
        <Icon icon={guard}>
            <ConditionTitle>현재상태</ConditionTitle>
            <Condition>
                {guard === 1 && '외출'}
                {guard === 2 && '재택'}
                {guard === 0 && '해제'}
            </Condition>
        </Icon>
        <Title>
             {guard === 1 && '외출 방범이 설정되어 있습니다.'}
             {guard === 2 && '재택 방범이 설정되어 있습니다.'}
             {guard === 0 && '방범이 해제되어 있습니다.'}
        </Title>
        <SubTitle>
            안전상의 이유로 방범 해제는<br/> 세대내 월패드에서만 가능합니다.
        </SubTitle>
    </WrapperSpace>
);

  


export default GuardItem;
