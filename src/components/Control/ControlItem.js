import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as Image from 'img';

const IconArray =
{
    'light_on' : Image.Icon_Control_Light_On,
    'light_off' : Image.Icon_Control_Light_Off,
    'concent_on' : Image.Icon_Control_Concent_On,
    'concent_off' : Image.Icon_Control_Concent_Off
}

// 화면 크기에 따라 일정 비율로 가로 사이즈를 설정합니다
const Sizer = styled.div`
    display: inline-block;
    margin-bottom:2rem;
`;

// 정사각형을 만들어줍니다. (padding-top 은 값을 % 로 설정하였을 때 부모 엘리먼트의 width 의 비율로 적용됩니다.)
const Square = styled.div`
    width: 5.6rem;
    height: 10rem;
    cursor: pointer;

    @media (max-width: 1200px) {
           margin:0rem;
    }
    @media (max-width: 600px) {
          margin: 1rem;
    }

    @media (max-width: 414px) {
           margin:1rem;
    }
     @media (max-width: 390px) {
          margin: 0rem;
    }
    @media (max-width: 360px) {
           margin:0.5rem;
    }
`;


const Icon = styled.div`
    width:1.4rem;
    height:2rem;
    font-size: 1rem;
    background-image: url(${props => IconArray[props.icon]});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    margin-top:0.3rem;
`;
Icon.propTypes = {
    icon : PropTypes.string
}

const Title = styled.div`
    width: 100%;
    float: left;
    height: 20px;
    font-size: 1rem;
    text-align: center;
    color:#49433c;
    margin-bottom:0.5rem;
`;

const Name = styled.div`
    width: 100%;
    font-size: 0.9rem;
    text-align: center;
    color:#49433c;
    margin-bottom: 0.5rem;
`;

const OffBox =  styled.div`
    font-family: rixM;
    width:90px;
    height:90px;
    background: linear-gradient(to bottom, #ffffff, #e5e5e5);
    border:5px solid #bbb4ad;
    border-radius:90px;
    text-align:center;
    color: black;
    position: relative;
    display: flex;
    justify-content:center;
    align-items:center;
    flex-flow: row wrap;
`;

const OnBox =  styled.div`
    font-family: rixM;
    width:90px;
    height:90px;
    background: linear-gradient(to bottom, #ffffff, #e5e5e5);
    border:5px solid #ff8062;
    border-radius:90px;
    text-align: center;
    color: black;
    position: relative;
    display: flex;
    justify-content:center;
    align-items:center;
    flex-flow: row wrap;
`;


class ControllItem extends Component {
    componentDidMount() {
        function tooltipVal(args) {
            var value = args.value+"°"
            return value;
        }
    }

    static propTypes = {
        item: ImmutablePropTypes.mapContains({
            id: PropTypes.string,
            name: PropTypes.string,
            status: PropTypes.string
        }),
        controlType:PropTypes.string,
        itemClick: PropTypes.func
    }

    handleClick = () => {
        const {itemClick} = this.props;
        itemClick(this.props.item);
    }
  
    render() {
        const { id, name, status } = this.props.item.toJS();
        const {controlType} = this.props;
        
        const { handleClick } = this;
        return (
            <Sizer>
                <Square className="Multi" >
                    <Title>
                        {name}
                    </Title>
                        {(status === 'on') ? <OnBox onClick = {handleClick}> <Icon icon={controlType+'_on'}/> <Name>켜짐</Name> </OnBox> : <OffBox onClick = {handleClick}> <Icon icon={controlType+'_off'}/> <Name>꺼짐</Name>  </OffBox>}
                </Square>
            </Sizer>
        )
    }
}

export default ControllItem;