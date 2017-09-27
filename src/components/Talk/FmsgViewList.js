
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FmsgWriteItem from './FmsgWriteItem'
import * as Image from 'img';
import Textarea from 'react-textarea-autosize';
import { FamilyItem } from'components/Shared'
import moment from 'moment';
const Wrapper = styled.div`
     position:absolute;
     width:100%;
     top:3.5rem;
     bottom: 0;
     background: #f7f6ef;
     overflow-y:auto;
     font-size:0.9rem;
`;

const ListWrapper = styled.div`
    width:100%;
    height:4.5rem;
    display: flex;
    background: white;
    align-items: center;
    padding: 0 1rem 0 1rem;

    border-bottom: 1px solid #e4e0d7;
    text-decoration: none;
    &:active {
        filter: brightness(80%);
    }
`;

const StyledTextarea = styled(Textarea)`
    width: 100%;
    height: 100%;
    padding:1rem;
    background: #f7f6ef;
    border: none;
    resize: none;
    outline: none;
    font-size: 1rem;
    font-weight: 300;
    color: #49433c;

    ::placeholder {
        color: gray;
    }
`;

const ImageFile = styled.img`
    width:100%;
    background: #f7f6ef;
    height:auto;
    padding:1rem 1rem 0 1rem;
`;

const VideoFile = styled.video`
    width:100%;
    background: #f7f6ef;
    height:auto;
    padding:1rem 1rem 0 1rem;
`;

const Body = styled.div`
    width:70%;
    height:2.8rem;
    margin-left:1rem;
    display: flex;
    flex-wrap:wrap;
    align-items:center;
`;


const Title = styled.div`
    color:${props => props.fromto === 'to' ? '#50bbcd' : '#49433c' };
    display:  inline-block;
    font-size:0.9rem;
    color:#908d8a;
    align-items: center;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
`;

Title.propTypes={
    fromto:PropTypes.string
}

const SubTitle = styled.div`
    width:15rem;
    color:#908d8a;
    display: flex;
    font-size:0.8rem;
    align-items: center;   
    display: flex;
    align-items:center;
`;

const FmsgList = ({ msgViewData }) => {
    
   const {msg, icon,fromto, fileData,alias,date, fileType} = msgViewData.toJS();

    return (
        <Wrapper>
            <ListWrapper>
                <FamilyItem icon={icon} size={3}/>
                    <Body>
                        <Title fromto={fromto}>{fromto+" '"+alias+"'"}</Title>
                        <SubTitle>{moment(date).format('YYYY년 M월 DD일 A HH시 mm분')}</SubTitle>
                    </Body>
            </ListWrapper>
            
            {

                fileType !== undefined &&
                fileType.split('/')[0] === 'image' &&
                <ImageFile
                    src = {fileData}
                />
            }
            {
                fileType !== undefined &&
                fileType.split('/')[0] === 'video' &&
                <VideoFile
                    src = {fileData}
                    controls 
                />
            }
            <StyledTextarea 
                readonly
                value={msg}
                minRows={12} 
                maxRows={14} 
                onPaste={e=>e.preventDefault()}
            />
        </Wrapper>
    );
};

FmsgList.propTypes = {
   
    checkBoxEvent:PropTypes.func,
    receiverkeyEvnet:PropTypes.func,
    controlType: PropTypes.string
}

export default FmsgList;