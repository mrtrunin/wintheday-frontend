import React from 'react';
import PropTypes from 'prop-types';

const OverviewTable = props => {

    let merchants = props.merchants

    return (<table className="highlight">
        <thead>
            <tr>
                <th>Merchant</th>
                <th>Transactions</th>
                <th className="right">Total amount</th>
            </tr>
        </thead>

        <tbody>
            {
                merchants.filter((merchant) => {
                    return merchant.transaction_summary.count > 0
                }).map(merchant => <tr key={merchant.id}>
                    <td key="name">{merchant.name}</td>
                    <td key="count">{merchant.transaction_summary.count}</td>
                    <td key="amount" className="right">{merchant.transaction_summary.total_amount}</td>
                </tr>)
            }
        </tbody>
    </table>)
}

OverviewTable.propTypes = {
    merchants: PropTypes.array
}

export default OverviewTable;
