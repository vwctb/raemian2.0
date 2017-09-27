import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as Image from 'img';
import * as SvgIcon from 'lib/icon_svg'
const ImgArray =
{
    1 : Image.Family_Face1,
    2 : Image.Family_Face2,
    3 : Image.Family_Face3,
    4 : Image.Family_Face4,
    5 : Image.Family_Face5,
    6 : Image.Family_Face6,
    9 : Image.Family_Face9,
}

const Wrapper = styled.div`
    padding:0.4rem;
`;

const CheckIcon = styled.div`
    position: absolute;
    margin-left: 2rem;
    margin-top: -0.5rem;
    & > svg{
        fill:#ffffff;
    }

`;

const FamilyImage = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    background-image: url(${props => ImgArray[props.icon]});
    background-position: center;
    background-repeat: no-repeat;
    background-size: 2.5rem 2.5rem;
    float: left;
`;


FamilyImage.propTypes = {
    icon : PropTypes.number
}

class FamliyItemSmall extends Component {
    static propTypes = {
        userkey: PropTypes.string,
        tagcolor : PropTypes.string,
        icon: PropTypes.number,
        onClickEvent: PropTypes.func
    }
    render() {
        const {icon,tagcolor,userIcon,onClickEvent} = this.props;
        return (
           // 
           <Wrapper
             onClick={onClickEvent}
           >
                {
                   userIcon === icon && <CheckIcon dangerouslySetInnerHTML ={{__html : SvgIcon.getInitialSvgIcon('checkSmall')}} />
                }
                <FamilyImage
                    icon = {icon}
                />
            </Wrapper>

        )
    }
}

export default FamliyItemSmall;