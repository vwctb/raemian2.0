import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
    & + & {
        margin-left: 1rem;
    }
    float:left;
`;

const Label = styled.div`
    font-size: 1rem;
    color: white;
    line-height:3rem;
    margin-left:0.25rem;
    margin-bottom: 0.25rem;
    float:left;
`;

const Input = styled.input`
    width: 6rem;
    height:2.2rem;
    border: 1px solid ${oc.gray[3]};
    outline: none;
    border-radius: 0px;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    float:left;

`;
// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const InputWithLabel = ({label, ...rest}) => (
    <Wrapper>
        <Input {...rest}/>
        <Label>{label}</Label>
         
    </Wrapper>
);

export default InputWithLabel;