import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

@connect((store) => {
    return {
        user: store.user.user
    }
})

class SideNavContainer extends Component {

    componentDidMount() {
        this.initiateNavBar();
    }

    initiateNavBar() {
        var options = {}
        var elem = document.querySelector('.sidenav');
        // eslint-disable-next-line
        var instance = M.Sidenav.init(elem, options);
    }

    userLoggedIn() {
        return Object.keys(this.props.user).length !== 0
    }

    getFullName() {
        let firstName = this.userLoggedIn() ? this.props.user.first_name : ''
        let lastName = this.userLoggedIn() ? this.props.user.last_name : ''
        let fullName = firstName + ' ' + lastName
        return fullName
    }

    render() {

        let loginlogout = this.userLoggedIn()
            ? <li>
                <Link to="/logout">
                    <i className="material-icons">power_settings_new</i>Log out</Link>
            </li>
            : <li>
                <Link to="/login/">
                    <i className="material-icons">power_settings_new</i>Log in</Link>
            </li>

        let loggedInLinks = this.userLoggedIn()
            ? (<div>
                <li><Link to="/statement-upload/"><i className="material-icons">add_box</i>Upload statement</Link></li>
                <li><Link to="/transactions/"><i className="material-icons">attach_money</i>View transactions</Link></li>
                <li><Link to="/categorise-transactions/"><i className="material-icons">view_list</i>Categorise transactions</Link></li>
                <li><Link to="/overview/"><i className="material-icons">account_balance</i>Overview</Link></li>
            </div>
            )
            : ''

        return (
            <div>
                <ul id="slide-out" className="sidenav sidenav-fixed">
                    <li className="logo black-text">
                        <div className="container center-align">
                            <div className="row"></div>
                            <div className="row"></div>
                            <Link to="/" className="">
                                <h4>WinTheDay</h4>
                            </Link>
                            <div className="row"></div>
                        </div>
                    </li>
                    { loggedInLinks }
                    <div className="row"></div>
                    <div className="divider"></div>
                    <div className="row"></div>
                    <div className="row"></div>
                    <li>
                        <div className="row center-align">
                            <h5>{ this.getFullName() }</h5>
                        </div>
                    </li>
                    { loginlogout }
                </ul>
                { /* <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a> */ }
            </div>
        );
    }
}

SideNavContainer.propTypes = {
    user: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
    })

}

export default SideNavContainer
