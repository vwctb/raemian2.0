import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import FamilyList from 'components/Shared/FamilyList';
import { bindActionCreators } from 'redux';
import * as uiActions from 'redux/modules/auth';

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

class FamilyListContainer extends Component {
    render() {
        const { familyListArray,UIActions,familyClick,addFamilyClick,profile,deleteFamilyClick } = this.props;
        return (
            <Wrapper>
                <FamilyList
                    familyListArray={familyListArray}
                    onCheck={UIActions.setCheckboxAgree}
                    profile={profile}
                    addFamilyClick={addFamilyClick}
                    familyClick={familyClick}
                    deleteFamilyClick={deleteFamilyClick}
                />
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
   
)(FamilyListContainer);