import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { loadImage } from '../actions/upload'
import PropTypes from 'prop-types'
import './displayImage.css'

function DisplayImage({loadImage, imguri}) {
    const imgURI = 'http://mrugankray3.pythonanywhere.com/static/images/'+`${imguri}`
    return (
        <Fragment>
            <main>
                <img src={imgURI}></img>
            </main>
        </Fragment>
    )
}

const mapStateToProp = state => ({
    imguri : state.upload.imguri
})

DisplayImage.propTypes = {
    loadImage: PropTypes.func.isRequired,
}

export default connect(mapStateToProp, {loadImage})(DisplayImage)
