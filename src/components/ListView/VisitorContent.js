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

const Image = styled.div`
    width: 100%;
    height: 15rem;
    margin-bottom: 3rem;
    float: left;
    -webkit-text-align: left;
    text-align: left;
    font-size: 1rem;
    background-image: url(${props => props.image && 'data:image/png;base64,'+props.image});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
`;
Image.propTypes={
    image:PropTypes.string
}


const IconNext = styled.div`
    font-size: 0px; /* inline-block 위아래 사이에 생기는 여백을 제거합니다 */
`;

class VisitorContent extends Component {

    static propTypes = {
        index: PropTypes.string,
        insertdate:PropTypes.string,
        pageType: PropTypes.string,
        image: PropTypes.string,
        itemClick: PropTypes.func
    }

    render() {
        
        const {insertdate,image} = this.props.data;
        return (
            <Wrapper>
                <Body>{insertdate}</Body>
                <Image image={image}/>
            </Wrapper>
        )
    }
}

export default VisitorContent; 
