import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FamilyItem } from'components/Shared'
import * as SvgIcon from 'lib/icon_svg'

const Wapper = styled.div`
    width:100%;
    height:4.5rem;
    display: flex;
    background: white;
    align-items: center;
    padding: 0 1rem 0 1rem;

    border-bottom: 1px solid #e4e0d7;
    text-decoration: none;
    &:active {
        filter: brightness(80%);
    }
`;

const Body = styled.div`
    width:70%;
    height:2.8rem;
    margin-left:1rem;
    display: flex;
    flex-wrap:wrap;
    align-items:center;
`;


const Title = styled.div`
    color:${props => props.fromto === 'to' ? '#50bbcd' : '#49433c' };
    display:  inline-block;
    font-size:1rem;
    align-items: center;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
`;

Title.propTypes={
    fromto:PropTypes.string
}

const SubTitle = styled.div`
    width:15rem;
    color:#908d8a;
    display: flex;
    font-size:0.7rem;
    align-items: center;   
    display: flex;
    align-items:center;
`;

const IconNext = styled.div`
    margin-left: 1.5rem;
    font-size: 0px; /* inline-block 위아래 사이에 생기는 여백을 제거합니다 */
`;

class FmsgItem extends Component {

    static propTypes = {
        icon:PropTypes.number,
        alias: PropTypes.object,
        img: PropTypes.string,
        insertdate: PropTypes.string,
        new: PropTypes.bool,
        seq:PropTypes.number,
        itemClick: PropTypes.func
    }

    render() {
        const {seq,alias,date,fromto,icon,msg,img,news,itemClick} = this.props;
        return (
            <Wapper onClick={()=>itemClick(seq)}>

                <FamilyItem icon={icon} imgData={img} size={3} news={news}/>

                <Body>
                    <Title fromto={fromto}>{msg}</Title>
                    <SubTitle>{date+", "+fromto+" "+alias.toJS()}</SubTitle>
                </Body>

                <IconNext dangerouslySetInnerHTML={{__html: SvgIcon.getInitialSvgIcon('arrowRight')}} />
             
            </Wapper>
        )
    }
} 

export default FmsgItem; 
