import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as SvgIcon from 'lib/icon_svg'

const Wrapper = styled.div`
    width: 100%;
    height:3rem;
`;

const Button1 = styled.div`
    width:100%;
    height:100%;
    line-height:3rem;
    font-size: 0.9rem;
    background:${props => (props.check) ? '#50bbcd' : '#cccbca'};
    color:${props => (props.check) ? '#ffffff' : '#757371'};
    text-align:center;
    float: left;
    display:flex;
    align-items: center;
    justify-content:center;
`;

Button1.propTypes ={
    check:PropTypes.bool
}

const Button2 = styled.div`
    width:100%;
    height:100%;
    line-height:3rem;
    font-size: 0.9rem;
    background:${props => (props.check) ? '#cccbca' : '#ff8062'};
    color:${props => (props.check) ? '#757371' : '#ffffff'};
    text-align:center;
    float: left;
    display:flex;
    align-items: center;
    justify-content:center;


`;

Button2.propTypes ={
    check:PropTypes.bool
}


const CheckIcon = styled.div`
    float:left;
`;

const BtnSpace = styled.div`
    float:left;
    width:50%;

`;

class BtnDubble extends Component {
    static propTypes = {
        from:PropTypes.string,
        name1:PropTypes.string,
        color1:PropTypes.string,
        onClickEvent1: PropTypes.func,
        name2:PropTypes.string,
        color2:PropTypes.string,
        onClickEvent2: PropTypes.func
    }

    render() {
        const { name1, onClickEvent, name2, from, check } = this.props;
        const $CheckIcon = <CheckIcon dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('checkBig')}} />;
        return (
            <Wrapper>

                <BtnSpace
                    onClick={()=>{onClickEvent({from:from,check:true})}}
                >
                   
                    <Button1 
                        check = {check}
                    >
                    {check === true && $CheckIcon}
                    {name1}
                    </Button1 >
                </BtnSpace>
                <BtnSpace
                      onClick={()=>{onClickEvent({from:from,check:false})}}
                >
                    
                    <Button2
                        check = {check}
                    >
                    {check === false && $CheckIcon}
                    {name2}
                    </Button2>
                </BtnSpace>
            </Wrapper>
        )
    }
}

export default BtnDubble;