import React, { Component } from 'react';
import Footer from 'components/Footer'
import Layout from 'components/Layout'
import * as homeActions from 'redux/modules/home';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HomeContainer from 'containers/Home/HomeContainer';
import * as uiActions from 'redux/modules/ui';

//import GibberishAES from 'aes';
class Home extends Component {
    endCursor = 0
    async componentDidMount() {
        const { HomeActions } = this.props;
        // 초기 메모 로딩
        try {
            await Promise.all([HomeActions.getInitialFschedules(),HomeActions.getInitialNewalarms()]);
           // this.getRecentMemo();
        } catch(e) {
            console.log(e);
        }
    }
     
    render() {
        const {UIActions} = this.props;
        return (
            <Layout>
               <HomeContainer/>
               <Footer
                 selectedPage = "home"
               />
            </Layout>
        );
    }
};

export default connect(
    (state) => ({
        slideOpen: state.ui.getIn(['slideMenu','slideOpen'])
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        HomeActions: bindActionCreators(homeActions, dispatch)
    })
)(Home);