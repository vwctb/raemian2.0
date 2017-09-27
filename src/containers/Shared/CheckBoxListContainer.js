import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import CheckBoxList from 'components/Shared/CheckBoxList';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';

const Wrapper = styled.div`
    /* 레이아웃 */
    width: 100%;
    z-index: 1;
    overflow:auto;
    /* 색상 */
    color: #49433c;
    /* 폰트 */
    font-size: 1.3rem;
`;


class CheckBoxListContainer extends Component {


    render() {
        const { checkBoxListArray,AuthActions,termsClick,policyClick } = this.props;
        return (
            <Wrapper>
                <CheckBoxList
                    checkBoxListArray={checkBoxListArray}
                    onCheck={AuthActions.setCheckboxAgree}
                    termsClick={termsClick}
                    policyClick={policyClick}
                />
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
    
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
   
)(CheckBoxListContainer);