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
    justify-content: space-between;
    border-bottom: 1px solid #e4e0d7;
    text-decoration: none;
    &:active {
        filter: brightness(80%);
    }
`;

const Body = styled.div`
    width:55%;
    height:2.8rem;
    display: flex;
    flex-wrap:nowrap;
    align-items:center;
`;


const Title = styled.div`
    color:#49433c;
    display: flex;
    font-size:1rem;
    margin-left:1rem;
    align-items: center;
`;

const LocationON = styled.div`
    color:#50bbcd;
    font-size:1rem;
`;

const LocationOFF = styled.div`
    color:#aaa6a1;
    font-size:1rem;
`;
class FlocsItem extends Component {

    static propTypes = {
        location: PropTypes.string,
        alias: PropTypes.string,
        icon:PropTypes.number,
        img: PropTypes.string,
        tagcolor: PropTypes.string
    }

    render() {
        const {alias,location,icon,imgData,tagcolor} = this.props;

        return (
            <Wapper>
                <Body>
                    <FamilyItem icon={icon} imgData ={imgData} size={3} tagcolor={tagcolor}/>
                    <Title>{alias}</Title>
                </Body>
               { location !== '서비스 지역내 없음' ? <LocationON>{location}</LocationON> :  <LocationOFF>{location}</LocationOFF>  }
             
            </Wapper>
        )
    }
} 

export default FlocsItem; 
