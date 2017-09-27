import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    width: 100%;
    height:3rem;
    bottom:0;
    z-index:10;
`;

const Button1 = styled.div`
    width:50%;
    height:100%;
    line-height:3rem;
    font-size: 1rem;
    background:#ff7e5f;
    color:#ffffff;
    text-align:center;
    float: left;

    &:active {
        filter: brightness(80%);
    }
`;

const Button2 = styled.div`
    width:50%;
    height:100%;
    line-height:3rem;
    font-size: 1rem;
    background:#aaa6a1;
    color:#ffffff;
    text-align:center;
    float: left;

    &:active {
        filter: brightness(80%);
    }
`;



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
        const { name1, onClickEvent1, color1, name2, onClickEvent2, color2 } = this.props;
         
        return (
            <Wrapper>
                <Button1 
                    onClick={onClickEvent1}
                    color1={color1}
                >
                {name1}
                </Button1>
                <Button2 
                    onClick={onClickEvent2}
                    color2={color2}
                >
                {name2}
                </Button2>

            </Wrapper>
        )
    }
}

export default BtnDouble;