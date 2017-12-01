import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FamilyItem } from'components/Shared'
import * as SvgIcon from 'lib/icon_svg'
import moment from 'moment';


// Timeago 라이브러리 관련 코드 불러오기
import TimeAgo from 'react-timeago'
import koreanStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import * as proxyServer from 'lib/proxyServer';
const proxy = proxyServer.getProxyServer();

const formatter = buildFormatter(koreanStrings); // 한글 형식으로 보여주기 위해 필요

const Wapper = styled.div`
    width:100%;
    padding: 0.3rem;
    display: flex;
    justify-content:${props => props.own ? 'flex-end' : 'flex-start'};
    text-decoration: none;
`;

Wapper.propTypes={
    own:PropTypes.bool
}

const MessageBox = styled.div`
    padding:0.4rem;
    border-radius:2rem;
    background:${props => props.own ? '#f7f6ef' : 'white'};
    margin-right:${props => !props.own && '0.7rem'};
    margin-left:${props => props.own && '0.7rem'};
    display: flex;
    max-width: 70%;
    word-wrap: break-word;
    flex-wrap:nowrap;
    align-items:'flex-start' ;
    color:${props => props.own ? '#4e3713' : '#343232'};
`;

MessageBox.propTypes={
    fileFlag:PropTypes.bool,
    own:PropTypes.bool
}

const Message= styled.span`
    display:  inline-block;
    padding: 0 1rem 0 1rem;
    font-size:1rem;
    align-items: center;
    overflow:hidden;
    text-overflow:ellipsis;
    margin: auto;
`;

const DateWapper = styled.div`
    width: 4rem;
    height:2rem;
    margin-top:1rem;
    color:#908d8a;
    display: flex;
    font-size:0.7rem;
    flex-wrap:wrap;
    align-items:center;
    justify-content:${props => props.own ? 'flex-end' : 'flex-start'};
`;

DateWapper.propTypes={
    own:PropTypes.bool
}

const DateTime = styled.div`
    color:#908d8a;
    font-size:0.7rem;
`;

const ImageFile = styled.img`
    width: 80%;
    height: 100%;
    padding:0.4rem 1.2rem 0.4rem 0.7rem;
`;
const VideoFile = styled.video`
    width: 80%;
    height: 100%;
    padding:0.4rem 1.2rem 0.4rem 0.7rem;
`;
class FTalkItem extends Component {
    static propTypes = {
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
    }

    render() {
        const {msg,icon,img,date,alias,own,fileFlag,fileType,filePath,thumbPath,itemClick,handleLoaded} = this.props;
        return (
            <Wapper own={own}>
                {
                    own &&
                    <DateWapper
                         own={own}
                    >
                        <TimeAgo date={date} formatter={formatter}/>
                        <DateTime>{moment(date).format('A hh:mm').replace('AM','오전').replace('PM','오후')}</DateTime>
                    </DateWapper>
                }

                <MessageBox fileFlag={fileFlag} own={own}>

                    {
                        !own && <FamilyItem icon={icon} imgData={img} size={3}/>
                    }
                   

                    {
                       fileType === "1" && <ImageFile src = {'http://'+proxy+':17501'+thumbPath} onLoad={handleLoaded.bind(this)}/>
                    }
                    {
                       fileType === "2"  && <VideoFile onLoad={handleLoaded.bind(this)} src = {'http://'+proxy+':17501'+filePath} controls/>
                    }

                    {
                        !fileFlag &&  <Message>{msg}</Message>
                    }
                    {
                        own && <FamilyItem icon={icon} imgData={img} size={3}/>
                    }
                </MessageBox>

                {
                    !own &&
                    <DateWapper
                        own={own}
                    >
                        <TimeAgo date={date} formatter={formatter}/>
                        <DateTime>{moment(date).format('A hh:mm').replace('AM','오전').replace('PM','오후')}</DateTime>
                    </DateWapper>

                }
                
            
            </Wapper>
        )
    }
} 

export default FTalkItem; 






