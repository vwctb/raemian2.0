import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { media } from 'lib/style-utils';
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

// 화면 크기에 따라 일정 비율로 가로 사이즈를 설정합니다
const Sizer = styled.div`
    display: inline-block;
    width: 5.5rem;
    padding:0.5rem;
    ${media.tablet`
        margin: 1rem 3rem;
    `}

    ${media.bigphone`
        margin: 1rem 2rem;
    `}

    ${media.plusphone`
        margin: 0.5rem;
    `}
    ${media.mobile`
        margin: 0;
    `}

    &:active {
        filter: brightness(70%);
    }
`;

// 정사각형을 만들어줍니다. (padding-top 은 값을 % 로 설정하였을 때 부모 엘리먼트의 width 의 비율로 적용됩니다.)
const List = styled.div`
    position: relative;
    cursor: pointer;
`;

// 실제 내용이 들어가는 부분입니다.
const Contents = styled.div`

    align-items:center;
    display:flex;
    flex-flow: row wrap;
    width:100%;
    /* 텍스트가 길어지면 새 줄 생성; 박스 밖의 것은 숨김 */
`;

const Body = styled.div`
    width:100%;
    margin-top:0.7rem;
    color:white;
    text-align:center;
    font-size: 0.9rem;
`;

const Icon = styled.div`
    width:100%;
    height:4.5rem;
    background-image: url(${props => IconArray[props.icon]});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
`;

Icon.propTypes = {
    icon : PropTypes.string
}

const iconStyle = {
    height:'4rem'
};

const NewIcon = styled.div`
    width:1.5rem;
    height:1.5rem;
    background-image: url(${Image.Icon_New});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    margin-left:0.3rem;
    margin-bottom:0.1rem;
    position: absolute;
    right: -0.3rem;
    top: -0.3rem;
`;


class HomeItem extends Component {
    static propTypes = {
        item: ImmutablePropTypes.mapContains({
            name: PropTypes.string,
            icon: PropTypes.string,
            index: PropTypes.number
        }),
        newFtalk:PropTypes.bool,
        newFmsg:PropTypes.bool,
        pageType: PropTypes.string,
        onOpen: PropTypes.func
    }

    handleClick = () => {
        const { item, onOpen } = this.props;
        //onOpen(memo);
    }
  
    render() {

        const { name, icon } = this.props.item.toJS();
        const { pageType, newFtalk, newFmsg } = this.props;

        return (
            <Link 
                style = {iconStyle}
                to = {"/"+pageType+"/"+icon}
            >
                <Sizer>
                    <List >
                        <Contents>
                            {(icon === 'chat_room' && newFtalk) && <NewIcon/>}
                            {(icon === 'fmsgs' && newFmsg) && <NewIcon/>}
                            <Icon
                                icon = {icon}
                            />
                            <Body>{name}</Body>
                        </Contents>
                    </List>
                </Sizer>
            </Link>
        )
    }
}

export default HomeItem;