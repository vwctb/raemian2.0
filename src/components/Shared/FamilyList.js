import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FamilyItem from './FamilyItem';
import * as SvgIcon from 'lib/icon_svg'

const Wrapper = styled.div`
    top: 6.5rem;
    height:${(window.innerHeight - 168)+'px'};
    padding: 1.5rem;
    background:#3e454b;
    position: fixed;
    text-align: center;
    overflow:auto;
    display: flex;
    flex-wrap:wrap;
    align-items: flex-start;
    justify-content: space-around;
`;

Wrapper.PropTypes ={
    deleteFamilyClick : PropTypes.func
}

const ItemSpace = styled.div`
    width: 6rem;
    margin-bottom:2rem;
    text-align: center;
`;

const Body = styled.div`
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    color:white;
    text-align:center;
    font-size: 0.9rem;
    margin-top:0.5rem;
    float: left;
`;

const Date = styled.div`
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    color:#50bbcd;
    text-align:center;
    font-size: 0.6rem;
    float: left;
`;
const BtnAddFamily =styled.div`
    width: 5rem;
    height: 5rem;
    border-radius:5rem;
    margin-left:0.5rem;
    border:1px solid #9fa2a5;
    display: flex;
    flex-wrap:wrap;
    align-items: center;
    justify-content:center;
    float: left;
`;
const DeleteBtn = styled.div`
    width: 3.5rem;
    height: 1.8rem;
    padding: 0 0.6rem 0 0.6rem;
    line-height: 1.8rem;
    font-size: 0.9rem;
    background: #ff8062;
    color: #ffffff;
    float: left;
    text-align: center;
    margin: 0.6rem 1rem 0.6rem 1.2rem;
    &:active {
        filter: brightness(80%);
    }
`;

const FamilyList = ({familyListArray,onCheck,profile,familyClick,reAuthClick,addFamilyClick,deleteFamilyClick}) => {
    let FamilyItemList = familyListArray.map(
        familyList => (
            
            deleteFamilyClick !== undefined ? 
            <ItemSpace
                key={Number(familyList.get('userkey'))}
            >
                <FamilyItem
                    familyListArray={familyListArray}
                    profile = {profile}
                    imgData = {familyList.get('img')}
                    icon = {familyList.get('icon')}
                    tagcolor = {familyList.get('tagcolor')}
                    size={5}
                />
         
                <Body>{familyList.get('alias')}</Body>
                <Date>{familyList.get('joindate') + '가입'}</Date>
                <DeleteBtn onClick={()=>deleteFamilyClick(familyList.get('userkey'),familyList.get('alias'))}>{'삭 제'}</DeleteBtn>
            </ItemSpace> 

            :

            <ItemSpace
                key={Number(familyList.get('userkey'))}
                onClick={()=>reAuthClick(familyList.get('userkey'),familyList.get('alias'))}
            >
                <FamilyItem
                    familyListArray={familyListArray}
                    profile = {profile}
                    imgData = {familyList.get('img')}
                    icon = {familyList.get('icon')}
                    tagcolor = {familyList.get('tagcolor')}
                    size={5}
                />
         
                <Body>{familyList.get('alias')}</Body>
                <Date>{familyList.get('joindate') + ' 가입'}</Date>
            </ItemSpace> 
        )
    );

    if(!deleteFamilyClick){
        if(familyListArray.size < 6){
        const newArray =  new Array(6-familyListArray.size).fill(0).map((value, index) => 
                <ItemSpace
                    key={index}
                    onClick={addFamilyClick}
                >
                <BtnAddFamily dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('addPlus')}} />
                <Body>{'가족 추가'}</Body>
                </ItemSpace>
        )
        FamilyItemList = FamilyItemList.push(newArray);   
        }
    }else{
        if(familyListArray.size < 6){
        const newArray =  new Array(6-familyListArray.size).fill(0).map((value, index) => 
                <ItemSpace
                    key={index}
                >
                </ItemSpace>
        )
        FamilyItemList = FamilyItemList.push(newArray);   
        }
    }

    return (
        <Wrapper
         deleteFamilyClick={deleteFamilyClick}
        >
            {FamilyItemList}
        </Wrapper>
    );
};

FamilyList.propTypes = {
    familyListArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            userkey: PropTypes.number,
            icon:PropTypes.number,
            img:PropTypes.string,
            alias:PropTypes.string,
            tagcolor:PropTypes.string,
            joindate:PropTypes.string,
        })
    ),
    profile:ImmutablePropTypes.mapContains({
            userkey: PropTypes.number,
            icon:PropTypes.number,
            img:PropTypes.string,
            alias:PropTypes.string,
            tagcolor:PropTypes.string,
            joindate:PropTypes.string,
        }),
    familyClick:PropTypes.func,
    addFamilyClick:PropTypes.func,
    deleteFamilyClick:PropTypes.func
}

export default FamilyList;