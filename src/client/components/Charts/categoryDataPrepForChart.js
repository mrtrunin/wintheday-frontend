import PropTypes from 'prop-types';

const CategoryDataPrepForChart = (categories = [], isRevenue) => {
    let categoryData = [];

    let amountSign = 1

    categories = categories.filter((category) => {
        if (isRevenue) {
            return category.transaction_summary.count > 0 && category.transaction_summary.total_amount > 0
        } else {
            amountSign = -1
            return category.transaction_summary.count > 0 && category.transaction_summary.total_amount < 0
        }
    })

    categories.map((category) => {
        categoryData.push({
            category: category.name,
            amount: (amountSign * category.transaction_summary.total_amount),
            count: category.transaction_summary.count
        })
    })

    categoryData.sort((a, b) => {
        return a.amount < b.amount
    })

    return categoryData;
}

CategoryDataPrepForChart.propTypes = {
    categories: PropTypes.array.isRequired,
    isRevenue: PropTypes.bool.isRequired
}

export default CategoryDataPrepForChart;
