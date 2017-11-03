import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import * as SvgIcon from 'lib/icon_svg'
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    /* 레이아웃 */
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: space-around;
    height: 3.5rem;
    width: 100%;
    bottom: 0px;
    z-index: 5;
    /* 색상 */
    background: #ffffff; /* Old browsers */
    background: -moz-linear-gradient(top, #ffffff 16%, #e8e9e9 70%); /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #ffffff 16%,#e8e9e9 70%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #ffffff 16%,#e8e9e9 70%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    color: black;
    box-shadow: 0 -3px 6px rgba(0,0,0,0.10) , 0 -3px 6px rgba(0,0,0,0.20);
    border-top:1px solid #ededee;
    /* 폰트 */
    font-size: 1.3rem;
`;

const iconStyle = (avtive) => ({
    fill: avtive ? '#000000' : '#cfcfcf',
    width:'3rem',
    height:'3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const Footer = ({selectedPage,handleClick}) => (
        <Wrapper>
            <Link to = "/"
                  style = {iconStyle("home" === selectedPage)}
                  dangerouslySetInnerHTML={{__html: SvgIcon.getInitialSvgIcon('home')}}
                 
                />
            <Link to = "/control"
                  style = {iconStyle("control" === selectedPage)}
                  dangerouslySetInnerHTML={{__html: SvgIcon.getInitialSvgIcon('control')}}
                />
      
             <Link to = "/listview"
                   style = {iconStyle("listView" === selectedPage)}
                   dangerouslySetInnerHTML={{__html: SvgIcon.getInitialSvgIcon('listview')}}
            />
             <Link to="/talk"
                   style = {iconStyle("talk" === selectedPage)}
                   dangerouslySetInnerHTML={{__html: SvgIcon.getInitialSvgIcon('talk')}}
            />
        </Wrapper>
    );
Footer.propTypes = {
    selectedPage: PropTypes.string
}

export default Footer;