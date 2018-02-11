import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadTransactionList from 'api/LoadTransactionList';
import Loader from 'components/Loader';
import TransactionListTable from './TransactionListTable';
import PropTypes from 'prop-types';

@connect((store) => {
    return {
        transactions: store.transactions.transactions,
        fetched: store.transactions.fetched
    }
})

class TransactionListContainer extends Component {

    componentDidMount() {
        LoadTransactionList();
    }

    render() {

        if (this.props.fetched === false) {
            return <Loader/>
        }

        return (<TransactionListTable transactions={ this.props.transactions } />);
    }
}

TransactionListContainer.propTypes = {
    fetched: PropTypes.bool,
    transactions: PropTypes.arrayOf(PropTypes.object),
}

export default TransactionListContainer
