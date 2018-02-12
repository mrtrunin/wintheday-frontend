import store from 'store';
import axios from 'axios';


async function LoadTransaction(transactionId) {
    console.log('====================================');
    console.log(localStorage.jwtToken)
    console.log('====================================');

    await axios.get(process.env.SERVER_URL + '/transactions/' + transactionId, {
        headers: {
            Authorization: 'Bearer ' + localStorage.jwtToken
        }
    }).then(results => {
        return results.data;
    }).then(data => {
        store.dispatch({
            type: 'FETCH_TRANSACTION_FULFILLED',
            payload: data
        })
    }).catch(error => {
        store.dispatch({
            type: 'FETCH_TRANSACTION_REJECTED',
            payload: error
        })
    })
}

export default LoadTransaction;
