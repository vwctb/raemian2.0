import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Icon_Check} from 'img';
import {BtnKeyNum} from 'components/Shared'

const Wrapper = styled.div`
    position:fixed;
    bottom:4rem;
    top:6.5rem;
`;

const BtnNumberSpace = styled.div`
    width:100%;
    height:100%;
    padding:0 1rem 0rem 1rem;
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
    color:#ff8366;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.8rem;
    padding-left: 1.2rem;
    padding-right: 0.5rem;
   
`;

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



let pass = '';
class KeyPadNumContainers extends Component {
    static propTypes = {
        onClickEvent: PropTypes.func,
        onClickEventDelete:PropTypes.func,
        active:PropTypes.bool,
        value:PropTypes.string,
        passInput:PropTypes.string,
        notice:PropTypes.string,
    }
    render() {
        const { onClickEvent,onClickEventDelete,passInput,notice } = this.props;
        return (
           // active ? <CheckBoxOn onClick={onClickEvent}/> : <CheckBoxOff onClick={onClickEvent}/>
        <Wrapper>

            
            <BtnNumberSpace>
                    <Notice>{notice}</Notice>
                    <InputStyle
                        value={passInput}
                        onChange={()=>{}}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        value = {'1'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        value = {'2'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        value = {'3'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        value = {'4'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        value = {'5'}
                    />
                     <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        value = {'6'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        value = {'7'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        value = {'8'}
                    />
                    <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        value = {'9'}
                    />
                    <BtnEmpty
                   
                    />
                     <BtnKeyNum
                        onClickEvent ={onClickEvent}
                        value = {'0'}
                    />
                     <BtnKeyNum
                        onClickEvent ={onClickEventDelete}
                        value = {'←'}
                    />
            </BtnNumberSpace>

        </Wrapper>
        )
    }
}

export default KeyPadNumContainers;