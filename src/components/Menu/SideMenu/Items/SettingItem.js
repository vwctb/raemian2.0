
import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';


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
        controlitem: ImmutablePropTypes.mapContains({
            name: PropTypes.string,
            index: PropTypes.number
        }),
        changeSideMenuView: PropTypes.func
    }

    handleClick = () =>{
        const {name,index} = this.props.controlitem.toJS();
        const {changeSideMenuView} = this.props;

        changeSideMenuView({sideViewIndex:index,sideViewTitle:name});
    }

    render() {
        const { name } = this.props.controlitem.toJS();
       const { children } = this.props;
        return (
            <Wrapper
                onClick = {this.handleClick}
            >
              
                { children }
                 
            </Wrapper>
        )
    }
}

export default SettingItem;