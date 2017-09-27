import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';



const Wrapper = styled.div`
    width:4rem;
    height:4rem;
    border-radius: 4rem;
    text-align:center;
    line-height:4rem;
    margin:0.5rem;
    font-size:1.6rem;
    cursor:pointer;
    &:active, &:focus {
        background:#ff8062;
    }

`;

class BtnKeyNum extends Component {
    static propTypes = {
        onClickEvent: PropTypes.func,
        value:PropTypes.string
    }
    render() {
        const { value, onClickEvent} = this.props;
        return (
        <Wrapper
            onClick = {onClickEvent}
        >
            {value}
        </Wrapper>
        )
    }
}

export default BtnKeyNum;