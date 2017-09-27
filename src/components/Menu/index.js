import React, { Component } from 'react';
import Header from './Header'
import Sidebar from 'react-sidebar'
import SideItemContainer from 'containers/SideMenu/SideItemContainer'
import { connect } from 'react-redux';
import * as homeActions from 'redux/modules/home';
import * as uiActions from 'redux/modules/ui';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

class Menu extends Component {

    static contextTypes = {
        router: PropTypes.object
	}

    constructor(props) {
        super(props);
        this.state = {
            sidebarOpen: false
        }
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
    
    onSetSidebarOpen = (open) => {
        this.setState({sidebarOpen: open});
    }

    clickEventSlideOpen = () => {
        document.getElementById("sideMenuWrapper").scrollTop = 0;
        this.setState({sidebarOpen: true});
    }

    clickEventSlideClose = () => {
        this.setState({sidebarOpen: false});
        this.changeSideMenuView({sideViewIndex:0,sideViewTitle:'전체 메뉴'});
    }
    onClickBackPage = () => {
        const { pageType } = this.props;
        const{ history } = this.context.router;
        history.push(pageType);
    }

    changeSideMenuView = (sideView) => {
        const { UIActions } = this.props;
        UIActions.changeSideMenuView(sideView);
    }

    render() {
        const { pageType, title,sideView } = this.props;
        const { sideViewIndex, sideViewTitle } = this.props.sideView.toJS();

        const style ={
            sidebar: {
                zIndex: 200,
                background:'#3e454b',
                width: '90%',
                overflow:'none !important'
            },
            overlay: {
                zIndex: 199,
                backgroundColor: 'rgba(0, 0, 0, 0.8)'
            }
        }

        const sideBar = 
            <div>
                <SideItemContainer
                    slideBack= {this.clickEventSlideClose}
                    sideViewIndex={sideViewIndex}
                    changeSideMenuView = {this.changeSideMenuView}
                    sideViewTitle={sideViewTitle}
                />
            </div>
        ;

        return(
               <div>
                    <Sidebar sidebar={sideBar}
                            open={this.state.sidebarOpen}
                            onSetOpen={this.onSetSidebarOpen}
                            pullRight={true}
                            shadow={false}
                            touch={false}
                            styles={style}>
                            <div></div>
                    </Sidebar>
                    <Header
                            sideOpen = {this.clickEventSlideOpen}
                            pageType = {pageType}
                            title = {title}
                            sideBack= {this.onClickBackPage}
                    />
                </div>
        )
    }
}

export default connect(
    (state) => ({
        sideOpen: state.ui.getIn(['sideMenu','sideOpen']),
        sideView: state.ui.getIn(['sideMenu','sideView']),
        pageType: state.ui.getIn(['roots', 'pageType']),
        title: state.ui.getIn(['roots', 'title'])
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        HomeActions: bindActionCreators(homeActions, dispatch)
    })
)(Menu);


