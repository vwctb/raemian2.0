import React, {Component} from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

// 정사각형을 만들어줍니다. (padding-top 은 값을 % 로 설정하였을 때 부모 엘리먼트의 width 의 비율로 적용됩니다.)
const List = styled.div`
    width:100%;
    height:3rem;
    border-bottom:1px solid #d7d1c4;
    position: relative;
    background: white;
    cursor: pointer;
`;

// 실제 내용이 들어가는 부분입니다.
const Contents = styled.div`
    align-items:center;
    display:flex;
    height:3rem;
    padding-left:1rem;
    width:100%;
    /* 텍스트가 길어지면 새 줄 생성; 박스 밖의 것은 숨김 */
`;

const Date = styled.div`
    font-size: 0.8rem;
    font-weight: 500;
    width: 3rem;
    text-align: center;
    padding:0.2rem 0 0.2rem 0;
    color:white;
    margin-right:0.5rem;
    border-radius: 1rem;
    background: #50bbcd;
`;

const Body = styled.div`
    font-size: 0.8rem;
`;

class FamilyScheduleItem extends Component {
    static propTypes = {
        fschedules: ImmutablePropTypes.mapContains({
            date: PropTypes.string,
            body: PropTypes.string,
            index: PropTypes.number
        }),
        onOpen: PropTypes.func
    }

    handleClick = () => {
        const { fschedules, onOpen } = this.props;
        //onOpen(memo);
    }

    render() {
        
        const { date, body } = this.props.fschedules.toJS();


        const { handleClick } = this;
        return (
            <List>
                <Contents>
                    { date && <Date>D-8</Date>}
                    <Body>{body}</Body>
                </Contents>
            </List>
        )
    }
}

export default FamilyScheduleItem;