import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as uiActions from 'redux/modules/ui';
import * as listviewAction from 'redux/modules/listview';
import CCTVContent from 'components/ListView/CCTVContent';
import { bindActionCreators } from 'redux';

class ListViewCCTVContent extends Component {
    async componentDidMount() {
        const { UIActions,ListViewActions, match } = this.props;
        UIActions.setPageType({pageType:'/listview/cctvs'});
        UIActions.setHeaderTitle({title:' CCTV'});
        ListViewActions.setContent('');
        const { usertoken } = this.props.loginUserInfo;
        try {
            UIActions.setSpinnerVisible(true);
            await ListViewActions.getCCTVContent(match.params.index,usertoken);
        } catch(e) {
            console.log(e);
        }
        console.log(match.params)
        UIActions.setSpinnerVisible(false);
    }
    render() {
        const {match, data_content} = this.props;
        return (
              <CCTVContent data_content={data_content} name={match.params.name} index={match.params.index}/>
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
        ListViewActions: bindActionCreators(listviewAction, dispatch),
    })
)(ListViewCCTVContent);

