import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';



const Wrapper = styled.div`
    width:${props => props.type === 'screenLock' ? '3rem' : '4rem'};
    height:${props => props.type === 'screenLock' ? '3rem' : '4rem'};
    border-radius:${props => props.type === 'screenLock' ? '3rem' : '4rem'};
    text-align:center;
    line-height:${props => props.type === 'screenLock' ? '3rem' : '4rem'};
    margin:${props => props.type === 'screenLock' ? '0rem 1rem 0rem 1rem' : '0.5rem'};
    font-size:1.6rem;
    cursor:pointer;
    &:active, &:focus {
        background:#ff8062;
    }

`;

Wrapper.propTypes={
    type:PropTypes.string
}
class BtnKeyNum extends Component {
    static propTypes = {
        onClickEvent: PropTypes.func,
        type: PropTypes.string,
        value:PropTypes.string
    }
    render() {
        const { value, onClickEvent ,type} = this.props;
        return (
        <Wrapper
            type = {type}
            onClick = {onClickEvent}
        >
            {value}
        </Wrapper>
        )
    }
}

export default BtnKeyNum;