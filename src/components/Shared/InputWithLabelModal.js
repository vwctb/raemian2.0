import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
    width:100%;
    display: inline-block;
    text-align: center;
`;

const Input = styled.input`
    width: 80%;
    height:2.6rem;
    border: 1px solid ${oc.gray[3]};
    outline: none;
    color:#ff7e5f;
    text-align: center;
    border-radius: 0px;
    line-height: 2.6rem;
    font-size: 1.4rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;

`;

const InputWithLabel = ({...rest}) => (
    <Wrapper>
        <Input {...rest}/>
    </Wrapper>
);

export default InputWithLabel;