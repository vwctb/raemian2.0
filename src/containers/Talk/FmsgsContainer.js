import React, { Component } from 'react';
import { connect } from 'react-redux';
import FmsgList from 'components/Talk/FmsgList';
import {BtnSingle} from 'components/Shared'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as talkActions from 'redux/modules/talk';
import * as uiAction from 'redux/modules/ui';

class FmsgsContainer extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    HandleClickWriteMsg = () => {
        const{ history } = this.context.router;
        history.push('/talk/fmsgs/write');
    }

    itemClick = (seq) => {
        const{ history } = this.context.router;
        history.push('/talk/fmsgs/view/'+seq);
    }
    

    render() {
        const {listArray,familysArray,userArray} = this.props;
        
        return (
            <div>
            <FmsgList listArray={listArray} userArray={userArray} familysArray={familysArray} pageType={'listview/fmsgs'} itemClick={this.itemClick}  />
            
            <BtnSingle
                name={'전송'}
                onClickEvent={this.HandleClickWriteMsg}
              />
            </div>
        )
    };
};

export default connect(
    (state) => ({
        listArray: state.talk.getIn(['fmsgs','list']),
        familysArray: state.talk.getIn(['fmsgs','familys']),
        userArray: state.talk.getIn(['fmsgs','user']),
        }),
    (dispatch) => ({
        TalkActions: bindActionCreators(talkActions, dispatch),
        UIActions: bindActionCreators(uiAction, dispatch)
    })
)(FmsgsContainer);

