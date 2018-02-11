import React, {Component} from 'react';
import TransactionList from './TransactionList';
import StatementUpload from './StatementUpload';
import Title from './Title'
import Overview from './Overview';
import Transaction from './Transaction';
import Login from './Login';
import Logout from './Logout';
import { refreshToken } from 'api/UserAuth/RefreshTokenAction';
import CategoriseTransactions from './CategoriseTransactions';
import PropTypes from 'prop-types';

class Main extends Component {
    constructor() {
        super()
    }

    componentDidUpdate() {
        this.refreshAccessToken();
    }

    refreshAccessToken() {
        let expiration_time = localStorage.jwtToken_expiration_time
        let now = Date.now()

        if (expiration_time - now  < 82800*1000) {
            refreshToken();
        }
    }

    render() {
        const components = {
            statementUpload: StatementUpload,
            transactionList: TransactionList,
            transaction: Transaction,
            overview: Overview,
            login: Login,
            logout: Logout,
            categoriseTransactions: CategoriseTransactions
        }

        let Component = components[this.props.component]

        return (<main>

            <Title title={this.props.title}/>
            <div className="container">
                <Component params={this.props}/>
            </div>

        </main>);
    }
}

Main.propTypes = {
    title: PropTypes.string,
    component: PropTypes.string,
}

export default Main;
