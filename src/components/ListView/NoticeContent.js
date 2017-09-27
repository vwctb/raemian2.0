import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
const Wrapper = styled.div`
    position:absolute;
    width:100%;
    top:3.5rem;
    bottom:0;
    overflow-y:auto;
    background:#f7f6ef;
`;

const Body = styled.div`
    height:4.5rem;
    width:100%;
    background:white;
    padding:1rem;
    border-bottom: 1px solid #e4e0d7;
    display: flex;
    flex-wrap:wrap;
    align-items:center;
`;

const Title = styled.div`
    color:#49433c;
    display: flex;
    font-size:1rem;
    align-items: center;
`;

const SubTitle = styled.div`
    width: 100%;
    color:#908d8a;
    display: flex;
    font-size:0.7rem;
    align-items: center;   
    display: flex;
    align-items:center;
`;


const Content = styled.div`
    width:100%;
    position:absolute;
    top:4.5rem;
    bottom:0;
    padding:1rem;
    margin-bottom: 3rem;
    float: left;
    -webkit-text-align: left;
    text-align: left;
    font-size: 1rem;
`;


class NoticeContent extends Component {

    static propTypes = {
        index: PropTypes.string,
        subject:PropTypes.string,
        content:PropTypes.string,
        date:PropTypes.string,
        pageType: PropTypes.string,
        itemClick: PropTypes.func
    }

    render() {
        const {pageType,date,index} = this.props;
        console.log('this.props.data_content',this.props.data_content);
        const {subject,writer,insertdate,content} = this.props.data_content;
        
        return (
            <Wrapper>
                <Body>
                    <Title>{subject}</Title>
                    <SubTitle>{insertdate && moment(insertdate.split(' ')[0]).format('YYYY년 M월 D일')  + ', '+ writer}</SubTitle>
                </Body>
                <Content>{content}</Content>
            </Wrapper>
        )
    }
}

export default NoticeContent; 
