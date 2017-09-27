import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as SvgIcon from 'lib/icon_svg'
import {Icon_New} from 'img';

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
    height:2.5rem;
    display: flex;
    flex-wrap:wrap;
    align-items:center;
`;

const IconNext = styled.div`
    font-size: 0px; /* inline-block 위아래 사이에 생기는 여백을 제거합니다 */
`;

const Title = styled.div`

    color:#49433c;
    display: flex;
    font-size:0.9rem;
    align-items: center;
`;

const SubTitle = styled.div`
    width: 100%;
    color:#908d8a;
    display: flex;
    font-size:0.7rem;
    align-items: center;   
    display: flex;
    align-items:center;
`;

const Icon = styled.div` 
    width:0.8rem;
    height:0.8rem;
    background-image: url(${Icon_New});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    margin-left:0.3rem;
    margin-bottom:0.1rem;

`;

class NoticesItem extends Component {

    static propTypes = {
        index: PropTypes.number,
        subject:PropTypes.string,
        writer: PropTypes.string,
        selectedType:PropTypes.string,
        insertdate: PropTypes.string,
        read:PropTypes.bool
    }

    render() {
        const {pageType,index,selectedType,subject,date,writer,read,itemClick} = this.props;

        return (
            <LinkSpace 
                to = {"/"+pageType+"/"+index}
                onClick={()=>itemClick({subject:subject,writer:writer,insertdate:date,content:'공지사항 내용이 들어갑니다.'})}
            >
                <Body>
                    <Title>{subject}</Title>{!read && <Icon/>}
                    <SubTitle>{date.split(',')[0] +', '+ writer}</SubTitle>
                </Body>
                <IconNext dangerouslySetInnerHTML={{__html: SvgIcon.getInitialSvgIcon('arrowRight')}} />
            </LinkSpace>
        )
    }
} 

export default NoticesItem; 
