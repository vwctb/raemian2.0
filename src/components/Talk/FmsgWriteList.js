
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FmsgWriteItem from './FmsgWriteItem'
import * as Image from 'img';
import Textarea from 'react-textarea-autosize';
import { CheckBox }from 'components/Shared';
import FileInput from 'react-file-input';
import * as proxyServer from 'lib/proxyServer';

const Wrapper = styled.div`
     position:absolute;
     width:100%;
     top:3.5rem;
     bottom: 0;
     background:white;
     overflow-y:auto;
     font-size:0.9rem;
`;

const ItemListWrapper = styled.div`
    width:12rem;
    float:right;
    padding:0.5rem;
    margin-right: 0.5rem;
    display: flex;
    align-content: center;
    justify-content:space-between;
    align-items:center;
    flex-flow: row wrap;
`;

const CheckItemListWrapper = styled.div`
    height:3rem;
    float:right;
    display: flex;
    align-content: center;
    justify-content:space-around;
    align-items:center;
    flex-flow: row wrap;
`;

const CheckTitleSpace = styled.div`
    height:3rem;
    line-height:3rem;
    float:left;
    display: flex;
    flex-flow: wrap;
    align-content: center;
    justify-content:center;
    padding-left:1rem;
`;

const ListWrapper = styled.div`
    width:100%;
    border-bottom: 1px solid #d7d1c4;
    float: left;
    background:#f7f6ef;
`;

const TitleSpace = styled.div`
    width:10rem;
    height:5rem;
    float:left;
    display: flex;
    flex-flow: wrap;
    align-content: center;
    justify-content:flex-start;
    padding-left:1rem;
`;

const Title = styled.div`
    width:100%;
`;


const CheckBoxSpace = styled.div`
    display: flex;
    flex-flow: wrap;
    align-content: center;
    justify-content:center;
`;

const Body = styled.div`
    height:1.4rem;
    line-height:1.4rem;
    margin-right:1rem;
    margin-left:0.2rem;
`;

const Name = styled.div`
    width:100%;
    height: 1rem;
    color:#50bbcd;
    float:left;
    margin-top:0.3rem;
    font-size:0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;


const StyledTextarea = styled(Textarea)`
    width: 100%;
    height: 100%;
    padding:1rem;
    background: white;
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
    height:auto;
    padding:1rem 1rem 0 1rem;
`;

const VideoFile = styled.video`
    width:100%;
    height:auto;
    padding:1rem 1rem 0 1rem;
`;

const BtnFileUpload = styled.div`
    float:right;
    border:0;
    background:0;
    outline-width: 0;
    margin-right:1rem;
    width: 2.5rem;
    height:3rem;
    background-image: url(${Image.Icon_FileUpload});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    overflow: hidden;
`;

const FmsgList = ({handleChangeInput,checkBoxEvent,receiverkeyEvnet,handleChangeFile,receiverkey,uploadFile,listArray,userArray,write,pageType,selectedType,itemClick,typeClick,msgFileupload}) => {
    let cnt = 0;
    const {msg,receivetime,fileid} = write.toJS();
    let key = receiverkey.toJS();
    let fnames=[];
    console.log(listArray);
    const list = listArray.map(
        item => (
            <FmsgWriteItem
                key={cnt++}
                userkey={item.get('userkey')}
                alias={item.get('alias')}
                icon={item.get('icon')}
                img={item.get('img')}
                check={key[key.indexOf(item.get('userkey'))] === item.get('userkey') ? true : false }
                onClickEvent={receiverkeyEvnet}
              
           />
        
        )
    );
    listArray.map(
        item => (
            key[key.indexOf(item.get('userkey'))] === item.get('userkey') &&
            fnames.unshift(item.get('alias'))
        )
    );

    console.log('msgFileupload::',msgFileupload);
    const { fileType, fileName, fileData } = uploadFile.toJS();
    let filePath = '';
    if(msgFileupload){
        filePath  = msgFileupload.get('filePath');
    }
    
    return (
        <Wrapper>
            <ListWrapper>
                <TitleSpace>
                    <Title>받는 가족</Title>
                    <Name>{fnames.toString()}</Name>
                </TitleSpace>
                <ItemListWrapper>
                    {list}
                </ItemListWrapper>
            </ListWrapper>

            <ListWrapper>
                <CheckTitleSpace>
                    <Title>받을 시간</Title>
                </CheckTitleSpace>
                <CheckItemListWrapper>
                    <CheckBoxSpace>
                        <CheckBox
                            check = {receivetime === 1 && true}
                            onCheckEvent={()=>checkBoxEvent(1)}
                        />
                        <Body>지금</Body>
                    </CheckBoxSpace>
                    <CheckBoxSpace>
                        <CheckBox
                            check = {receivetime === 2 && true}
                            onCheckEvent={()=>checkBoxEvent(2)}
                        />
                        <Body>외출시</Body>
                    </CheckBoxSpace>
                    <CheckBoxSpace>
                        <CheckBox
                            check = {receivetime === 3 && true}
                            onCheckEvent={()=>checkBoxEvent(3)}
                        />
                        <Body>귀가시</Body>
                    </CheckBoxSpace>
                </CheckItemListWrapper>
            </ListWrapper>

            <ListWrapper>
                <CheckTitleSpace>
                    <Title>메시지 내용</Title>
                </CheckTitleSpace>
                
                <BtnFileUpload>
                    <FileInput
                        name="myImage"
                        placeholder=''
                        className="inputFileClass"
                        onChange={handleChangeFile}
                    />
                </BtnFileUpload>
            </ListWrapper>
            {
                fileType.split('/')[0] === 'image' &&
                <ImageFile
                    src = {'http://'+proxyServer.getProxyServer()+':17501'+filePath}
                />
            }
            {
                fileType.split('/')[0] === 'video' &&
                <VideoFile
                    src = {fileData}
                    controls 
                />
            }
            <StyledTextarea 
                type="file"
                onChange={handleChangeInput}
                value={msg}
                minRows={12} 
                maxRows={14} 
                placeholder={`메시지를 입력해주세요.`}
                onPaste={e=>e.preventDefault()}
            />


        </Wrapper>
    );
};

FmsgList.propTypes = {
    listArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            alias: PropTypes.arry,
            userkey: PropTypes.number,
            icon:PropTypes.number,
            img: PropTypes.string,
            date: PropTypes.string,
            check: PropTypes.bool
        })
    ),
    write:ImmutablePropTypes.mapContains({
        msg: PropTypes.string,
        receivetime:PropTypes.number,
        receiverkey: PropTypes.arry,
        fileid:PropTypes.string,
    }),
    msgFileupload:ImmutablePropTypes.mapContains({
        success:PropTypes.bool,
        fileid:PropTypes.string,
        filePath:PropTypes.string
    }),
    checkBoxEvent:PropTypes.func,
    receiverkeyEvnet:PropTypes.func,
    controlType: PropTypes.string
}

export default FmsgList;