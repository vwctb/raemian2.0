import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as SvgIcon from 'lib/icon_svg'

const Wrapper = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    border-top:1px solid #e4e0d7;
    border-bottom:1px solid #e4e0d7;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffffff;
`;

const ItemListWrapper = styled.div`
    height: auto;
    padding: 1rem;
`;

const ItemSpace = styled.div`
    width: 2.8rem;
    height: 2.5rem;
    float: left;
    text-align: center;
    color:${props => (props.check) ? '#ffffff' : '#524c45'};
    font-size:0.9rem;
    background:${props => (props.check) ? '#50bbcd' : 'linear-gradient( to bottom,white,#e8e9e9)'};
    border:${props => (!props.check) && '1px solid #d5d5d6'};
    box-shadow: ${props => (props.check) && 'inset 1px 2px 3px #3e8793'};
    & + &{
        border-left:0px; 
    }
    :first-child{
        border-top-left-radius:0.3rem;
        border-bottom-left-radius:0.3rem;
    }
    :last-child{
        border-top-right-radius:0.3rem;
        border-bottom-right-radius:0.3rem;
    }
    opacity: ${props=>props.use === false && '0.5'};
`;

ItemSpace.propTypes = {
    check : PropTypes.bool,
    use : PropTypes.bool
}

const CheckBox = styled.div`
    width:100%;
    height:2.5rem;
    line-height:2.5rem;
    float:right;
`;

const CheckBoxSpace = styled.div`
    width: 100%;
    height: 100%;
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

const CheckIcon = styled.div`
    position: absolute;
    margin-left: 0.3rem;
    margin-top: 0.2rem;
    & > svg {
        display:${props => (props.check) ? 'visible' : 'none'};
        fill:#ffffff;
    }  

`;

CheckIcon.propTypes = {
    check : PropTypes.bool
}

const ControlCheckBoxList = ({checkBoxListArray,onCheck,use}) => {

    const CheckBoxItemList = checkBoxListArray.map(
        controlitem => (
            <ItemSpace
                key={ controlitem.get('num')}
                use={use}
                check = {controlitem.get('check')} 
                onClick={
                    ()=>{
                        onCheck({
                            check:(!controlitem.get('check')),
                            num: controlitem.get('num')
                        })
                    }
                }
            >   
            <CheckIcon check = {controlitem.get('check')} dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('checkSmall')}} /> 
                <CheckBoxSpace>
                    <CheckBox>
                        {controlitem.get('name')}
                    </CheckBox>
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
            num: PropTypes.number,
            name: PropTypes.string,
            check: PropTypes.bool
        })
    ),
    onCheck: PropTypes.func
}

export default ControlCheckBoxList;