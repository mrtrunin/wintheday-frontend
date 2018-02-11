import store from 'store';
import axios from 'axios';

async function LoadBudgetItemList() {

    await store.dispatch({
        type: 'FETCH_BUDGET_ITEMS'
    })

    await axios.get(process.env.SERVER_URL + '/budget-items/', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.jwtToken
        }
    }).then(results => {
        return results.data;
    }).then(data => {
        store.dispatch({
            type: 'FETCH_BUDGET_ITEMS_FULFILLED',
            payload: data
        })
    }).catch(error => {
        store.dispatch({
            type: 'FETCH_BUDGET_ITEMS_REJECTED',
            payload: error
        })
    })
}

export default LoadBudgetItemList;
