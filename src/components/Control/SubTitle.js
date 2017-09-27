
import React from 'react';
import styled, { css } from 'styled-components';
import { CheckBox }from 'components/Shared';
import PropTypes from 'prop-types';

const WrapperSpace = styled.div`
    width: 100%;
    height:3rem;
    padding-left:1rem;
    display:flex;
    align-items:center;
    background: #f7f6ef;

`;

const Body = styled.div`
    height:3rem;
    line-height:3rem;
    color:#49433c;
    font-size:0.9rem;

    ${props => props.active && css`
        padding-left:0.6rem;

    `}

`;

Body.propTypes = {
    check: PropTypes.bool
}

const SubTitle = ({title,useCheckBox,onCheckEvent,checkValue}) => (
    <WrapperSpace>
        {useCheckBox && <CheckBox check={checkValue} onCheckEvent={onCheckEvent} />}
        <Body
            active={useCheckBox}
        >
            {title}
        </Body>

    </WrapperSpace>
);

  


export default SubTitle;
