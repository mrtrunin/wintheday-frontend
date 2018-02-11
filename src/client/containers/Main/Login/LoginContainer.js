import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login} from 'api/UserAuth/LoginAction';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {loadUserData} from 'api/LoadUserData';

@connect((store) => {
    return {user: store.user.user}
})

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            isLoading: false,
            redirect: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    userLoggedIn() {
        return Object.keys(this.props.user).length !== 0
    }

    redirectIfLoggedIn() {
        if (this.userLoggedIn()) {
            this.setState({redirect: true})
        }
    }

    componentDidMount() {
        this.redirectIfLoggedIn()
    }

    async onSubmit(e) {
        e.preventDefault();

        this.setState({isLoading: true})
        await login(this.state)
        await loadUserData()
        await this.setState({redirect: true})
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/transactions'/>
        }

        return (<div className="row">
            <h4 className="col s6 offset-s3 center-align pink-text text-lighten-2">Please login, dear person!</h4>
            <div className="row"></div>
            <form onSubmit={this.onSubmit}>
                <div className="input-field col s6 offset-s3">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="username" name="username" type="text" className="validate" autoComplete="username" onChange={this.onChange}/>
                    <label htmlFor="username">User Name</label>
                </div>

                <div className="input-field col s6 offset-s3">
                    <i className="material-icons prefix">lock</i>
                    <input id="password" name="password" type="password" className="validate" autoComplete="current-password" onChange={this.onChange}/>
                    <label htmlFor="password">Password</label>
                </div>

                <div className="input-field col s6 offset-s3 center-align">
                    <button className="waves-effect waves-light btn-large pink lighten-2" disabled={this.state.isLoading}>Login</button>
                </div>

            </form>
        </div>)
    }
}

Login.propTypes = {
    login: PropTypes.func,
    user: PropTypes.object,
}

export default Login
