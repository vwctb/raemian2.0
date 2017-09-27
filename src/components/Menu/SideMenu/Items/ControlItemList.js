

import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import ControlItem from './ControlItem';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const ItemListWrapper = styled.div`
    width:100%;
    height:100%;
    display: block;
    display: flex;
    align-content: space-around;
    flex-flow: row wrap;
    padding: 1rem 0 1rem 1.5rem;
    font-size: 0px; 
`;

let cnt = 0;

const ControlHomeItemList = ({controlHomeItemListArray,slideBack,pageType}) => {
    const controlHomeItemList = controlHomeItemListArray.map(
        controlitem => (
            <ControlItem
                key={cnt++}
                controlitem={controlitem}
                slideBack={slideBack}
                pageType={pageType}
            />
        )
    );
    return (
        <Wrapper>
            <ItemListWrapper>
                {controlHomeItemList}
            </ItemListWrapper>
        </Wrapper>
    );
};

 ControlHomeItemList.propTypes = {
    controlHomeItemListArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            name: PropTypes.string,
            icon: PropTypes.string,
            index: PropTypes.number
        })
    ),
    pageType: PropTypes.string,
    slideBack: PropTypes.func
}

export default ControlHomeItemList;