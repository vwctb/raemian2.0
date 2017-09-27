import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import HomeItemList from 'components/Shared/HomeItemList';
import {BG_Sub_Reamin, Icon_GoOut, Icon_WakeUp} from 'img';
import * as SvgIcon from 'lib/icon_svg'
import PropTypes from 'prop-types';

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
    height: 22rem;
    position: relative;
    margin: 0 auto;
    background-image: url(${BG_Sub_Reamin});
	background-position: center;
	background-size: cover;
`;

const TitleBar = styled.div`
    width:100%;
    height:3rem;
    background: #f7f6ef;
    border-bottom:1px solid #d7d1c4;
    display: flex;
    align-items: center;
    padding: 0 1rem 0 1rem;
    justify-content: space-between;
`;

const Title = styled.div`
    font-size: 0.9rem;
    line-height: 3rem;
`;

const IconNext = styled.div`
    margin-left:1rem;
    font-size: 0px;
`;

const IconGoOut = styled.div`
    width:1.8rem;
    height:1.8rem;
    fill:white;
    background-image: url(${Icon_GoOut});
    background-size:100%;
    margin-right:0.7rem;
    font-size: 0px; 
`;

const IconWakeUp = styled.div`
    width:1.8rem;
    height:1.8rem;
    fill:white;
    background-image: url(${Icon_WakeUp});
    background-size:100%;
    margin-right:0.7rem;
    font-size: 0px;
`;


const List = styled.div`
    width:100%;
    height:3rem;
    border-bottom:1px solid #d7d1c4;
    position: relative;
    background: white;
    cursor: pointer;
`;

// 실제 내용이 들어가는 부분입니다.
const Contents = styled.div`
    width:100%;
    display:flex;
    align-items:center;
    justify-content: space-between;
    height:3rem;
    padding-left:1.3rem;
    padding-right:1.3rem;
    width:100%;
    /* 텍스트가 길어지면 새 줄 생성; 박스 밖의 것은 숨김 */
`;

const Text = styled.div`
    height:1.8rem;
    line-height:1.8rem;
    font-size: 0.9rem;
`;

const Button = styled.div`
    display:flex;
    flex-flow: row wrap;
    font-size: 0.9rem;
`;

const SmartControl = styled.div`
    display:flex;
    flex-flow: row wrap;
    font-size: 0.9rem;
`;

const BtnText = styled.div`
    color:${props => (props.use) ? '#50bbcd' : '#ff8062'};
    font-size: 0.9rem;
`;

BtnText.propTypes={
    use:PropTypes.bool
}

class ControlHomeContainer extends Component {
    static contextTypes = {
        router: PropTypes.object
    }
    
    HandleClickWakeup = () =>{
        const{ history } = this.context.router;
        history.push('/control/reserveControlWakeup');
    }

    HandleClickGoOut = () =>{
        const{ history } = this.context.router;
        history.push('/control/reserveControlGoOut');
    }

    render() {
        const { HomeItemListArray,newalarmsArray, uiActions, GooutUse, WakeUp } = this.props;
        
        return (
            <Wrapper>
                <Background>
                    <HomeItemList
                        HomeItemListArray={HomeItemListArray}
                        pageType={'control'}
                    />
                </Background>

                <TitleBar>
                    <Title>스마트 예약 제어</Title>
                </TitleBar>
                <List>
                    <Contents>
                        <SmartControl>
                            <IconGoOut/>
                            <Text>외출할 때</Text>
                        </SmartControl>
                        <Button
                            onClick={this.HandleClickGoOut}
                        >
                            <BtnText use={GooutUse}> {GooutUse ? '사용함' : '사용안함'}</BtnText>
                            <IconNext
                                dangerouslySetInnerHTML ={{__html : SvgIcon.getInitialSvgIcon('arrowRight')}}
                            />
                        </Button>
                    </Contents> 
                </List>
                <List>    
                    <Contents>
                        <SmartControl>
                            <IconWakeUp/>
                            <Text>기상할 때</Text>
                        </SmartControl>
                        <Button
                            onClick={this.HandleClickWakeup}
                        >
                            <BtnText use={WakeUp}>{WakeUp ? '사용함' : '사용안함'}</BtnText>
                            <IconNext
                                dangerouslySetInnerHTML ={{__html : SvgIcon.getInitialSvgIcon('arrowRight')}}
                            />
                        </Button>
                    </Contents>
                </List>
             
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
        HomeItemListArray: state.ui.getIn(['sideMenu', 'controlItemList']),
        GooutUse : state.control.getIn(['reserveControl', 'goout','use']),
        WakeUp : state.control.getIn(['reserveControl', 'wakeup','use']),
    }),
    (dispatch) => ({
    })
   
)(ControlHomeContainer);