import React, { useState } from "react";
import { Redirect } from 'react-router-dom'
import { login } from '../actions/auth'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Login.css';

const Login = ({isAuthenticated, login}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData

    const onChange = async (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        login(email, password)
    }

    if(isAuthenticated) {
        return (<Redirect to='/upload' />)
    }

    return (
        <form className="formLabel" onSubmit={e => {onSubmit(e)}}>
            <h3>Sign In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" name='email' value={email} onChange={e => onChange(e)} required/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name='password' value={password} onChange={e => {onChange(e)}}/>
            </div>
            <button type="submit" className="btn btn-primary btn-block">Sign In</button>
        </form>
    );
}

const mapStateToProp = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

export default connect(mapStateToProp ,{login})(Login)