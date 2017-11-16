
import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FamilyItem } from'components/Shared'
import * as Image from 'img';
import * as SvgIcon from 'lib/icon_svg'

const Wapper = styled.div`
    margin-top: 1.5rem;
    margin: 0.1rem;
    text-decoration: none;
    &:active {
        filter: brightness(80%);
    }
`;

class FmsgWriteItemItem extends Component {

    static propTypes = {
        icon:PropTypes.number,
        userkey:PropTypes.number,
        img: PropTypes.string,
        check: PropTypes.bool,
        onClickEvent: PropTypes.func
    }

    render() {
        const {check,icon,img,onClickEvent,userkey} = this.props;

        return (
            <Wapper
                onClick={()=>onClickEvent(userkey)}
            >
                <FamilyItem icon={icon} size={3} imgData={img} check={check} />
            </Wapper>
        )
    }
} 

export default FmsgWriteItemItem; 
