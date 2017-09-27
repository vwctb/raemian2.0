import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as SvgIcon from 'lib/icon_svg'


const LinkSpace = styled(Link)`
    width:100%;
    height:3.5rem;
    display: flex;
    background: white;
    align-items: center;
    padding: 0 1rem 0 1rem;
    justify-content: space-between;
    border-bottom: 1px solid #e4e0d7;
    text-decoration: none;
    &:active {
        filter: brightness(80%);
    }
`;

const Body = styled.div`
    height:3rem;
    color:#49433c;
    display: flex;
    font-size:0.9rem;
    align-items: center;
`;

const IconNext = styled.div`
    font-size: 0px; /* inline-block 위아래 사이에 생기는 여백을 제거합니다 */
`;

class CCTVItem extends Component {

    static propTypes = {
        index: PropTypes.number,
        name:PropTypes.string,
        pageType: PropTypes.string,
        itemClick: PropTypes.func
    }

    render() {
        const {pageType,index,name,itemClick} = this.props;
        return (
            <LinkSpace
                to = {"/"+pageType+"/"+index+' '+name}
                onClick={()=>itemClick(name)}
            >
                <Body>{name}</Body>
                <IconNext dangerouslySetInnerHTML={{__html: SvgIcon.getInitialSvgIcon('arrowRight')}} />
            </LinkSpace>
        )
    }
}

export default CCTVItem; 
