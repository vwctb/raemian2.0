import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.div`
    width:100%;
    height:4rem;
    line-height:4rem;
    font-size: 1.2rem;
    background:${props=> props.color === '#undefined' ? '#50bbcd' : props.color};
    color:#ffffff;
    text-align:center;
    position: fixed;
    top:${(window.innerHeight-64)+'px'};
    &:active {
        filter: brightness(80%);
    }
`;

class BtnSingle extends Component {
    static propTypes = {
        name:PropTypes.string,
        color:PropTypes.string,
        onClickEvent: PropTypes.func
    }
    
    render() {
        const { name, onClickEvent , color} = this.props;
        return (

            <Button
                onClick={onClickEvent}
                color={'#'+color}
            >
            {name}
            </Button>

        )
    }
}

export default BtnSingle;