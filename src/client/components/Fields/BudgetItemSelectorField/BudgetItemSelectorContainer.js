import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import BudgetItemSelector from './BudgetItemSelector';

@connect(store => {
    return {
        budgetItems: store.budgetItems.budgetItems,
        fetched: store.budgetItems.fetched,
        fetching: store.budgetItems.fetching,
    }
})

export default class BudgetItemSelectorContainer extends Component {
    static propTypes = {
        budgetItems: PropTypes.object,
        fetched: PropTypes.bool,
        fetching: PropTypes.bool,
        onChange: PropTypes.func,
    }

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onChange(e.target.value)
    }

    render() {
        return (
            <div>
                <BudgetItemSelector budgetItems={ this.props.budgetItems } onChange={this.handleChange} />
            </div>
        )
    }
}


