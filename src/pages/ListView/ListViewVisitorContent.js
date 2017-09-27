import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uiActions from 'redux/modules/ui';
import * as listviewActions from 'redux/modules/listview';
import VisitorContent from 'components/ListView/VisitorContent';
import { bindActionCreators } from 'redux';

class ListViewVisitorContent extends Component {
    async componentDidMount() {
        const {ListViewActions, UIActions, match } = this.props;
        UIActions.setPageType({pageType:'/listview/visitors'});
        UIActions.setHeaderTitle({title:' 방문자'});
        ListViewActions.setContent('');
        
        const { usertoken } = this.props.loginUserInfo;
        try {
            UIActions.setSpinnerVisible(true);
            await ListViewActions.getVisitorContent(match.params.index,usertoken);
        } catch(e) {
            console.log(e);
        }
        UIActions.setSpinnerVisible(false);
    }


    render() {
        const {match,data_content} = this.props;

        return (
              <VisitorContent data={data_content} index={match.params.index}/>
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
        ListViewActions : bindActionCreators(listviewActions, dispatch)
    })
)(ListViewVisitorContent);

