import React, { Component } from 'react';
import Modal from 'components/Shared/Modal';
import {Dimmed} from 'components/Shared';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as uiActions from 'redux/modules/ui';

class ModalContainers extends Component {
    static propTypes = { 
        onHide: PropTypes.func, 
        onAction: PropTypes.func,
        onRemove: PropTypes.func
    }

    handleChange = (e) => {
        const { onChange } = this.props;
        onChange({
            name: e.target.name,
            value: e.target.value
        });
    }

    render() {
        const { handleChange } = this;
        const { onHide, modal, children} = this.props;
       
        return (
            <Modal visible={modal} onHide={onHide}>
               {children}
               {console.log('modal:',modal)}
            </Modal>
        );
    }
}

export default connect(
    (state) => ({
        modal: state.ui.getIn(['modal','visible'])
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(uiActions, dispatch)
    })
   
)(ModalContainers);
