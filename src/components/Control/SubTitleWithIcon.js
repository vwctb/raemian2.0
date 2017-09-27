
import React from 'react';
import styled, { css } from 'styled-components';
import { CheckBox }from 'components/Shared';
import PropTypes from 'prop-types';
import * as Image from 'img';

const IconArray =
    {
        'light' : Image.Icon_Light,
        'gas' : Image.Icon_Gas,
        'heating' : Image.Icon_Heating,
        'plug' : Image.Icon_Plug,
        'aircon' : Image.Icon_Aircon,
        'guard':Image.Icon_Guard,
        'visitor' : Image.Icon_Visitor,
        'notice' : Image.Icon_Notice,
        'cctv' : Image.Icon_Cctv,
        'parcel' : Image.Icon_Parcel,
        'car_location' : Image.Icon_Car_location,
        'family_location' : Image.Icon_Family_location,
        'alrim':Image.Icon_Alrim,
        'schedule':Image.Icon_Schedule,
        'chat_room':Image.Icon_Chat_Room,
        'message':Image.Icon_Message,
        'time':Image.Icon_Control_Time ,
        'calendar':Image.Icon_Control_Schedule,
        'memo':Image.Icon_Fschedule_memo

    } 


const WrapperSpace = styled.div`
    width: 100%;
    height:3rem;
    padding-left:1rem;
    padding-right:1rem;
    display:flex;
    justify-content:space-between;
    background: #f7f6ef;
`;


const Icon = styled.div`
    width:2rem;
    height:2rem;
    background-image: url(${props => IconArray[props.icon]});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    box-shadow: 1px 1px 5px 0px #c0bfba;
    border-radius: 0.6rem;
`;

Icon.propTypes = {
    icon : PropTypes.string
}

const Body = styled.div`
    height:3rem;
    line-height:3rem;
    color:#49433c;
    font-size: 1rem;
    margin-left: 1rem;
`;

const BodySmall = styled.div`
    height:3rem;
    line-height:3rem;
    color:#49433c;
    font-size: 0.9rem;
    margin-right: 0.6rem;
`;

const ItemSpaceIcon = styled.div`
    display:flex;
    align-items:center;
    flex-flow:wrap;
    float:left;
`;

const ItemSpaceCheck = styled.div`
    display:flex;
    align-items:center;
    justify-content: flex-end;
    flex-flow:wrap;
    float:left;
`;

const SubTitle = ({title,useCheckBox,handleCheck,icon,useCheck,check,form}) => (
    <WrapperSpace>
        <ItemSpaceIcon>
            <Icon icon={icon} />
            <Body>
                {title}
            </Body>
        </ItemSpaceIcon>

        {
            useCheck && 
            <ItemSpaceCheck>
                <BodySmall>{'매년 반복'}</BodySmall>
                <CheckBox 
                    check={check} 
                    onCheckEvent={()=>handleCheck({form:form,data:!check})} 
                />
            </ItemSpaceCheck>
        }
        
    </WrapperSpace>
);

  


export default SubTitle;
