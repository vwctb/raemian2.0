import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as SvgIcon from 'lib/icon_svg';
import  * as Img from 'img';

const Wrapper = styled.div`
    position:absolute;
    width:100%;
    top:3.5rem;
    bottom:0;
    overflow-y:auto;
    background:#f7f6ef;
`;


const Body = styled.div`
    height:3.5rem;
    width:100%;
    color:#49433c;
    background:white;
    display: flex;
    font-size:0.9rem;
    align-items: center;
    padding-left:1rem;
`;

const Image = styled.img`
    width: 100%;
    height: 15rem;
    margin-bottom: 3rem;
    float: left;
    -webkit-text-align: left;
    text-align: left;
    font-size: 1rem;
    background-image: url(${props => props.image && props.image});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
`;
Image.propTypes={
    image:PropTypes.string
}

class CCTVContent extends Component {

    static propTypes = {
        index: PropTypes.string,
        name:PropTypes.string
    }

    render() {
        const {name} = this.props;
        const {url} = this.props.data_content;

        return (
            <Wrapper>
                <Body>{name}</Body>
                <Image src={url} innerRef={ref=>window.cctvRef=ref} />
            </Wrapper>
        )
    }
}

export default CCTVContent; 
