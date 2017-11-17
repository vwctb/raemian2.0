import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {Icon_Check, Family_Face1,Family_Face2,Family_Face3,Family_Face4,Family_Face5} from 'img';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as Image from 'img';
import * as SvgIcon from 'lib/icon_svg'
import {Icon_New} from 'img';

const ImgArray =
{
    1: Image.Family_Face1,
    2: Image.Family_Face2,
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
    display:inline-block;
`;

const CheckIcon = styled.div`
   position: absolute;
   margin-left:2.7rem;
   & > svg {
       fill:#19b554 !important;
   }
`;

const FamilyImage = styled.div`
    width: ${props => props.size+'rem'};
    height: ${props => props.size+'rem'};
    border-radius: ${props => props.size+'rem'};
    background-image: url(${props => props.icon > 0 ? ImgArray[props.icon] : props.imgData});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display:flex;
    justify-content:flex-end;
    align-items:flex-end;
    box-shadow: inset 0px 0px 10px rgba(0,0,0,0.4);
    filter:${props => props.check === false && 'grayscale(100%)'};
`;

const TagColor = styled.div`
    width:${props => props.size+'rem'};
    height: ${props => props.size+'rem'};
    border-radius: ${props => props.size+'rem'};
    background:${props => ColorArray[props.tagcolor]};
`;

TagColor.propTypes = {
    tagcolor : PropTypes.string,
    size : PropTypes.number
}
FamilyImage.propTypes = {
    icon : PropTypes.number,
    size : PropTypes.number,
    check: PropTypes.bool,
    imgData : PropTypes.string
}

const Icon = styled.div` 
    width:0.9rem;
    height:0.9rem;
    background-image: url(${Icon_New});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    margin-left:0.3rem;
    margin-bottom:2.1rem;
`;

class FamilyItem extends Component {
    
    render() {
        const {icon,imgData,tagcolor,check,onCheckEvent,size,news} = this.props;
        return (
           <Wrapper
             onClick={onCheckEvent}
           >
                {
                    check && <CheckIcon dangerouslySetInnerHTML ={{__html : SvgIcon.getInitialSvgIcon('checkSmall')}} />
                }
                {
                   <FamilyImage
                        icon = {icon === null ? 9 : icon}
                        imgData = {imgData}
                        size = {size}
                        check = {check}
                    >
                    {
                        news && <Icon/>
                    }
                    {tagcolor && <TagColor tagcolor = {tagcolor} size = {size/4}/>}
                    </FamilyImage>
                }
            </Wrapper>

        )
    }
}

export default FamilyItem;