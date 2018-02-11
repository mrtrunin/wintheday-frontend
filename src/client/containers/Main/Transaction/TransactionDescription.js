import React from 'react';
import DateFormatter from 'DateFormatter';
import TransactionKeyValueField from 'components/Fields/TransactionKeyValueField';
import PropTypes from 'prop-types';

const TransactionDescription = (props) => {
    const { transaction } = props;

    return (<div className="section">
        <h5>{ transaction.account_name }</h5>
        <div className="divider" />
        <div className="section">
            <TransactionKeyValueField title="Amount" object="amount" value={`${transaction.amount  } ${  transaction.currency}`} />
            <TransactionKeyValueField title="Date" object="date" value={DateFormatter(transaction.bank_date)} />
            <TransactionKeyValueField title="Import Date" object="importDate" value={DateFormatter(transaction.date_created)} />
            <TransactionKeyValueField title="Description" object="description" value={transaction.description} />
            <div className="row"><div className="divider" /></div>
            <TransactionKeyValueField title="Merchant" object="merchant" value={transaction.merchant} editable />
            <TransactionKeyValueField title="Category" object="category" value={transaction.category} editable />
            <TransactionKeyValueField title="Budget Item" object="budgetItem" value={transaction.budget_item} editable />
        </div>
    </div>);
};

TransactionDescription.propTypes = {
    transaction: PropTypes.object
}

export default TransactionDescription;
