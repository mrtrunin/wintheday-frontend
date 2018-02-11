import { connect } from 'react-redux';
import React, { Component } from 'react';
import LoadTransaction from 'api/LoadTransaction';
import Loader from 'components/Loader';
import TransactionDescription from './TransactionDescription';
import PropTypes from 'prop-types';
import LoadBudgetItemList from 'api/LoadBudgetItemList';


@connect((store) => {
    return {
        transaction: store.transaction.transaction,
        fetched: store.transaction.fetched
    }
})

class Transaction extends Component {
    constructor() {
        super();

        this.refreshData = this.refreshData.bind(this);
        this.loadDataFromApi = this.loadDataFromApi.bind(this)
    }

    loadDataFromApi() {
        LoadTransaction(this.props.params.transactionId)
        LoadBudgetItemList()
    }

    componentDidMount() {
        this.loadDataFromApi()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.params.transactionId !== this.props.params.transactionId) {
            this.loadDataFromApi()
        }
    }

    refreshData(data) {
        if (data) {
            this.loadDataFromApi()
        }
    }

    render() {
        if (this.props.fetched === false) {
            return <Loader/>
        }

        let transaction = this.props.transaction

        if (transaction.detail === 'Not found.') {
            return 'Transaction not found'
        }

        return <TransactionDescription transaction={ transaction } refreshData={ this.refreshData } />
    }
}

Transaction.propTypes = {
    params: PropTypes.object,
    fetched: PropTypes.bool,
    transaction: PropTypes.object
}

export default Transaction
