import React from 'react';
import PropTypes from 'prop-types';
import BudgetItemSelectorField from 'components/Fields/BudgetItemSelectorField';

const ValueField = props => {
    let value = props.value
    let editable = props.editable
    let edit = props.edit
    let object = props.object

    if (edit) {
        value = <input type="text" defaultValue={value} onChange={props.handleFieldChange}/>
    }


    if (edit && object === 'budgetItem') {
        value = <BudgetItemSelectorField  onChange={props.handleFieldChange} />
    }


    if (editable && !edit) {
        value = value ? value : <span className='pink-text lighten-2'>+ Add New</span>;
        value = <a href='#' onClick={props.handleStartEdit}>{value}</a>
    }

    return <div className="col s4">{value}</div>
}

ValueField.propTypes = {
    value: PropTypes.string,
    editable: PropTypes.bool,
    edit: PropTypes.bool,
    handleFieldChange: PropTypes.func,
    handleStartEdit: PropTypes.func,
    object: PropTypes.string,
}

export default ValueField;