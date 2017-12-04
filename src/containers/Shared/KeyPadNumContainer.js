import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Icon_Check} from 'img';
import {BtnKeyNum} from 'components/Shared'
import { shadow, media } from 'lib/style-utils';

const Wrapper = styled.div`
    position:fixed;
    bottom:4rem;
    ${media.plusphone`
        padding:${props => props.type === 'screenLock' && '0 2rem 0 2rem' };
    `}
    ${media.mobile`
        padding:${props => props.type === 'screenLock' && '0 1.5rem 0 1.5rem' };
    `}
    top:${props => props.type === 'screenLock' ? '7rem' : '6.5rem' };
`;

Wrapper.propTypes={
    type:PropTypes.string
}

const BtnNumberSpace = styled.div`
    width:100%;
    height:100%;
    
    ${media.plusphone`
        padding:0 2rem 0 2rem;
    `}

    ${media.mobile`
        padding:0 1rem 0 1rem;
    `}

    display: flex;
    align-content: center;
    align-items: center;
    justify-content:center;
    flex-flow: row wrap;
`;

const CheckBoxOff = styled.div`
    width:1.4rem;
    height:1.4rem;
    border-radius: 0.3rem;
    background: linear-gradient(to bottom, #ffffff 13%,#f0f0f4 50%);
    border:1px solid #cecece;
`;

const InputStyle = styled.input`
    width:100%;
    height:3rem;
    letter-spacing: 0.5rem;
    text-align: center;
    outline: none;
    background: none;
    border: 0;
    color:${props => props.type === 'screenLock' ? '#ffffff' : '#ff8366'};
    border-radius: 0px;
    line-height: 2.5rem;
    font-size:${props => props.type === 'screenLock' ? '2rem' : '1.8rem'};
    padding-left: 1.2rem;
    padding-right: 0.5rem;
    margin-bottom:${props => props.type === 'screenLock' && '1rem'};
`;

InputStyle.propTypes={
    type:PropTypes.string
}

const BtnEmpty = styled.div`
    width:4rem;
    height:4rem;
    border-radius: 4rem;
    text-align:center;
    line-height:4rem;
    margin:0.5rem;
    font-size:1.6rem;
    cursor:pointer;
`;


const Notice =styled.div`
    width:100%;
    height:4rem;
    line-height:4rem;
    text-align:center;
    font-size:0.9rem;
    color:#c1c2c3;
`;


class KeyPadNumContainers extends Component {
    static propTypes = {
        onClickEvent: PropTypes.func,
        onClickEventDelete:PropTypes.func,
        active:PropTypes.bool,
        value:PropTypes.string,
        passInput:PropTypes.string,
        notice:PropTypes.string,
        type:PropTypes.string
    }
    render() {
        const { onClickEvent,onClickEventDelete,passInput,notice,type } = this.props;
        return (
           // active ? <CheckBoxOn onClick={onClickEvent}/> : <CheckBoxOff onClick={onClickEvent}/>
        <Wrapper type={type}>

            <BtnNumberSpace>
                    <Notice>{notice}</Notice>
                    <InputStyle
                        value={passInput}
                        onChange={()=>{}}
                        type={type}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        type={type}
                        value = {'1'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        type={type}
                        value = {'2'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        type={type}
                        value = {'3'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        value = {'4'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        type={type}
                        value = {'5'}
                    />
                     <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        type={type}
                        value = {'6'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        type={type}
                        value = {'7'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        type={type}
                        value = {'8'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        type={type}
                        value = {'9'}
                    />
                    <BtnEmpty
                   
                    />
                     <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        type={type}
                        value = {'0'}
                    />
                     <BtnKeyNum
                        onClickEvent ={onClickEventDelete}
                        type={type}
                        value = {'←'}
                    />
            </BtnNumberSpace>

        </Wrapper>
        )
    }
}

export default KeyPadNumContainers;