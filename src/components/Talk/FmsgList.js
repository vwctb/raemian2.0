
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FmsgItem from './FmsgItem'
import moment from 'moment';
import convertDateTime from 'lib/convertDateTime'
import { Map, List, fromJS } from 'immutable';

const Wrapper = styled.div`
     position:absolute;
     width:100%;
     top:3.5rem;
     bottom: 0;
     background:#f7f6ef;
     overflow-y:auto;
`;

const ItemListWrapper = styled.div`
    width:100%;
    display: flex;
    align-content: flex-start;
    justify-content: space-around;
    flex-flow: row wrap;
`;
let key=0;
const FmsgList = ({listArray,userArray,familysArray,pageType,selectedType,itemClick,typeClick}) => {    
    let list=''; 
    if(listArray.size > 0){
        list = listArray.map(
            item => (
                <FmsgItem
                    key={key++}
                    seq={item.get('seq')}
                    alias={item.get('alias')}
                    icon={
                           item.get('fromto') === 'from'  ?  familysArray.getIn([familysArray.findIndex(user => user.get('userkey') === item.get('userkey')),'icon']) :
                           userArray.getIn([userArray.findIndex(user => user.get('userkey') === item.get('userkey')),'icon'])
                    }
                    img={item.get('fromto') === 'to' && userArray.getIn([userArray.findIndex(user => user.get('userkey') === item.get('userkey')),'img'])}
                    fromto={item.get('fromto')}
                    news={item.get('new')}
                    msg={item.get('msg')}
                    date = {moment(item.get('date')).format('YYYY년 M월 D일')}
                    itemClick= {itemClick}
               />
            )
        );
    } 
    

    return (
        <Wrapper>
            <ItemListWrapper>
                {list}
            </ItemListWrapper>
        </Wrapper>
    );
};

FmsgList.propTypes = {
    listArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            alias: PropTypes.object,
            userkey: PropTypes.number,
            icon:PropTypes.number,
            img: PropTypes.string,
            date: PropTypes.string,
            new: PropTypes.bool
        })
    ),
    userArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            userkey: PropTypes.number,
            icon:PropTypes.number,
            img: PropTypes.string
        })
    ),
    itemClick: PropTypes.func,
    controlType: PropTypes.string
}

export default FmsgList;