import React, {Component} from 'react';
import styled from 'styled-components';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content:space-between;
    align-items:center;
    border-bottom: 1px solid #2d3237;
    padding:0 1.5rem 0 1.5rem;
    & + & {
        border-top: 1px solid #555f68;
    }
    &:active {
        background: #2d3237;
    }

`;



class SettingItem extends Component {
    static propTypes = {
        checkBoxListArray:ImmutablePropTypes.mapContains({
            name: PropTypes.string,
            index: PropTypes.string, 
            check: PropTypes.bool
        }),
        onCheck: PropTypes.func
    }

    handleClick = () => {
        console.log('click');
        const {onCheck} = this.props;
        const {index} = this.props.checkBoxListArray.toJS();
        onCheck(index);
    }

    render() {
        const { children } = this.props;
        const { handleClick } = this;
        return (
            <Wrapper
                onClick={handleClick}
            >
                {children}
            </Wrapper>
        )
    }
}

export default SettingItem;