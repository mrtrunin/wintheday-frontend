import React, {Component} from 'react';
import PropTypes from 'prop-types';

import BudgetItemSelectorField from 'components/Fields/BudgetItemSelectorField';

class AggregatedTransactionRowComponent extends Component {
    constructor() {
        super();
        this.state = {
            account_name: null,
            merchant: null,
            category: null,
            budget_item: null
        }
        this.handleMerchantInput = this.handleMerchantInput.bind(this)
        this.handleCategoryInput = this.handleCategoryInput.bind(this)
        this.handleBudgetItemInput = this.handleBudgetItemInput.bind(this)
    }

    componentDidMount() {
        this.setState({account_name: this.props.transaction.account_name})
    }

    async handleMerchantInput() {
        await this.setState({merchant: this.merchantName.value})
        await this.props.categorisedTransaction(this.state)
    }
    
    async handleCategoryInput() {
        await this.setState({category: this.categoryName.value})
        await this.props.categorisedTransaction(this.state)
    }

    async handleBudgetItemInput(budgetItem) {
        await this.setState({budget_item: budgetItem})
        await this.props.categorisedTransaction(this.state)
    }

    render() {
        let transaction = this.props.transaction

        let merchant = transaction.no_merchant_count > 0
            ? <input type="text" className="input-field validate" ref={(input) => { this.merchantName = input }} placeholder="e.g. Selver, Rimi" onChange={this.handleMerchantInput}/>
            : transaction.merchants.join(', ')

        let category = transaction.no_category_count > 0
            ? <input type="text" className="input-field validate" ref={(input) => { this.categoryName = input }} placeholder="e.g. Salary, Food" onChange={this.handleCategoryInput}/>
            : transaction.categories.join(', ')

        let budget_item = transaction.no_budget_item_count > 0
            // ? <input type="text" className="input-field validate" ref={(input) => { this.budgetItemName = input }} placeholder="e.g. Income, Regular Expense" onChange={this.handleBudgetItemInput}/>
            ? <BudgetItemSelectorField onChange={this.handleBudgetItemInput}/>
            : transaction.budget_items.join(', ')

        return (
            <tr>
                <td key="transaction">{transaction.account_name}</td>
                <td key="merchant">{merchant}</td>
                <td key="category">{category}</td>
                <td key="budget_item">{budget_item}</td>
                {/* <td key="count" className="right-align">{transaction.count}</td> */}
                {/* <td key="amount" className="right-align">{FormatAmount(transaction.amount) + ' ' + transaction.currency}</td> */}
            </tr>
        )
    }
}

AggregatedTransactionRowComponent.propTypes = {
    categorisedTransaction: PropTypes.func,
    transaction: PropTypes.shape({
        account_name: PropTypes.string,
        merchants: PropTypes.array,
        categories: PropTypes.array,
    })
}

export default AggregatedTransactionRowComponent;
