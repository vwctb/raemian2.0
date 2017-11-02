import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FamilyItem } from'components/Shared'
import * as Image from 'img';
import * as SvgIcon from 'lib/icon_svg'
import moment from 'moment';
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

const Wapper = styled.div`
    width:100%;
    height:4.5rem;
    display: flex;
    background: white;
    align-items: center;
    padding: 0 1rem 0 1rem;
    justify-content: space-between;
    border-bottom: 1px solid #e4e0d7;
    text-decoration: none;
    &:active {
        filter: brightness(80%);
    }
`;

const Body = styled.div`
    width:55%;
    height:2.8rem;
    display: flex;
    flex-wrap:nowrap;
    align-items:center;
`;

const Title = styled.div`
    color:#49433c;
    display: flex;
    font-size:0.9rem;
    margin-left:0.8rem;
    align-items: center;
`;

const LocationON = styled.div`
    color:#50bbcd;
    font-size:0.9rem;
`;

const CarItem = styled.div`
    margin-left:0.6rem;
    width: ${props => props.size+'rem'};
    height: ${props => props.size+'rem'};
    fill:${props => ColorArray[props.tagcolor]};
`;

class PlocsItem extends Component {

    static propTypes = {
        location: PropTypes.string,
        insertdate: PropTypes.string,
        tagcolor: PropTypes.string
    }

    render() {
        const {location,date,tagcolor} = this.props;
        return (
            <Wapper>
                <Body>
                    <CarItem tagcolor={tagcolor} dangerouslySetInnerHTML={{__html: SvgIcon.getInitialSvgIcon('iconCar')}}/>
                    <Title>{location}</Title>
                </Body>
                <LocationON>
                    {
                        date &&
                        moment(date).format('YYYY.M.D A HH:mm').replace('AM','오전').replace('PM','오후')
                    }
                </LocationON> 
             
            </Wapper>
        )
    }
} 

export default PlocsItem; 
