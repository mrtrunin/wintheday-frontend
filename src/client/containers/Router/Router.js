import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Main from 'containers/Main';

class Router extends Component {
    render() {
        return (<Switch>
            <Route exact={ true } path="/" render={ () => <Redirect to="/login/" /> } />
            <Route exact={ true } path="/login/" render={ () => <Main title="Login" component='login' /> } />
            <Route exact={ true } path="/statement-upload/" render={ () => <Main title='Statement Upload' component='statementUpload' /> } />
            <Route exact={ true } path="/transactions/" render={ () => <Main title='Transactions' component='transactionList' /> } />
            <Route path="/transactions/:id" render={ (props) => <Main title={ 'Transaction #' + props.match.params.id } component='transaction' transactionId={ props.match.params.id } /> } />
            <Route exact={ true } path="/overview/" render={ () => <Main title='Overview' component='overview' /> } />
            <Route exact={ true } path="/logout/" render={ () => <Main title='See you soon!' component='logout' /> } />
            <Route exact={ true } path="/categorise-transactions/" render={ () => <Main title='Categorise Transactions' component='categoriseTransactions' /> } />
        </Switch>);
    }
}

export default Router
