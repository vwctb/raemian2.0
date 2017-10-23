import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as SvgIcon from 'lib/icon_svg'
import * as Image from 'img';
import {FamliyItemSmall} from 'components/Shared';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'redux/modules/auth';
import FileInput from 'react-file-input';

const Wrapper = styled.div`
    position:relative;
    padding:2rem 0 1rem 0rem;
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    background:#3e454b;
    bottom:0;
`;

const InnerWrapper = styled.div`
    position:relative;
`;

const ImgArray =
{
    1 : Image.Family_Face1,
    2 : Image.Family_Face2,
    3 : Image.Family_Face3,
    4 : Image.Family_Face4,
    5 : Image.Family_Face5,
    6 : Image.Family_Face6,
    9 : Image.Family_Face9
}

const TagSpace = styled.div`
    & + & {
        margin-left:1rem;
    }
`;

const DefaultTag = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius:2rem;
    text-align:center;
    font-size: 0.7rem;
    line-height:1.9rem;
    color:#b5b6b8;
    border: 1px solid #787d81;
`;

const CheckIcon = styled.div`
    position: absolute;
    margin-left: 2rem;
    margin-top: -0.5rem;
    & > svg {
        fill:#ffffff;
    }
`;

const MainPhoto = styled.div`
    width: 6rem;
    height: 6rem;
    display:inline-block;
    background-image: url(${props => ImgArray[props.icon]});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 6rem 6rem;

`;

MainPhoto.propTypes = {
    icon : PropTypes.number,
    img : PropTypes.string
}

const MainPhotoImage= styled.img`
    width: 6rem;
    height: 6rem;
    display:inline-block;
    border-radius:6rem;
`;

const MainPhotoSpace = styled.div`
    position:relative;
    float:left;
    width:9rem;
    height:10rem;
    text-align: center;
`;

const Input = styled.input`
    outline: none;
    width: 6rem;
    border-radius: 0px;
    margin-top: 1rem;
    font-size: 0.9rem;
    background: none;
    color: white;
    border: none;
    -webkit-text-align: center;
    text-align: center;
`;

const InputIcon = styled.div`
    position:absolute;
    width:6rem;
    height:0.5rem;
    margin-top: -0.1rem;
    margin-left: 1.5rem;
    border-left:1px solid #787d81;
    border-bottom:1px solid #787d81;
    border-right:1px solid #787d81;
`;

const InputSpace = styled.div`

`;
const InputNotice =styled.div`
    width:100%;
    text-align:center;
    font-size: 0.6rem;
    margin-top: 1rem;
    color:#b5b6b8;
`;

const FamilyImageSpace = styled.div`
    position:relative;
    float:left;
    width:10rem;
    height:10rem;
    display:flex;
    flex-wrap:wrap;
    align-items: flex-start;
    justify-content: space-around;
`;

const BtnAddPhoto = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    font-size:0.7rem;
    text-align:center;
    line-height:2.5rem;
    border-radius:2.5rem;
    color:#b5b6b8;
    border:1px solid #787d81;
    margin-top: 0.4rem;
`;

const BtnAddPhotoSpace =styled.div`

`;

const BtnFileSpan = styled.div`
    width:2.5rem;
    height:2.5rem;
    position: absolute;
`;

const BtnFileUpload = styled.div`
    float:right;
    border:0;
    background:0;
    outline-width: 0;
    width:2.5rem;
    height:2.5rem;
    overflow: hidden;
`;

class ProfilePhotoAliasContainer extends Component {
     handleChange = (e) => {
        const { AuthActions } = this.props;
        const { value } = e.target;
        if(value.length > 6)return;
        AuthActions.changeProfileInput(value);
    }

    render() {
        const { onClickEventIcon, icon, alias, img, userkey, handleChangeFile } = this.props;
        const $CheckIcon = <CheckIcon dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('checkSmall')}} />;
        
        return (
            <Wrapper>
                <InnerWrapper>
                    <MainPhotoSpace>
                        {
                            icon === 0 ?  <MainPhotoImage src={img} /> : <MainPhoto icon = {icon}/>
                        }
                        <InputSpace>
                            <Input 
                                onChange = {this.handleChange}
                                value = {alias}
                            />
                            <InputIcon/>
                            <InputNotice>{'(애칭 : 6자 이내)'}</InputNotice>
                        </InputSpace>
                    </MainPhotoSpace>
                    <FamilyImageSpace>
                       <FamliyItemSmall icon = {1} onClickEvent={()=>onClickEventIcon(1)} userIcon={icon}/>
                       <FamliyItemSmall icon = {2} onClickEvent={()=>onClickEventIcon(2)} userIcon={icon}/>
                       <FamliyItemSmall icon = {3} onClickEvent={()=>onClickEventIcon(3)} userIcon={icon}/>
                       <FamliyItemSmall icon = {4} onClickEvent={()=>onClickEventIcon(4)} userIcon={icon}/>
                       <FamliyItemSmall icon = {5} onClickEvent={()=>onClickEventIcon(5)} userIcon={icon}/>
                       <FamliyItemSmall icon = {6} onClickEvent={()=>onClickEventIcon(6)} userIcon={icon}/>
                        <BtnAddPhotoSpace>
                          {icon === 0 && $CheckIcon}
                       <BtnAddPhoto>
                           <BtnFileSpan>
                               사진
                           </BtnFileSpan>
                           <BtnFileUpload>
                                <FileInput
                                    name="myImage"
                                    accept=".png,.jpg,.jpeg"
                                    placeholder=''
                                    className="inputFileClass"
                                    onChange={handleChangeFile}
                                />
                        </BtnFileUpload>
                        </BtnAddPhoto>
                       
                       </BtnAddPhotoSpace>
                    </FamilyImageSpace>    

                </InnerWrapper>
            </Wrapper>
        );
    }
}

export default connect(
    (state) => ({
    
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch)
    })
   
)(ProfilePhotoAliasContainer);