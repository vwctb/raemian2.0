import styled from 'styled-components';
import React from 'react';
import  {BG_Basic} from 'img';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    text-align: left;
    width: 100%;
    height: 16.2rem;
    display: flex;
    position: absolute; 
`;

const Background = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0 auto;
    background-image: url(${BG_Basic});
	background-position: center;
	background-size: cover;
`;

const TitleBar = styled.div`
    width: 100%;
    height: 3.5rem;
    line-height:3.5rem;
    padding-left:1rem;
    font-size:1.2rem;
    z-index:10;
    background:rgba(0,169,167,0.6);
    position: absolute;
    color:white;
    bottom: 0;
`;

const ImageBackground = styled.img`
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0 auto;
    border:0;
`;

const BGBox = ({homebgs}) => {
    if(homebgs === undefined){
        homebgs = {
            desc :'',
            phototype : 1,
            img : ''
        }
    }
    return (
        <Wrapper>
            <TitleBar>{homebgs.desc}</TitleBar>
            {
                homebgs.phototype === 1 ?
                <Background/>
                :
                <ImageBackground src = {homebgs.img}/>
            }
           

        </Wrapper>
    );
};
BGBox.propTypes = {
    desc: PropTypes.string
}

export default BGBox;