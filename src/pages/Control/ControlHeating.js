import React, { Component } from 'react';
import * as uiActions from 'redux/modules/ui';
import * as controlActions from 'redux/modules/control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HeatingContainer } from 'containers/Control';
import * as KEY from 'lib/raemianAES';

class ControlHeating extends Component {
    async componentDidMount() {
        const { UIActions, ControlActions, auth} = this.props;
        const {usertoken} = this.props.loginUserInfo.toJS();
        UIActions.setPageType({pageType:'/control'});
        UIActions.setHeaderTitle({title:'난 방'});

        const data = 'all';
        console.log('data:',data);
        try{
            UIActions.setSpinnerVisible(true);
            await ControlActions.getInitialHeatings({data:data,usertoken:usertoken});
        }catch(e){
            console.log(e);
        }
        

        UIActions.setSpinnerVisible(false);
    }

    render() {

         return (
            <HeatingContainer/>
        )
    };
};

export default connect(
    (state) => ({
        loginUserInfo: state.auth.get('loginUserInfo')
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch),
        ControlActions : bindActionCreators(controlActions, dispatch),
        
    })
)(ControlHeating);

