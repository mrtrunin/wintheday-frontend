import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoriseTransactionsFormContainer from './CategoriseTransactionsFormContainer';
import LoadAggregatedTransactionList from 'api/LoadAggregatedTransactionList';
import LoadBudgetItemList from 'api/LoadBudgetItemList';
import InitializeSelectors from 'actions/MaterializeInitializers/InitializeSelectors';


@connect((store) => {
    return {
        aggregatedTransactions: store.aggregatedTransactions.transactions,
        fetched: store.aggregatedTransactions.fetched
    }
})

class CategoriseTransactionsContainer extends Component {
    constructor() {
        super();
        this.loadAggregatedTransactionList = this.loadAggregatedTransactionList.bind(this)
        this.loadBudgetItemList = this.loadBudgetItemList.bind(this)
        this.reload = this.reload.bind(this)
    }

    loadAggregatedTransactionList() {
        let uncategorised = true
        LoadAggregatedTransactionList(uncategorised);
    }

    loadBudgetItemList() {
        LoadBudgetItemList()
    }

    reload() {
        this.loadBudgetItemList()
        this.loadAggregatedTransactionList()
    }

    async componentDidMount() {
        this.loadAggregatedTransactionList()
        this.loadBudgetItemList()
        InitializeSelectors();
    }

    componentDidUpdate() {
        InitializeSelectors();
    }

    render() {
        const { aggregatedTransactions, fetched } = this.props

        if (Object.keys(aggregatedTransactions).length === 0) {
            return <div>Looks like all your transactions are categorised!</div>
        }

        return (<CategoriseTransactionsFormContainer 
            aggregatedTransactions={ aggregatedTransactions } 
            fetched={ fetched } 
            reload={ this.reload } />

        );
    }
}

CategoriseTransactionsContainer.propTypes = {
    aggregatedTransactions: PropTypes.array,
    fetched: PropTypes.bool,
}

export default CategoriseTransactionsContainer
