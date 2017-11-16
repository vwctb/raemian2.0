import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import CheckBoxList from 'components/Shared/CheckBoxList';
import { bindActionCreators } from 'redux';
import * as uiActions from 'redux/modules/auth';

const Wrapper = styled.div`
    position:fixed;
    display:flex;
    justify-content:flex-start;
    align-items:center;
    width:100%;
    height:4rem;
    background:#3e454b;
    border-top:1px solid #626568;
    bottom:0;
`;
const Body = styled.div`
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    color:white;
    text-align: left;
    padding-left: 1rem;
    font-size: 0.75rem;
    float: left;
`;
const Btn = styled.div`
    width: 5rem;
    height: 1.8rem;
    padding: 0 0.6rem 0 0.6rem;
    line-height: 1.8rem;
    font-size: 0.9rem;
    background: #ff8062;
    color: #ffffff;
    float: right;
    text-align: center;
    margin-right: 1rem;
`;


class BottomBtnContainer extends Component {

    render() {
        const { onClickEvent,btnTitle,title } = this.props;
        return (
            <Wrapper>
                <Body>{title}</Body>
                <Btn
                    onClick={onClickEvent}
                >{btnTitle}</Btn>
               
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
    
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
   
)(BottomBtnContainer);