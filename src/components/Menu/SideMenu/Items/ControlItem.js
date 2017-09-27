import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';
import * as Image from 'img';

const IconArray =
    {
        'light' : Image.Icon_Light,
        'gas' : Image.Icon_Gas,
        'heating' : Image.Icon_Heating,
        'concent' : Image.Icon_Plug,
        'aircon' : Image.Icon_Aircon,
        'guard':Image.Icon_Guard,
        'visitors' : Image.Icon_Visitor,
        'notices' : Image.Icon_Notice,
        'cctvs' : Image.Icon_Cctv,
        'parcels' : Image.Icon_Parcel,
        'plocs' : Image.Icon_Car_location,
        'flocs' : Image.Icon_Family_location,
        'comehomes':Image.Icon_Alrim,
        'fschedules':Image.Icon_Schedule,
        'chat_room':Image.Icon_Chat_Room,
        'fmsgs':Image.Icon_Message
    }


const LinkSpace = styled(Link)`
    width: 50%;
    height: 1.7rem;
    display: flex;
    justify-content:flex-start;
    align-items:center;
    text-decoration: none;

    &:active {
        filter: brightness(70%);
    }

`;

const Body = styled.div`
    height:1.7rem;
    line-height:1.7rem;
    margin-left:0.7rem;
    color:white;
    text-align:center;
    font-size: 0.9rem;
    opacity: 0.6;
    float:left;
`;

const Icon = styled.div`
    width:1.7rem;
    height:1.7rem;
    float:left;
    text-align:left;
    font-size: 1rem;
    background-image: url(${props => IconArray[props.icon]});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
`;

Icon.propTypes = {
    icon : PropTypes.string
}

class ControlItem extends Component {
    static propTypes = {
        controlitem: ImmutablePropTypes.mapContains({
            name: PropTypes.string,
            icon: PropTypes.string,
            index: PropTypes.number
        }),
        pageType: PropTypes.string,
        onOpen: PropTypes.func,
        slideBack: PropTypes.func
    }

    render() {
        const { name, icon } = this.props.controlitem.toJS();
        const {slideBack,pageType} = this.props;
        return (
            <LinkSpace 
                to = {"/"+pageType+"/"+icon}
                onClick = {slideBack}
            >
                <Icon
                    icon = {icon}
                />
                <Body>{name}</Body>
            </LinkSpace>
        )
    }
}

export default ControlItem; 
