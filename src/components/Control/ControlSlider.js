import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from 'redux/modules/ui';

import $ from 'jquery';
import 'round-slider';
import 'round-slider/dist/roundslider.min.css';
import './ControlSliderItem.css';


// 화면 크기에 따라 일정 비율로 가로 사이즈를 설정합니다
const Sizer = styled.div`
    /* 레이아웃 */
    display: flex;
    align-items:center;
    justify-content: center;
    position: fixed;
    bottom: 4rem;
    width: 100%;
    top: 3.5rem;
    z-index: 1;
    overflow:auto;
    /* 색상 */
    background: #f7f6ef;
    color: #49433c;
    box-shadow: 0 -3px 6px rgba(0,0,0,0.10);
    /* 폰트 */
    font-size: 1.3rem;
`;

const SizerOver = styled.div`
    /* 레이아웃 */
    display: flex;
    align-items:center;
    justify-content: center;
    position: fixed;
    bottom: 4rem;
    width: 100%;
    top: 3.5rem;
    z-index: 2;
    overflow:auto;
    /* 색상 */
    background: #f7f6ef;
    color: #49433c;
    box-shadow: 0 -3px 6px rgba(0,0,0,0.10);
    /* 폰트 */
    font-size: 1.3rem;
`;

// 정사각형을 만들어줍니다. (padding-top 은 값을 % 로 설정하였을 때 부모 엘리먼트의 width 의 비율로 적용됩니다.)
const Square = styled.div`
    width: 220px;
    height: 320px;
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

const CurrentTempSpace =  styled.div`
    width: 100%;
    margin-top:2rem;
    float: left;
    height: 45px;
    text-align: center;
    display: flex;
    align-content: center;
    align-items:center;
    justify-content: center;
`;

const CurrentTemp =  styled.div`
    font-size: 1.2rem;
    color:#49433c;
`;

const CurrentTempValue =  styled.div`
    font-family: numans;
    margin-left:0.5rem;
    font-size:3rem;
`;

const OffBox =  styled.div`
    font-family: rixM;
    width: 220px;
    height: 220px;
    line-height: 200px;
    font-size:2rem;
    margin-bottom: 0.3rem;
    background:#757371;
    border:10px solid #908d8a;
    border-radius:220px;
    text-align:center;
    color:white;
    position: relative;
    display: inline-block;
`;

class ControllSlider extends Component {

    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        status: PropTypes.string,
        currentTemp: PropTypes.string,
        configTemp: PropTypes.string
    }
   
    componentDidMount() {
        const { configTemp, status } = this.props.controlitem.toJS();
        const { handleClick, handleChange, controlType } = this.props;
        //const {handleClick} = this;
        
        $(this.slider).roundSlider({
            radius: 110,
            width: 10,
            editableTooltip: false,
            animation: false,
            min: (controlType === "heating") ? 5 : 18,
            max: (controlType === "heating") ? 40 : 30,
            handleSize: "+20",
            value: configTemp,
            startAngle: 90,
            sliderType: "min-range",
            tooltipFormat: tooltipVal,
        });

        $('.rs-tooltip').click(function(){
            handleClick();
           // UIActions.changeInput({configTempValue, value});
        });

        function tooltipVal(args) {
            var value = args.value+"°"
            handleChange(args.value+'');
            return value +'<div class="tooltip">설정 온도</div>';
        }  
    }


    render() {
        const {id, name, status, configTemp, currentTemp} = this.props.controlitem.toJS();
        const {controlType, handleClick} = this.props;
        return (
       <div>
            {
            status === 'off' &&
                <SizerOver className={'controlType_'+controlType}>
                    <Square className="sliderSignle" >
                        <OffBox onClick={handleClick}>꺼짐</OffBox>
                        <CurrentTempSpace>
                            <CurrentTemp> 현재 온도 </CurrentTemp> <CurrentTempValue className={'CurrentTempValue'}> {Number(currentTemp)}° </CurrentTempValue>
                        </CurrentTempSpace>
                    </Square>
                </SizerOver>
            }
            <Sizer className={'controlType_'+controlType}>
                <Square className="sliderSignle" >
                   <div id="slider_inside" className="rslider" ref={ref=>this.slider=ref}></div>
                   <CurrentTempSpace>
                         <CurrentTemp> 현재 온도 </CurrentTemp> <CurrentTempValue className={'CurrentTempValue'}> {Number(currentTemp)}° </CurrentTempValue>
                    </CurrentTempSpace>
                </Square>
            </Sizer>
            </div>
        )
    }
}


export default ControllSlider;

