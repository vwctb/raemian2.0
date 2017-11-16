import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';     
import { LogoImage } from 'img'
import * as SvgIcon from 'lib/icon_svg'
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    /* 레이아웃 */
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: space-between;
    height: 3.5rem;
    width: 100%;
    top: 0px;
    z-index: 6;
    padding: 0 0.7rem 0 0.7rem;
    /* 색상 */
    background: linear-gradient( to bottom,white,#e8e9e9);
    color: black;
    box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);

    /* 폰트 */
    font-size: 1.3rem;
`;

const Logo = styled(Link)`
    width: 7rem;
    height: 100%;
    margin-left: 0.5rem;
    background-image: url(${LogoImage});
    background-size: 7rem 0.9rem;
	background-repeat: no-repeat;
	background-position: center;
    text-decoration: none;
`;

const Title = styled.div`
    font-size: 1;
`;

const BtnToggle = styled.div`
    width:3rem;
    height:3rem;
    padding-left:0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0;
    cursor:pointer;
`;

const BtnBack = styled.div`
    width: 3rem;
    height:3rem;
    padding-left: 0.3rem;
    line-height:3rem;
    font-size:0.9rem;
    color:#49433c;
    fill:#49433c;
`;

const Header = ({sideOpen, pageType, sideBack, title}) => {
    return (
        <Wrapper>
            {(pageType === 'main') ?  <Logo to='/' /> : <BtnBack onClick={sideBack} dangerouslySetInnerHTML={{__html: SvgIcon.getInitialSvgIcon('back') + ' 이전' }}></BtnBack>}
            {(pageType !== 'main') &&  <Title>{title}</Title>}
            <BtnToggle
                onClick={sideOpen}
                dangerouslySetInnerHTML={{__html: SvgIcon.getInitialSvgIcon('toggle')}}
              
            />
        </Wrapper>
    );
};

Header.propTypes = {
    sideOpen: PropTypes.func,
    sideBack: PropTypes.func,
    pageType: PropTypes.string,
    title: PropTypes.string
};

Header.defaultProps = {
    sideOpen: () => console.warn('slideOpen not defined'),
    sideBack: () => console.warn('onClickBackPage not defined')
    
};
export default Header;