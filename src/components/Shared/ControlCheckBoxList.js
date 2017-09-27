

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CheckBox from './CheckBox';

const Wrapper = styled.div`
    width: 100%;
    border-top:1px solid #e4e0d7;
    border-bottom:1px solid #e4e0d7;
`;

const ItemListWrapper = styled.div`
    width: 100%;
    height: auto;
    padding: 1rem;
    font-size: 0px; 
    display: flex;
    flex-wrap: wrap;
    background: #ffffff;
    justify-content:space-between;
    align-items: flex-start;
`;

const ItemSpace = styled.div`
    width: 4rem;
    height: 4rem;
    text-align: center;
    opacity: ${props=>props.use === false && '0.5'};
`;

ItemSpace.propTypes = {
    use:PropTypes.bool
}

const Body = styled.div`
    width:100%;
    color:#49433c;
    text-align:center;
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
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
    width: 100%;
    height: 100%;
    padding: 0.8rem 0rem 0.8rem 0rem;
    float:left;
    vertical-align: middle;
    display:flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items:center;

    & + & {
       padding:0rem 0rem 0.8rem 0rem; 
    }
  
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

const ControlCheckBoxList = ({checkBoxListArray,onCheck,from1,from2,use}) => {

   
    const CheckBoxItemList = checkBoxListArray.map(
        controlitem => (
            <ItemSpace
                key={ controlitem.get('id') === undefined ? controlitem.get('index') : controlitem.get('id') }
                use={use}
            >   
                <CheckBoxSpace>
                    <Body>{controlitem.get('name')}</Body>
                    <CheckBox
                        checkBoxListArray={checkBoxListArray}
                        check = {controlitem.get('check')}
                        onCheckEvent={()=>
                            {
                                onCheck({
                                    from1:from1,
                                    from2:from2,
                                    check:(!controlitem.get('check')),
                                    index: controlitem.get('id') === undefined ? controlitem.get('index') : controlitem.get('id') 
                                })
                            }
                        }
                    />
                </CheckBoxSpace>
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

 ControlCheckBoxList.propTypes = {
    checkBoxListArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            id: PropTypes.number,
            name: PropTypes.string,
            check: PropTypes.bool
        })
    ),
    onCheck: PropTypes.func
}

export default ControlCheckBoxList;