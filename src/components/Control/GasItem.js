
import React from 'react';
import styled, { css } from 'styled-components';
import { CheckBox }from 'components/Shared';
import PropTypes from 'prop-types';
import * as Image from 'img';

const IconArray =
{
    'gas_on' : Image.Icon_Gas_On,
    'gas_off' : Image.Icon_Gas_Off
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
    width:6rem;
    height:10rem;
    margin-bottom:3rem;
    float:left;
    text-align:left;
    font-size: 1rem;
    background-image: url(${props => IconArray[props.icon]});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
`;

const Title =styled.div`
    width:100%;
    text-align:center;
    font-size:1.3rem;
    margin-bottom:1.4rem;
    color:#49433c;
`;

const SubTitle = styled.div`
    font-size:0.9rem;
    width:100%;
    color:#ff8062;
    text-align:center;
    line-height:1.7rem;
`;

Icon.propTypes = {
    icon : PropTypes.string
}


const GasItem = ({onoff}) => (
    <WrapperSpace>
        {onoff ==='err' ? <Icon icon={'gas_off'} /> :  <Icon icon={'gas_'+onoff} /> }
        <Title>
            가스밸브가 { onoff === 'on' ? '열려':'닫혀' } 있습니다.
        </Title>
        <SubTitle>
            안전상의 이유로 가스밸브 제어는<br/> 잠그기만 가능합니다
        </SubTitle>
    </WrapperSpace>
);

  


export default GasItem;
