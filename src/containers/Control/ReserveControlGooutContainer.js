import React, { Component } from 'react';
import Layout from 'components/Layout';
import { SubTitleWithIcon } from 'components/Control'
import {BtnSingle} from 'components/Shared';
import * as controlActions from 'redux/modules/control';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {ControlCheckBoxList,BtnDoubleCheck} from 'components/Shared';


const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 4rem;
    background:#f7f6ef;
    top: 3.5rem;
    z-index: 0;
    color:white;
    font-size: 1rem;
    overflow-y: auto;
`;

const Notice = styled.div`
    float:left;
    color:#49433c;
    font-size:0.8rem;
    text-align:center;
    padding:3rem;
    width:100%;
`;

class ReserveControlGooutContainer extends Component {
    static contextTypes = {
        router: PropTypes.object
	}

    addFamilyClick = () => {
        console.log('addFamilyClick click');
    }


    useWakeUp = () => {
        console.log('useWakeUp');
    }
    

    render() {
 
       const { checkBoxListArrayLights,checkBoxListArrayConcents,ControlActions, use } = this.props;

        return (
            <Layout>
                <Wrapper>
                    <BtnDoubleCheck
                        from={'goout'}
                        name1={'사용함'}
                        onClickEvent={ControlActions.setCheckboxReserveControlUse} 
                        name2={'사용안함'}
                        check={use}
                    />
                    <SubTitleWithIcon
                        title = {'조명 끄기'}
                        icon = {'light'}
                    />
                    <ControlCheckBoxList
                        from1={'goout'}
                        from2={'lights'}
                        use={use}
                        checkBoxListArray={checkBoxListArrayLights}
                        onCheck={use ? ControlActions.setCheckboxReserveControl : ()=>{return}}
                    />
                    <SubTitleWithIcon
                        title = {'콘센트 끄기'}
                        icon = {'plug'}
                    />
                    <ControlCheckBoxList
                        from1={'goout'}
                        from2={'concents'}
                        use={use}
                        checkBoxListArray={checkBoxListArrayConcents}
                        onCheck={use ? ControlActions.setCheckboxReserveControl :()=>{return} }
                    />
                    <Notice>
                        {
                            '원패스 태그를 가지고 외출할 경우'}<br/>{
                            '설정된 제어가 실행됩니다.'
                        }
                    </Notice>
                </Wrapper>
                <BtnSingle
                    onClickEvent={this.handleClick}
                    name={'확 인'}
                />
            </Layout>
        )
    };
};


export default connect(
    (state) => ({
        checkBoxListArrayLights: state.control.getIn(['reserveControl','goout','lights']),
        checkBoxListArrayConcents: state.control.getIn(['reserveControl','goout','concents']),
        use: state.control.getIn(['reserveControl','goout','use'])
    }),
    (dispatch) => ({
        ControlActions: bindActionCreators(controlActions, dispatch)
    })
)(ReserveControlGooutContainer);

