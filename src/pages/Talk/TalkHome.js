import React, { Component } from 'react';
import Footer from 'components/Footer'
import styled from 'styled-components';
import TalkHomeContainer from 'containers/Talk/TalkHomeContainer';
import * as uiActions from 'redux/modules/ui';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const Wrapper = styled.div`
    /* 레이아웃 */
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    top: 3.5rem;
    z-index: 1;
    overflow:auto;
    /* 색상 */
    background: #aaa;
    color: #49433c;
    box-shadow: 0 -3px 6px rgba(0,0,0,0.10);

    /* 폰트 */
    font-size: 1.3rem;
`;


class TalkHome extends Component {
    componentDidMount() {
        const { UIActions } = this.props;
        UIActions.setPageType({pageType:'main'});
    }

   render() {
       const {newTalk} = this.props;
       return(
        <Wrapper>
            <TalkHomeContainer/>
             <Footer
               selectedPage = "talk"
               newFtalk= {newTalk.get('ftalk')}
               newFmsg = {newTalk.get('fmsg')}
             />
        </Wrapper>
       
        )
    };
};


export default connect(
    (state) => ({
        newTalk : state.ui.get('newTalk')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
)(TalkHome);