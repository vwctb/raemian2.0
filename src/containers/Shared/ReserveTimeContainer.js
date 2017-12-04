import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Icon_Check} from 'img';
import * as SvgIcon from 'lib/icon_svg'
import ImmutablePropTypes from 'react-immutable-proptypes';

const Wrapper = styled.div`
    width:100%;
    height:10rem;
    padding:1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background:#ffffff;
    border-top: 1px solid #e4e0d7;
    border-bottom: 1px solid #e4e0d7;
 
`;

const BtnAmPm = styled.div`
    width:5rem;
    height:2.7rem;
    border:1px solid #d5d5d6;
    text-align:center;
    line-height:2.7rem;
    border-radius:4px; 
    color:#000;
    background: linear-gradient( to bottom,white,#e8e9e9);
    display:inline-block;
    &:active {
        filter: brightness(80%);
    }
`;

const BtnTimeSpace = styled.div`
    width:12.5rem;
    height:8rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    opacity: ${props=>props.use === false && '0.5'};
`;


const BtnTimeInnerSpace = styled.div`

    width: 5.5rem;
    float:left;
`;




const BtnAmPmSpace = styled.div`
    width:4rem;
    height:9rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: ${props=>props.use === false && '0.5'};
`;

const BtnPlus = styled.div`
    width:5.5rem;
    height:1.8rem;
    float:left;
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px solid #d5d5d6;
    border-radius:4px; 
    background: linear-gradient( to bottom,white,#e8e9e9);
    &:active {
        filter: brightness(80%);
    }
`;

const BtnMinus = styled.div`
    width:5.5rem;
    height:1.8rem;
    float:left;
    display: flex;
    align-items: center;
    justify-content: center;
    border:1px solid #d5d5d6;
    border-radius:4px; 
    background: linear-gradient( to bottom,white,#e8e9e9);
    &:active {
        filter: brightness(80%);
    }
`;



const TextSpace = styled.div`
    font-family: numans;
    width: 1rem;
    hegith:10rem;
    font-size: 2.6rem;
    line-height: 10rem;
    text-align:center;
    color:#50bbcd;
    word-spacing: 0.5rem;
    float:left;
`;

const TextTime = styled.div`
    font-family: numans;
    width: 5.5rem;
    height: 3rem;
    font-size: 2.6rem;
    line-height: 3rem;
    text-align:center;
    color:#50bbcd;
    word-spacing: 0.5rem;
    float:left;
`;


const ReserveTimeContainers = ({ampm , hour, minute, handleClick, handleClickAMPM, use}) => {

        let ampmValue = ampm ==='am' ? 'pm' : 'am';
        return (
            <Wrapper
              
            >
                <BtnAmPmSpace
                    use={use}
                    onClick={()=>{handleClickAMPM(ampmValue);}}
                >
                    <BtnAmPm>
                        {ampm === 'pm' ? '오후':'오전'}
                    </BtnAmPm>
                </BtnAmPmSpace>
                <BtnTimeSpace
                    use={use}
                >

                    <BtnTimeInnerSpace>
                        <BtnPlus
                            onClick={()=>{
                                (hour >= 0 && hour < 12) &&  handleClick({form:'hour',time:hour+1  });
                            }}
                            dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('btnIconPlus')}}
                        />

                        <TextTime>
                            {
                                (hour > 9) ? hour : '0'+hour
                            }
                        </TextTime> 
                    
                        <BtnMinus
                        onClick={()=>{
                            (hour > 0 && hour <= 12) &&  handleClick({form:'hour',time:hour-1});
                        }}
                        dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('btnIconMinus')}}
                        />  
                    </BtnTimeInnerSpace>
                    <TextSpace>:</TextSpace>
                    <BtnTimeInnerSpace>
                        <BtnPlus
                            onClick={()=>{
                                (minute >= 0 && minute < 60) &&  handleClick({form:'minute',time:minute+1});
                            }}
                            dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('btnIconPlus')}}
                        />
                            <TextTime>
                                {
                                    (minute > 9) ? minute : '0'+minute
                                }
                            </TextTime> 
                        
                        <BtnMinus
                            onClick={()=>{
                                (minute > 0 && minute <= 60) &&  handleClick({form:'minute',time:minute-1});
                            }}
                            dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('btnIconMinus')}}
                        />
                    </BtnTimeInnerSpace>
                </BtnTimeSpace>
            </Wrapper>
        );
    };
    
    ReserveTimeContainers.propTypes = {
        hour: PropTypes.number,
        minute: PropTypes.number,
        ampm: PropTypes.string,
        handleClick: PropTypes.func,
        handleClickAMPM:PropTypes.func
    }
    
    
export default ReserveTimeContainers;
