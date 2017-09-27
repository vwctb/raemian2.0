
import React, {Component} from 'react';
import styled from 'styled-components';
import * as SvgIcon from 'lib/icon_svg'

const Wrapper = styled.div`
    /* 레이아웃 */
    display: flex;
    position: fixed;
    align-items: center;
    justify-content: space-between;
    height: 3.5rem;
    width: 100%;
    top: 0px;
    z-index: 6;
    /* 색상 */
	background: #65696c;
    box-shadow: 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.20);
    color:white;
    /* 폰트 */
    font-size: 1rem;
`;

const Title = styled.div`
    position:fixed;
    top: 0;
    width:100%;
    height:3.5rem;
    line-height:3.5rem;
    text-align:center;
    font-size: 1.2rem;
`;

const BtnBack = styled.div`
    position:fixed;
    top:0;
    width: 4rem;
    height:3.5rem;
    padding-left: 1rem;
    line-height:3.5rem;
    font-size:0.9rem;
    color:#ffffff;
    z-index:100;
    svg > polyline {
        stroke:#ffffff;
    }
`;

class MenuHeader extends Component {
    render() {
        const {titleName,clickEvent,btnVisible} = this.props;
        return (
        <Wrapper>
           {btnVisible && <BtnBack onClick={clickEvent} dangerouslySetInnerHTML={{__html: SvgIcon.getInitialSvgIcon('back') + ' 이전' }}></BtnBack>}
           <Title>{titleName}</Title>
        </Wrapper>

        )
    }
}

export default MenuHeader; 
