import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Route, Switch } from 'react-router-dom';

import $ from 'jquery';
import 'round-slider';
import 'round-slider/dist/roundslider.min.css';
import './ControlSliderItem.css';


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
    width:100%;
    height:4.5rem;
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
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

const CurrentTempSpace =  styled.div`
    width: 100%;
    margin-top:0.7rem;
    float: left;
    height: 20px;
    text-align: center;
    display: flex;
    align-content: center;
    align-items:center;
    justify-content: center;
`;

const CurrentTemp =  styled.div`
    font-size: 0.8rem;
    color:#49433c;
`;

const CurrentTempValue =  styled.div`
    font-family: numans;
    margin-left:0.5rem;
    font-size:1.5rem;
`;

const OffBox =  styled.div`
    font-family: rixM;
    width:90px;
    height:90px;
    line-height:80px;
    font-size:1.2rem;
    background:#757371;
    border:5px solid #908d8a;
    border-radius:90px;
    text-align:center;
    color:white;
    position: relative;
    display: inline-block;
`;

class ControllSliderItem extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    componentDidMount() {
        const { configTemp } = this.props.slideritem.toJS();

        $(this.slider).roundSlider({
            radius: 45,
            width: 5,
            editableTooltip: false,
            readOnly: true,
            min: 18,
            max: 35,
            handleSize: "+0",
            handleShape: "square",
            value: configTemp,
            startAngle: 90,
            sliderType: "min-range",
            tooltipFormat: tooltipVal,
        });

        function tooltipVal(args) {
            var value = args.value+"°"
            return value;
        }
    }

    static propTypes = {
        slideritem: ImmutablePropTypes.mapContains({
            id: PropTypes.string,
            name: PropTypes.string,
            status: PropTypes.string,
            currentTemp: PropTypes.string,
            configTemp: PropTypes.string
        }),
        controlType:PropTypes.string,
        itemClick: PropTypes.func
    }

    handleClick = () => {
        const { history } = this.context.router;
        const {status,name } = this.props.slideritem.toJS();
        const {itemClick, controlType} = this.props;

        if(status !=='err'){
            itemClick({nowSelectItem:this.props.slideritem});
            history.push("/control/"+controlType+"/"+name);
        }else{
            alert('연결상태를 확인해주세요.');
        }
        
    }

    render() {
        const { id, name, status, configTemp, currentTemp } = this.props.slideritem.toJS();
        const { handleClick } = this;
        return (
            <Sizer onClick = {handleClick}>

                <Square className="sliderMulti">
                    <Title>
                        {name}
                    </Title>
                     {(status === 'on') ? <div id={'slider_'+id} className="rslider" ref={ref=>this.slider=ref}></div> : <OffBox>꺼짐</OffBox>}
                   <CurrentTempSpace>
                         <CurrentTemp> 현재  </CurrentTemp> <CurrentTempValue className={'CurrentTempValue'}> {currentTemp}° </CurrentTempValue>
                    </CurrentTempSpace>
                </Square>

            </Sizer>
        )
    }
}

export default ControllSliderItem;