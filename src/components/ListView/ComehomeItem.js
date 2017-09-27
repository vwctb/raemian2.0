import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FamilyItem } from'components/Shared'
import * as Image from 'img';

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
    width:75%;
    height:2.8rem;
    margin-left:1rem;
    display: flex;
    flex-wrap:wrap;
    align-items:center;
`;


const Title = styled.div`
    color:#49433c;
    display: flex;
    font-size:1rem;
    align-items: center;
`;

const SubTitle = styled.div`
    width:15rem;
    color:#908d8a;
    display: flex;
    font-size:0.7rem;
    align-items: center;   
    display: flex;
    align-items:center;
`;

class ComehomeItem extends Component {

    static propTypes = {
        icon:PropTypes.number,
        alias: PropTypes.string,
        img: PropTypes.string,
        insertdate: PropTypes.string,
        new: PropTypes.bool
    }

    render() {
        const {alias,date,icon,img} = this.props;

        return (
            <Wapper>
                <FamilyItem icon={icon} size={3}/>
                <Body>
                    <Title>{"'"+alias+"'님이 집에 도착하였습니다."}</Title>
                    <SubTitle>{date}</SubTitle>
                </Body>
             
            </Wapper>
        )
    }
} 

export default ComehomeItem; 
