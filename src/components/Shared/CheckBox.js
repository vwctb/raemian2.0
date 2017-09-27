import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Icon_Check} from 'img';
import ImmutablePropTypes from 'react-immutable-proptypes';
const CheckBoxOn = styled.div`
    width:1.4rem;
    height:1.4rem;
    border-radius: 0.3rem;
    background:#50bbcd;
    background-image: url(${Icon_Check});
    background-position: 6px 1px;
    background-size: 16px 16px;
    background-repeat: no-repeat;
    color: #ffffff;
    box-shadow: inset 1px 2px 3px #396e78;
`;

const CheckBoxOff = styled.div`
    width:1.4rem;
    height:1.4rem;
    border-radius: 0.3rem;
    background: linear-gradient(to bottom, #ffffff 13%,#f0f0f4 50%);
    border:1px solid #cecece;
`;

class CheckBox extends Component {
    static propTypes = {
        check: PropTypes.bool,
        onCheckEvent: PropTypes.func
    }
    render() {
        const { check, onCheckEvent } = this.props;
        return (
            check ? <CheckBoxOn onClick={onCheckEvent}/> : <CheckBoxOff onClick={onCheckEvent}/>
        )
    }
}

export default CheckBox;