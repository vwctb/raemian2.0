import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import FTalkItem from './FTalkItem'

const Wrapper = styled.div`
     position:absolute;
     width:100%;
     top:3.5rem;
     bottom: 4rem;
     background:#ded9d1;
     overflow-y:auto;
     padding-bottom: 2rem;
`;

const ItemListWrapper = styled.div`
    width:100%;
    padding: 0.5rem;
    display: flex;
    align-content: flex-start;
    justify-content: space-around;
    flex-flow: row wrap;
`;

let key=0;
const FTalkList = ({listArray,userArray,itemClick,typeClick,handleFocus,focus}) => {    
    let list=''; 
    if(listArray.size > 0){
        list = listArray.map(
            item => (
                <FTalkItem
                    key={key++}
                    msg={item.get('msg')}
                    icon={ 
                        item.get('userIcon') === undefined ? 
                        userArray.getIn([userArray.findIndex(list => list.get('userkey') === item.get('userkey')),'icon']) :
                        item.get('userIcon')
                    }
                    img={
                        item.get('userIcon') === undefined ? 
                        userArray.getIn([userArray.findIndex(list => list.get('userkey') === item.get('userkey')),'img']) :
                        item.get('userImg')
                    }
                    date={item.get('date')}
                    alias={item.get('alias')}
                    own={item.get('own')}
                    fileFlag={item.get('fileFlag')}
                    fileType={item.get('fileType')}
                    filePath={item.get('filePath')}
                    thumbPath={item.get('thumbPath')}
                    itemClick= {itemClick}
               />
            )
        );
    } 
    

    return (
        <Wrapper
            innerRef={ref=>window.myRef=ref}
           
        >
            <ItemListWrapper
            onClick={()=>handleFocus(false)}
            >
                {list}
            </ItemListWrapper>
        </Wrapper>
    );
};

FTalkList.propTypes = {
    listArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            msg: PropTypes.string,
            icon: PropTypes.number,
            img: PropTypes.string,
            date:PropTypes.string,
            alias: PropTypes.string,
            own: PropTypes.bool,
            fileFlag: PropTypes.bool,
            fileType: PropTypes.string,
            filePath: PropTypes.string,
            thumbPath: PropTypes.string
        })
    ),
    
    /*,
    userArray: ImmutablePropTypes.listOf(
        ImmutablePropTypes.mapContains({
            userkey: PropTypes.number,
            icon:PropTypes.number,
            img: PropTypes.string
        })
    ),*/
    itemClick: PropTypes.func,
    controlType: PropTypes.string
}

export default FTalkList;