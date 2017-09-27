import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uiActions from 'redux/modules/ui';
import * as listviewAction from 'redux/modules/listview';
import NoticeContent from 'components/ListView/NoticeContent';
import { bindActionCreators } from 'redux';

class ListViewNoticeContent extends Component {
    async componentDidMount() {
        const { UIActions, match, ListViewActions } = this.props;
        UIActions.setPageType({pageType:'/listview/notices'});
        UIActions.setHeaderTitle({title:' 공지사항'});
        ListViewActions.setContent('');
        const { usertoken } = this.props.loginUserInfo;
        try {
            UIActions.setSpinnerVisible(true);
            await ListViewActions.getNoticeContent(match.params.index,usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }

    render() {
        const {match,data_content} = this.props;
        return (
              <NoticeContent data_content={data_content} index={match.params.index}/>
              
        )
    };
};

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo'),
        data_content: state.listview.get('data_content')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ListViewActions: bindActionCreators(listviewAction, dispatch)
    })
)(ListViewNoticeContent);

