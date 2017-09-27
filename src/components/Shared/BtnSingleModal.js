import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Button = styled.div`
    width:100%;
    height:3rem;
    line-height:3rem;
    font-size: 1rem;
    background:#50bbcd;
    color:#ffffff;
    text-align:center;
    bottom:0;

    &:active {
        filter: brightness(80%);
    }
`;

class BtnSingle extends Component {
    static propTypes = {
        name:PropTypes.string,
        onClickEvent: PropTypes.func
    }
    render() {
        const { name, onClickEvent} = this.props;
        return (

            <Button
                onClick={onClickEvent}
            >
            {name}
            </Button>

        )
    }
}

export default BtnSingle;