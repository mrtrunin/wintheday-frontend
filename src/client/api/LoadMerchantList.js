import store from 'store';
import axios from 'axios';

async function LoadMerchantList() {

    await axios.get(process.env.SERVER_URL + '/merchants/', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.jwtToken
        }
    }).then(results => {
        return results.data;
    }).then(data => {
        store.dispatch({
            type: 'FETCH_MERCHANTS_FULFILLED',
            payload: data
        })
    }).catch(error => {
        store.dispatch({
            type: 'FETCH_MERCHANTS_REJECTED',
            payload: error
        })
    })
}

export default LoadMerchantList;
