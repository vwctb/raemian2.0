import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as SvgIcon from 'lib/icon_svg'
import {Icon_New} from 'img';

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
    width:75%;
    height:2.8rem;
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

const StatusON = styled.div`
    color:#50bbcd;
`;

const StatusOFF = styled.div`
    color:#ff8062;
`;

class ParcelsItem extends Component {

    static propTypes = {
        location:PropTypes.string,
        company: PropTypes.string,
        parceldate: PropTypes.string,
        status: PropTypes.string
    }

    render() {
        const {date,location,status} = this.props;

        return (
            <Wapper>
                <Body>
                    <Title>{"'"+location+"'에 택배가 도착하였습니다."}</Title>
                    <SubTitle>{date.split(',')[0]}</SubTitle>
                </Body>
                { status === '수령' || status === '고객수령'  ? <StatusON>{status}</StatusON> : <StatusOFF>{status}</StatusOFF>}
             
        
            </Wapper>
        )
    }
} 

export default ParcelsItem; 
