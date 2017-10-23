import React, { Component } from 'react';
import {BtnSingle,BtnSingleModal,Modal,Dimmed,InputWithLabelModal} from 'components/Shared';

import * as authActions from 'redux/modules/auth';
import * as uiActions from 'redux/modules/ui';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as Image from 'img';
import  {BG_Sub_Reamin,LogoCombi} from 'img';
import {isLength} from 'validator';
import * as KEY from 'lib/raemianAES';

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

const ColorArray =
{
    'red' : '#d8373c',
    'blue' : '#197fd3',
    'green' : '#19b554',
    'purple' : '#876cc9'
}

const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    background:#34393e;
    top: 0;
    z-index: 10;
    color:white;
    background-image: url(${BG_Sub_Reamin});
	background-position: center;
    background-size: cover;
    text-align:center;
`;

const MainPhotoWrapper = styled.div`
    width: 100%;
    text-align:center;
`;

const Logo = styled.div`
    position: relative;
    width: 100%;
    height:26%;
    background-image: url(${LogoCombi});
    background-position: center;
    background-repeat: no-repeat;
	background-size: 6rem 6rem;
`;

const Annotaion = styled.div`
    position: relative;
    width: 100%;
    height: 4rem;
    line-height: 2rem;
    font-size: 1.3rem;
    text-align:center;
    color:white;
`;

const Alias = styled.div`
    position: relative;
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    font-size: 1rem;
    text-align:center;
    color:white;
    float:left;
`;



const UserInfo = styled.div`
    position: relative;
    width: 100%;
    height: 4rem;
    line-height: 1.5rem;
    font-size: 1rem;
    margin-top: 2rem;
    text-align:center;
    color:white;
`;

const MainPhoto = styled.div`
    width: 100%;
    height: 6rem;
    background-image: url(${props => ImgArray[props.icon+'']});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 6rem 6rem;
    display:inline-block;

`;

MainPhoto.propTypes = {
    icon : PropTypes.number
}

const MainPhotoImage = styled.img`
    width: 6rem;
    height: 6rem;
    display:inline-block;
    border-radius:6rem;
`;


const ColorTag = styled.div`
    width: 7rem;
    height: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    border-radius: 2rem;
    font-size: 0.7rem;
    display: inline-block;
    background:${props => ColorArray[props.tagcolor]};
`;


class SignupContainers extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    handleClick = () => {
        const { history } = this.context.router;
        const { AuthActions } = this.props;
        const dummy = new Date().getTime();
        console.log(dummy);
        const data = KEY.encryptedKey(JSON.stringify({uuid:'uuidkey2',dummy:dummy}));
        AuthActions.postLogin({'data':data});
        history.push('/');
    }
    render() {
        const { pageType, checkBoxListArray} = this.props;
        const { dong, ho } = this.props.base.toJS();
        const { icon, alias, tagcolor, img } = this.props.profile.toJS();
        return (
            <Wrapper>
                <Logo/>
                
                <Annotaion>{'"가입이 완료되었습니다!"'}</Annotaion>
                <UserInfo>
                {'서초 에스티지S'}<br/> 
                {dong+'동 '+ ho+'호'}
                </UserInfo>
                <MainPhotoWrapper>
                {
                    icon <= 0 ?
                    <MainPhotoImage src = {img}/>
                    :
                    <MainPhoto icon = {icon}/>
                }
               </MainPhotoWrapper>
                <Alias>
                    {"'"+alias+"'"}
                </Alias>
                <ColorTag
                    tagcolor={tagcolor}
                >
                    {'원패스 태그 연동'}

                </ColorTag>



                <BtnSingle
                    onClickEvent={this.handleClick}
                    name={'래미안 스마트홈 시작'}
                />
               
            </Wrapper>
        )
    };
};

export default connect(
    (state) => ({
        base: state.auth.getIn(['register','base']),
        profile: state.auth.getIn(['register','base','profile'])
    }),
    (dispatch) => ({
       AuthActions: bindActionCreators(authActions, dispatch),
       UIActions:bindActionCreators(uiActions,dispatch)
    })
)(SignupContainers);

