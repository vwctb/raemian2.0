import React, { Component } from 'react';
import Footer from 'components/Footer'
import Layout from 'components/Layout'
import * as homeActions from 'redux/modules/home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeContainer from 'containers/Home/HomeContainer';
import * as uiActions from 'redux/modules/ui';
import * as authActions from 'redux/modules/auth';
//import * as KEY from 'lib/raemianAES';

//import GibberishAES from 'aes';
class Home extends Component {
    endCursor = 0
    async componentDidMount() {
        // 초기 메모 로딩
        try {
           // await Promise.all([HomeActions.getInitialFschedules(),HomeActions.getInitialNewalarms()]);
           // this.getRecentMemo();
           
           
        } catch(e) {
            console.log(e);
        }
    }

    render() {
        const {handleClick, newTalk} = this.props;
        return (
            <Layout>
               <HomeContainer/>
               <Footer
                 selectedPage = "home"
                 newFtalk= {newTalk.get('ftalk')}
                 newFmsg = {newTalk.get('fmsg')}
                 handleClick = {handleClick}
               />
            </Layout>
        );
    }
};

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo'),
        slideOpen: state.ui.getIn(['slideMenu','slideOpen']),
        newTalk : state.ui.get('newTalk')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        AuthActions: bindActionCreators(authActions, dispatch),
        HomeActions: bindActionCreators(homeActions, dispatch)
    })
)(Home);