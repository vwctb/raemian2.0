import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { transitions } from 'lib/style-utils';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    font-size: 1.3rem;
    text-align:center;
    color:white;
    animation: ${transitions.shake} 0.3s ease-in;
    animation-fill-mode: forwards; /* 마지막상태 유지 */
`;

const AuthError = ({children}) => (
    <Wrapper>
        {children}
    </Wrapper>
);

export default AuthError;