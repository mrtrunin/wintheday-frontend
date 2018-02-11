import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'components/Loader';
import PropTypes from 'prop-types';

// API
import loadMerchantList from 'api/LoadMerchantList';
import loadCategoryList from 'api/LoadCategoryList';
// Specific Components
// import MerchantChart from 'components/Charts/MerchantChart';
import CategoryChart from 'components/Charts/CategoryChart';

@connect((store) => {
    return {
        merchants: {
            merchants: store.merchants.merchants,
            fetching: store.merchants.fetching,
            fetched: store.merchants.fetched
        },
        categories: {
            categories: store.categories.categories,
            fetching: store.categories.fetching,
            fetched: store.categories.fetched
        }

    }
})

class OverviewContainer extends Component {
    componentDidMount () {
        loadMerchantList();
        loadCategoryList();
    }

    render () {
        if (this.props.merchants.fetching || this.props.categories.fetching) {
            return <Loader />
        }

        // let merchants = this.props.merchants.merchants
        let categories = this.props.categories.categories        

        if (categories.length === 0 ||  !Object.keys(categories).length) {            
            return 'No transactions have been categorised';
        }

        return (
            <div className="row">
                {/* <MerchantChart merchants={merchants}/> */}
                <CategoryChart categories={categories} isRevenue={false}/>
                {/* <MerchantTable merchants={merchants}/> */}
            </div>
        );
    }
}

OverviewContainer.propTypes = {
    merchants: PropTypes.shape({
        merchants: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
        ]),
        fetching: PropTypes.bool,
        fetched: PropTypes.bool
    }),
    categories: PropTypes.shape({
        categories: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
        ]),
        fetching: PropTypes.bool,
        fetched: PropTypes.bool
    })
}


export default OverviewContainer
