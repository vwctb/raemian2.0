import React, {Component} from 'react';
import styled from 'styled-components';
import FileInput from 'react-file-input';
import * as Image from 'img';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    width:100%;
    height:4rem;
    padding: ${props => props.focus ? '0 0 0 0.6rem' : '0 0.6rem 0 0.6rem'};
    position: absolute;
    bottom: 0;
    display:flex;
    align-items:center;
    justify-content:space-between;
    background:#aaa6a1;
`;
Wrapper.propTypes = {
    focus : PropTypes.bool
}

const Button = styled.div`
    width:20%;
    height:4rem;
    line-height:4rem;
    font-size: 1.2rem;
    background:#50bbcd;
    color:#ffffff;
    text-align:center;
    &:active {
        filter: brightness(80%);
    }
`;

Button.propTypes = {
    focus : PropTypes.bool
}

const Input = styled.input`
    width: ${props => props.focus ? '62%' : '85%'};
    color:#49433c;
    height:2.7rem;
    line-height:2.7rem;
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 0.9rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-right:${props => props.focus && '0.6rem'};
`;
Input.propTypes = {
    focus : PropTypes.bool
}

const BtnFileUpload = styled.div`
    border:0;
    background:0;
    outline-width: 0;
    margin-right:0.3rem;
    width: ${props => props.focus ? '12%' : '15%'};
    height:3rem;
    background-image: url(${Image.Icon_FileUpload_White});
    background-position: center;
    background-repeat: no-repeat;
    background-size: auto 1.5rem;
    overflow: hidden;
`;
BtnFileUpload.propTypes = {
    focus : PropTypes.bool
}

class TalkInput extends Component {
    render() {
        const {sendMsg,onCheckEvent,handleClickSendMsg,handleChangeInput,handleChangeFile,handleFocus} = this.props;
        const { msg, focus } = sendMsg.toJS();
    
        return (
            <Wrapper
                onClick={onCheckEvent}
                focus = {focus}
            >
                <BtnFileUpload
                    focus = {focus}
                >
                <FileInput
                    name="myImage"
                    placeholder=''
                    className="inputFileClass"
                    onChange={handleChangeFile}
                />
                </BtnFileUpload>
                <Input
                    focus = {focus}
                    value = {msg}
                    onClick={()=>handleFocus(true)}
                    onChange={handleChangeInput}
                />
                {
                    focus &&
                    <Button
                        onClick={handleClickSendMsg}
                    >
                    {'전송'}
                    </Button>
                   
                }
                    
            </Wrapper>

        )
    }
}

export default TalkInput