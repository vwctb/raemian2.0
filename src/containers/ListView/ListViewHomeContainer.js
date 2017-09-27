import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import HomeItemList from 'components/Shared/HomeItemList';
import * as Image from 'img';
const Wrapper = styled.div`
    /* 레이아웃 */
    position:fixed;
    bottom: 3.5rem;
    width: 100%;
    top: 3.5rem;
    z-index: 1;
    overflow:auto;
    /* 색상 */
    background: #f7f6ef;
    color: #49433c;
    box-shadow: 0 -3px 6px rgba(0,0,0,0.10);

    /* 폰트 */
    font-size: 1.3rem;
`;


const Background = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0 auto;
    background-image: url(${Image.BG_Sub_Reamin});
	background-position: center;
	background-size: cover;
`;

const ListViewSpace = styled.div`
    width:100%;
    bottom: 0;
    top: 0;
    position: absolute;
`;


class ControlHomeContainer extends Component {

    render() {
        const { HomeItemListArray,newalarmsArray, uiActions } = this.props;
        
        return (
            <Wrapper>
                <Background>
                    <ListViewSpace>
                    <HomeItemList
                        HomeItemListArray={HomeItemListArray}
                        pageType={'listview'}
                    />
                    </ListViewSpace>
                </Background>
             
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        HomeItemListArray: state.ui.getIn(['sideMenu', 'listViewItemList'])
    }),
    (dispatch) => ({
    })
   
)(ControlHomeContainer);