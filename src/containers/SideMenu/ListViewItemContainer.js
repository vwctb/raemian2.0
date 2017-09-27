import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ControlItemList from 'components/Menu/SideMenu/Items/ControlItemList';

const Wrapper = styled.div`
    /* 레이아웃 */
    width: 100%;
    height:13rem;
    z-index: 1;
    overflow:auto;
    /* 색상 */
    color: #49433c;
    /* 폰트 */
    font-size: 1.3rem;
`;

class ControlItemContainer extends Component {

    render() {
        const { controlHomeItemListArray, slideBack } = this.props;
        
        return (
            <Wrapper>
                <ControlItemList
                    controlHomeItemListArray={controlHomeItemListArray}
                    slideBack={slideBack}
                    pageType={'listview'}
                />
            
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        controlHomeItemListArray: state.ui.getIn(['sideMenu', 'listViewItemList'])
    }),
    (dispatch) => ({
    })
   
)(ControlItemContainer);