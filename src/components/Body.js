import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import BG from './Home/background';


const Wrapper = styled.div`
    /* 레이아웃 */
    display: flex;
    position: fixed;
    align-items: flex-start;
    justify-content: flex-start;
    bottom:0px;
    width: 100%;
    top: 3.5rem;
    z-index: 1;
    overflow:auto;
    /* 색상 */
    background: #aaa;
    color: black;
    box-shadow: 0 -3px 6px rgba(0,0,0,0.10);

    /* 폰트 */
    font-size: 1.3rem;
`;


const Body = () => (
    <Wrapper>
        <BG/>
  
    </Wrapper>
);

export default Body;