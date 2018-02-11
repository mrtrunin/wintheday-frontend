import React from 'react'
import PropTypes from 'prop-types'

const BudgetItemSelector = props => {

    let {budgetItems} = props

    let budgetItemsSelectOptions = budgetItems.map(budgetItem => {
        return <option key={ budgetItem.name } defaultValue={ budgetItem.name }>
            { budgetItem.name }
        </option>
    })

    return (
        <select defaultValue="Select Budget Item" className="input-field" onChange={props.onChange} >
            <option defaultValue disabled>Select Budget Item</option>
            { budgetItemsSelectOptions }
        </select>
    )
}

BudgetItemSelector.propTypes = {
    budgetItems: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
    ]),
    onChange: PropTypes.func.isRequired,
}

export default BudgetItemSelector;
