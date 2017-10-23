
import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Image from 'img';
import * as SvgIcon from 'lib/icon_svg'

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
        'message':Image.Icon_Message
    }


// 정사각형을 만들어줍니다. (padding-top 은 값을 % 로 설정하였을 때 부모 엘리먼트의 width 의 비율로 적용됩니다.)
const List = styled.div`

    width:100%;
    height:3rem;
    background: #f7f6ef;
    border-bottom:1px solid #d7d1c4;
    display: flex;
    background: white;
    align-items: center;
    padding: 0 1rem 0 1rem;
    justify-content: space-between;

`;

// 실제 내용이 들어가는 부분입니다.
const Contents = styled.div`
    height:3rem;
    display: flex;
    align-items: center;
`;

const Icon = styled.div`
    width:1.4rem;
    height:1.4rem;
    float:left;
    text-align:left;
    font-size: 1rem;
    background-image: url(${props => IconArray[props.icon]});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
`;

const ColorText = styled.span`
    color:#50bbcd;
`;

const Text = styled.span`
    font-size: 0.8rem;
    margin-left: 0.9rem;
`;

const IconNext = styled.div`
    font-size: 0px; /* inline-block 위아래 사이에 생기는 여백을 제거합니다 */
`;

Icon.propTypes = {
    icon : PropTypes.string
}

class NewAlarmItem extends Component {
    static propTypes = {
        item:PropTypes.string,
        value:PropTypes.number,
        onOpen: PropTypes.func
    }


    setContent = (item,value,onClickEvent)=>{

        let result ='';

        switch(item){
            case 'parcel':
                result = (value === 0 || value === undefined) ? <Text>미수령 택배가 없습니다.</Text> : <Text>미수령 택배가 <ColorText>{value+'건'}</ColorText> 있습니다.</Text>
                break;
            case 'notice':
                result = (value === 0 || value === undefined) ? <Text>새로운 공지사항이 없습니다.</Text> : <Text>미수령 택배가 <ColorText>{value+'건'}</ColorText> 있습니다.</Text>
                break;
            case 'visitor':
                result = (value === 0 || value === undefined) ? <Text>새로운 방문자가 없습니다.</Text> : <Text>미수령 택배가 <ColorText>{value+'건'}</ColorText> 있습니다.</Text>
                break;
            case '':
                result = (value === 0 || value === undefined) ? <Text>미수령 택배가 없습니다.</Text> : <Text>미수령 택배가 <ColorText>{value+'건'}</ColorText> 있습니다.</Text>
                break;
            case 'parcel':
                result = (value === 0 || value === undefined) ? <Text>미수령 택배가 없습니다.</Text> : <Text>미수령 택배가 <ColorText>{value+'건'}</ColorText> 있습니다.</Text>
                break;
        }
        return <List onClick={onClickEvent}><Contents><Icon icon={item} />{result} </Contents><IconNext dangerouslySetInnerHTML={{__html: SvgIcon.getInitialSvgIcon('arrowRight')}} /></List>;
    }

    render() {
        
        const { item, value, onClickEvent } = this.props;   
        return (
            <div>
                {this.setContent(item, value, onClickEvent)}  
            </div>
        )
    }
}

export default NewAlarmItem;