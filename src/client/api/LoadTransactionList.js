import store from 'store';
import axios from 'axios';


async function LoadTransactionList(uncategorised, from_date, to_date) {

    let param_uncategorised = uncategorised ? '&uncategorised=True' : ''
    let param_from_date = from_date ? '&from_date=' + from_date : ''
    let param_to_date = to_date ? '&to_date=' + to_date : ''

    let get_params = (param_uncategorised || param_from_date || param_to_date) ? '?' : ''

    await axios.get(process.env.SERVER_URL+ '/transactions/'
    + get_params + param_uncategorised + param_from_date + param_to_date,
    {
        headers: {
            'Authorization': 'Bearer ' + localStorage.jwtToken
        }
    }).then(results => {
        return results.data;
    }).then(data => {
        store.dispatch({
            type: 'FETCH_TRANSACTIONS_FULFILLED',
            payload: data
        })
    }).catch(error => {
        store.dispatch({
            type: 'FETCH_TRANSACTIONS_REJECTED',
            payload: error
        })
    })
}

export default LoadTransactionList;
