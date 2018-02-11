import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LoadAggregatedTransactionList from 'api/LoadAggregatedTransactionList';
import Loader from 'components/Loader';
import AggregatedTransactionRowContainer from './AggregatedTransactionRowComponent';
import CategoriseTransaction from 'api/CategoriseTransaction';
import Message from 'Message';

@connect((store) => {
    return {
        aggregatedTransactions: store.aggregatedTransactions.transactions, 
        fetched: store.aggregatedTransactions.fetched
    }
})

class CategoriseTransactionsFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            aggregatedTransactions: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCategorisation = this.handleCategorisation.bind(this)
    }

    componentDidMount() {
        this.addAggregatedTransactionsToState()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.aggregatedTransactions !== this.props.aggregatedTransactions) {
            this.setState({aggregatedTransactions: this.props.aggregatedTransactions})
        }
    }

    handleCategorisation(transaction) {
        let aggregatedTransactions = this.state.aggregatedTransactions
        let newAggregatedTransaction = transaction

        aggregatedTransactions.forEach((aggregatedTransaction, i) => {
            if (aggregatedTransaction.account_name === newAggregatedTransaction.account_name) {
                aggregatedTransactions[i].merchant = newAggregatedTransaction.merchant
                aggregatedTransactions[i].category = newAggregatedTransaction.category
                aggregatedTransactions[i].budget_item = newAggregatedTransaction.budget_item
            }
        })

        this.setState({aggregatedTransactions: aggregatedTransactions})
    }

    async handleSubmit(e) {
        e.preventDefault()
        let aggregatedTransactions = this.state.aggregatedTransactions

        let numberOfTransactionsUpdated = 0

        for (let aggregatedTransaction of aggregatedTransactions) {
            if (aggregatedTransaction.merchant || aggregatedTransaction.category || aggregatedTransaction.budget_item) {
                for (let transactionId of aggregatedTransaction.transaction_set) {
                    numberOfTransactionsUpdated++
                    await CategoriseTransaction(transactionId, aggregatedTransaction.merchant, aggregatedTransaction.category, aggregatedTransaction.budget_item)
                }
            }
        }

        await this.props.reload()
        await LoadAggregatedTransactionList(true);
        await Message(numberOfTransactionsUpdated + ' transactions categorised!', 'success')
    }

    addAggregatedTransactionsToState() {
        let aggregatedTransactions = this.props.aggregatedTransactions
        

        aggregatedTransactions = aggregatedTransactions.map(transaction => {
            return {account_name: transaction.account_name, transaction_set: transaction.transaction_set}
        })

        this.setState({aggregatedTransactions: aggregatedTransactions});
    }

    render() {

        if (!this.props.fetched) {
            return <Loader/>
        }

        let aggregatedTransactions = this.props.aggregatedTransactions

        let aggregated_transaction_row = aggregatedTransactions.map(transaction => {
            return <AggregatedTransactionRowContainer transaction={transaction} key={transaction.account_name} categorisedTransaction={this.handleCategorisation}/>
        })

        return (<form onSubmit={this.handleSubmit}>

            <div className="fixed-action-btn">
                <button className="btn-floating btn-large waves-effect waves-light pink lighten-2">
                    <i className="material-icons">add</i>
                </button>
            </div>

            <table className="highlight">
                <thead>
                    <tr>
                        <th className="">Transaction</th>
                        <th>Merchant</th>
                        <th>Category</th>
                        <th>Budget Item</th>
                    </tr>
                </thead>

                <tbody>
                    {aggregated_transaction_row}
                </tbody>
            </table>
        </form>);
    }
}

CategoriseTransactionsFormContainer.propTypes = {
    aggregatedTransaction: PropTypes.object,
    aggregatedTransactions: PropTypes.array,
    fetched: PropTypes.bool,
    reload: PropTypes.func,
}

export default CategoriseTransactionsFormContainer
