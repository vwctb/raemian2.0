
import React, { Component } from 'react';

import { connect } from 'react-redux';
import styled from 'styled-components';
import  {BG_Sub_Reamin,LogoCombi} from 'img';
import { bindActionCreators } from 'redux';


const Wrapper = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    background:#34393e;
    top: 0;
    z-index: 10;
    color:white;
    background-image: url(${BG_Sub_Reamin});
	background-position: center;
	background-size: cover;
`;


class TestContainers extends Component {
    constructor(props) {
        super(props);
        this.state = {file: '',type:'',imagePreviewUrl: ''};
    }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        type: file.type.split('/')[0],
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl,type} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {

      if(type === 'video'){
        $imagePreview = (<video src={imagePreviewUrl} controls/>); 
      }else{
        $imagePreview = (<img src={imagePreviewUrl} />);
      } 


    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <Wrapper>
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
      </Wrapper>
    )
  }
};

export default connect(
    (state) => ({
        familyListArray: state.auth.getIn(['register','familyList']),
        base: state.auth.getIn(['register','base'])
    }),
    (dispatch) => ({
        UIActions: bindActionCreators(dispatch)
    })
)(TestContainers);

