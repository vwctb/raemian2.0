import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Icon_Check} from 'img';
import * as SvgIcon from 'lib/icon_svg'
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

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

const BtnSpace = styled.div`
    width:100%;
    height:8rem;
    padding:0.6rem;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
`;

const BtnAmPmSpace = styled.div`
    width:4rem;
    height:9rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
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

const TextTime = styled.div`
    font-family: numans;
    width: 100%;
    height: 3.5rem;
    font-size: 2rem;
    line-height: 3.5rem;
    text-align:center;
    word-spacing: 0.5rem;
    float:left;
    color:${props=>props.disable === false ? '#aaa6a1' : '#50bbcd'};
    filter:${props=>props.disable === false && 'brightness(120%)'};

`;

const BtnInnerSpace =  styled.div`
    width:7rem;
    display:flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    filter:${props=>props.disable === false && 'brightness(110%)'};
    svg {
        fill: ${props=>props.disable === false && '#aaa6a1'};
    }

`;

TextTime.propTypes={
    disable : PropTypes.bool
}

BtnInnerSpace.propTypes={
    disable : PropTypes.bool
}

const ReserveTimeContainers = ({disable, ampm , hour, minute, handleClickAddYear,handleClickAddMonth,handleClickAddDay,year,month,day,form}) => {

        return (
            <Wrapper>
                <BtnSpace>
            
                    <BtnInnerSpace
                        disable={disable}
                    >
                        <BtnPlus
                            onClick={()=>disable && handleClickAddYear({form:form,data:year+1+''})}
                            dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('btnIconPlus')}}
                        />
                        <TextTime  disable={disable}>
                            {year}
                        </TextTime> 
                        <BtnMinus
                            onClick={()=>disable && handleClickAddYear({form:form,data:year-1+''})}
                            dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('btnIconMinus')}}
                        /> 
                    </BtnInnerSpace>


                    <BtnInnerSpace>
                        <BtnPlus
                            onClick={()=>  month < 12 && handleClickAddMonth({form:form,data:month+1+''})}
                            dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('btnIconPlus')}}
                        />
                        <TextTime>
                            {month}
                        </TextTime> 
                        <BtnMinus
                            onClick={()=> month > 1 && handleClickAddMonth({form:form,data:month-1+''})}
                            dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('btnIconMinus')}}
                        /> 
                    </BtnInnerSpace>

                    <BtnInnerSpace>
                        <BtnPlus
                            onClick={()=> day < moment(year+'-'+month).local().endOf('month').format('D') && handleClickAddDay({form:form,data:day+1+''})}
                            dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('btnIconPlus')}}
                        />
                        <TextTime>
                            {moment(year+'-'+month).local().endOf('month').format('D') > day ? day : moment(year+'-'+month).local().endOf('month').format('D')}
                        </TextTime> 
                        <BtnMinus
                            onClick={()=> day  > 1 && handleClickAddDay({form:form,data:day-1+''})}
                            dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('btnIconMinus')}}
                        /> 
                    </BtnInnerSpace>
                </BtnSpace>
            </Wrapper>
        );
    };
    
    ReserveTimeContainers.propTypes = {
        hour: PropTypes.number,
        minute: PropTypes.number,
        handleClickAddYear: PropTypes.func,
        handleClickAddMonth: PropTypes.func,
        handleClickAddDay: PropTypes.func,
        year:PropTypes.number,
        month:PropTypes.number,
        day:PropTypes.number
    }
    
    
export default ReserveTimeContainers;
