import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    width: 100%;
    height:4rem;
    position:fixed;
    bottom:0;
    z-index:10;
`;

const Button1 = styled.div`
    width:50%;
    height:100%;
    line-height:4rem;
    font-size: 1.2rem;
    background:${props=> props.color};
    color:#ffffff;
    text-align:center;
    float: left;
    
    &:active {
        filter: brightness(80%);
    }
`;

Button1.propTypes = {
    color : PropTypes.string
}


const Button2 = styled.div`
    width:50%;
    height:100%;
    line-height:4rem;
    font-size: 1.2rem;
    background:${props=>props.color};
    color:${props=> props.fcolor === undefined ? '#757371':props.fcolor};
    text-align:center;
    float: left;
  
    &:active {
        filter: brightness(80%);
    }
`;

Button2.propTypes = {
    color : PropTypes.string,
    fcolor : PropTypes.string
}

class BtnDouble extends Component {
    static propTypes = {
        name1:PropTypes.string,
        color1:PropTypes.string,
        onClickEvent1: PropTypes.func,
        name2:PropTypes.string,
        color2:PropTypes.string,
        onClickEvent2: PropTypes.func
    }

    render() {
        const { name1, onClickEvent1, color1, name2, onClickEvent2, color2,fcolor2 } = this.props;
         
        return (
            <Wrapper>
                <Button1 
                    onClick={onClickEvent1}
                    color={'#'+color1}
                >
                {name1}
                </Button1>
                <Button2 
                    onClick={onClickEvent2}
                    color={'#'+color2}
                    fcolor={'#'+fcolor2}
                >
                {name2}
                </Button2>

            </Wrapper>
        )
    }
}

export default BtnDouble;