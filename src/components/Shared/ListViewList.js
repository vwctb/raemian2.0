

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CheckBox from './CheckBox';

const Wrapper = styled.div`
    width: 100%;
`;

const ItemListWrapper = styled.div`
    width:100%;
    height:100%;
    display: block;
    font-size: 0px; 
`;

const ItemSpace = styled.div`
    width: 100%;
    height: 3rem;
    background:#3e454b;
    border-bottom: 1px solid #2d3237;
    padding:0 1rem 0 1rem;
    & + & {
        border-top: 1px solid #555f68;
    }
`;

const Body = styled.div`
    height:3rem;
    line-height:3rem;
    color:white;
    text-align:left;
    font-size: 0.9rem;
    opacity: 0.6;
    margin-left:0.5rem;
    float: left;

`;

const IconNext = styled.div`
    margin-left:1rem;
    font-size: 0px;
`;


const BtnWapper = styled.div`
    width:100%;
    float:right;
`;

const CheckBoxSpace = styled.div`
    padding: 0.8rem 0rem 0.8rem 0rem;
    float:left;
  
`;

const BtnSubSingle = styled.div`
    width: 5rem;
    height: 1.8rem;
    padding: 0 0.6rem 0 0.6rem;
    line-height: 1.8rem;
    font-size: 0.9rem;
    background:#ff8062;
    color:#ffffff;
    float:right;
    text-align:center;
    margin: 0.6rem;
    &:active {
        filter: brightness(80%);
    }
`;




const CheckBoxList = ({checkBoxListArray,onCheck,termsClick,policyClick}) => {

    const CheckBoxItemList = checkBoxListArray.map(
        controlitem => (
            <ItemSpace
                key={controlitem.get('index')}
            >
                <CheckBoxSpace>
                <CheckBox
                    checkBoxListArray={checkBoxListArray}
                    check = {controlitem.get('check')}
                    onCheckEvent={()=>
                        {
                            onCheck({
                                check:(!controlitem.get('check')),
                                index:controlitem.get('index')
                            })
                        }
                    }
                />
                 </CheckBoxSpace>
                <Body>{controlitem.get('name')}</Body>
                { 
                    (controlitem.get('btnKey') !== undefined) && 
                    <BtnSubSingle 
                        onClick={
                           controlitem.get('btnKey') === 'terms' ? termsClick : policyClick 
                        }
                    >
                        {controlitem.get('btnName')}
                    </BtnSubSingle>
                }
                
            </ItemSpace>
           
        )
    );
    return (
        <Wrapper>
            <ItemListWrapper>
                {CheckBoxItemList}
            </ItemListWrapper>
        </Wrapper>
    );
};

 CheckBoxList.propTypes = {
    checkBoxListArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            name: PropTypes.string,
            index: PropTypes.number,
            check: PropTypes.bool,
            btnKey:PropTypes.string,
            btnName: PropTypes.string,
        })
    ),
    onCheck: PropTypes.func,
    termsClick:PropTypes.func,
    policyClick:PropTypes.func
}

export default CheckBoxList;