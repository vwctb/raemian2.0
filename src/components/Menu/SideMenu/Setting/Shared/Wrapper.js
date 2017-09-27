import React from 'react';
import styled from 'styled-components';


const WrapperSpace = styled.div`
    /* 레이아웃 */
    width: 100%;
    height:100%;
    z-index: 1;
    background:#3e454b;
    overflow:auto;
    /* 색상 */
    color: #ffffff;
    /* 폰트 */
    font-size: 1.3rem;
`;

const Wrapper = ({children}) => (
    <WrapperSpace>
        {children}
    </WrapperSpace>
);

export default Wrapper;