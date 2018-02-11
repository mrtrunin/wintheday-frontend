import React from 'react';
import PropTypes from 'prop-types';
import DateFormatter from 'DateFormatter';
import {Link} from 'react-router-dom';

const TransactionListTable = props => {
    return (
        <table className="highlight">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                    {/* <th>Description</th> */}
                    <th>Merchant</th>
                    <th>Category</th>
                    <th>Budget Item</th>
                    <th className="right">Amount</th>
                </tr>
            </thead>

            <tbody>
                {
                    props.transactions.map(transaction => <tr key={transaction.id}>
                        <td>{DateFormatter(transaction.bank_date)}</td>
                        <td><Link to={'/transactions/' + transaction.id}>{transaction.account_name}</Link></td>
                        {/* <td>{transaction.description.replace('5470250000131442', '').substr(0, 30)}</td> */}
                        <td>{transaction.merchant ? transaction.merchant : '-'}</td>
                        <td>{transaction.category ? transaction.category : '-'}</td>
                        <td>{transaction.budget_item ? transaction.budget_item : '-'}</td>
                        <td className="right">{transaction.amount + ' ' + transaction.currency}</td>
                    </tr>)
                }
            </tbody>
        </table>
    )
}

TransactionListTable.propTypes = {
    transactions: PropTypes.array
}

export default TransactionListTable;
