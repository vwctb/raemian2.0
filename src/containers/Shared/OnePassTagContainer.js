import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as SvgIcon from 'lib/icon_svg';

const Wrapper = styled.div`
    position:relative;
    padding:3rem 0 1rem 0rem;
    display:flex;
    justify-content:center;
    align-items:center;
    width:100%;
    height:4rem;
    background:#3e454b;
    bottom:0;
`;
const TagSpace = styled.div`
    & + & {
        margin-left:1rem;
    }
`;

const ColorTag = styled.div`
    width: 2rem;
    height: 2rem;
    border-radius:2rem;
    font-size: 0.9rem;
    background:${props => ColorArray[props.tagcolor]};
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
    margin-left: 1.7rem;
    margin-top: -0.5rem;
    & > svg{
        fill:#ffffff;
    }
    
`;

const ColorArray =
{
    'red' : '#d8373c',
    'blue' : '#197fd3',
    'green' : '#19b554',
    'purple' : '#876cc9'
}

ColorTag.propTypes = {
    tagcolor : PropTypes.string
}

class OnePassTagContainer extends Component {
    render() {
        const { onClickEvent,tagcolor } = this.props;
        const $CheckIcon = <CheckIcon dangerouslySetInnerHTML = {{__html : SvgIcon.getInitialSvgIcon('checkSmall')}} />;
        return (
            <Wrapper>
                <TagSpace>
                    {tagcolor === 'red' && $CheckIcon}
                    <ColorTag
                        onClick={()=>onClickEvent('red')}
                        tagcolor={'red'}
                    />
                </TagSpace>
                <TagSpace>
                    {tagcolor === 'blue' && $CheckIcon}
                    <ColorTag
                        onClick={()=>onClickEvent('blue')}
                        tagcolor={'blue'}
                    />
                </TagSpace>
                <TagSpace>
                    {tagcolor === 'green' && $CheckIcon}
                    <ColorTag
                        onClick={()=>onClickEvent('green')}
                        tagcolor={'green'}
                    />
                </TagSpace>
                <TagSpace>
                    {tagcolor === 'purple' && $CheckIcon}
                    <ColorTag
                        onClick={()=>onClickEvent('purple')}
                        tagcolor={'purple'}
                    />
                </TagSpace>
                <TagSpace>
                    {tagcolor === null && $CheckIcon}
                    <DefaultTag
                        onClick={()=>onClickEvent(null)}
                    >
                       안함
                    </DefaultTag>
                </TagSpace>
            </Wrapper>
        );
    }
}

export default OnePassTagContainer;