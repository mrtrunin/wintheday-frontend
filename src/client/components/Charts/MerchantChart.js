import React from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'Recharts';
import PropTypes from 'prop-types';

const MerchantChart = props => {

    let merchants = props.merchants

    let merchantData = [];

    merchants.filter((merchant) => {
        return merchant.transaction_summary.count > 0
    }).map((merchant) => {
        let singleMerchant = {
            'merchant': merchant.name,
            'amount': (-1 * merchant.transaction_summary.total_amount),
            'count': merchant.transaction_summary.count
        }
        merchantData.push(singleMerchant)
    })

    return <ResponsiveContainer width="95%" height="50%">
        <BarChart data={merchantData} margin={{
                top: 5,
                right: 5,
                left: 5,
                bottom: 5
            }}>
            <XAxis dataKey="merchant"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip dataKey="count"/>
            <Bar dataKey="amount" fill="#f06292"/>
        </BarChart>
    </ResponsiveContainer>
}

MerchantChart.propTypes= {
    merchants: PropTypes.array
}

export default MerchantChart;
