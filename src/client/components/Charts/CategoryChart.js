import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import categoryDataPrepForChart from './categoryDataPrepForChart';

const CategoryChart = props => {
    let { categories, isRevenue } = props

    let costsByCategory = categoryDataPrepForChart(categories, isRevenue)

    let color = {
        green: '#388e3c',
        pink: '#f06292'
    }

    let barColor = isRevenue ? color.green : color.pink;

    return (<ResponsiveContainer width="95%" height="50%">
        <BarChart data={costsByCategory} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <XAxis dataKey="category" />
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip dataKey="count" />
            <Bar dataKey="amount" fill={barColor} />
        </BarChart>
    </ResponsiveContainer>)
}

CategoryChart.propTypes = {
    categories: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
    ]).isRequired,
    isRevenue: PropTypes.bool
}

export default CategoryChart;
