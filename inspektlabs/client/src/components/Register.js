import React, { useState } from "react";
import PropTypes from 'prop-types'
import { register } from '../actions/auth'
import { connect } from 'react-redux'
import './Register.css';
import { Redirect } from "react-router-dom";

const Register = ({isAuthenticated, register}) => {
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
        register(email, password)
    }

    if(isAuthenticated) {
        return <Redirect to='/upload'/>
    }

    return (
        <form className="formLabel" onSubmit={e => onSubmit(e)}>
            <h3>Sign Up</h3>
            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" name='email' value={email} onChange={e => onChange(e)}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" name='password' value={password} onChange={e => onChange(e)}/>
            </div>

            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            <p className="forgot-password text-right">
                Already registered <a href="/login">sign in?</a>
            </p>
        </form>
    );
}

const mapStateToProp = state => ({
    isAuthenticated : state.auth.isAuthenticated
})

Register.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    register: PropTypes.func.isRequired,
}

export default connect(mapStateToProp, {register})(Register)