import React, { Fragment, useState } from 'react';
import { uploadImage } from '../actions/upload'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Login.css';

const FileUpload = ({imguri, uploadImage}) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
    // console.log(file);
    uploadImage(formData)
  };

  if(imguri !== null) {
    return <Redirect to='/uploadedpic'/>
  }

  return (
    <Fragment>
        <form onSubmit={onSubmit} className="formLabel">
            <div className='custom-file mb-4'>
            <input
                type='file'
                className='custom-file-input'
                id='customFile'
                onChange={onChange}
            />
            <label className='custom-file-label' htmlFor='customFile'>
                {filename}
            </label>
            </div>

        
            <input
            type='submit'
            value='Upload'
            className='btn btn-primary btn-block mt-4'
            />
        </form>
        {uploadedFile ? (
            <div className='row mt-5'>
            <div className='col-md-6 m-auto'>
                <h3 className='text-center'>{uploadedFile.fileName}</h3>
                <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
            </div>
            </div>
        ) : null}
    </Fragment>
  );
};

const mapStateToProp = state => ({
    imguri: state.upload.imguri
})

FileUpload.propTypes = {
    uploadImage: PropTypes.func.isRequired,
}

export default connect(mapStateToProp, {uploadImage})(FileUpload);