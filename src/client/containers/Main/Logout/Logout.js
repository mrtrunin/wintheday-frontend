import React, {Component} from 'react';
import {logout} from 'api/UserAuth/LogoutAction';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Loader from 'components/Loader';

@connect((store) => {
    return ({user: store.user.user})
})

class Logout extends Component {
    constructor() {
        super();
        this.state = {
            redirect: false
        }
    }

    async componentDidMount() {
        await logout()
        await this.setState({redirect: true})
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/login'/>
        }
        return <Loader/>;
    }
}

export default Logout
