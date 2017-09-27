import React from 'react';
import styled from 'styled-components';

// 두개가 함께 있을땐 상단 (그 사이) 에 여백을 준다
const Wrapper = styled.div`
   width:100%;
   top:3.5rem;
   bottom:3.5rem;
   position: absolute;
   z-index: 999;
   display: flex;
  /* background:rgba(255,255,255,0.6);*/
   justify-content: center;
   align-items: center;
`;

// rest 쪽에는 onChange, type, name, value, placeholder 등의 input 에서 사용 하는 값들을 넣어줄수 있다.
const Spinner = ({children}) => (
    <Wrapper>
       {children}
    </Wrapper>
);

export default Spinner;