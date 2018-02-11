import store from 'store';
import axios from 'axios';

async function LoadCategoryList() {

    await store.dispatch({
        type: 'FETCH_CATEGORIES'
    })

    await axios.get(process.env.SERVER_URL + '/categories/', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.jwtToken
        }
    }).then(results => {
        return results.data;
    }).then(data => {
        store.dispatch({
            type: 'FETCH_CATEGORIES_FULFILLED',
            payload: data
        })
    }).catch(error => {
        store.dispatch({
            type: 'FETCH_CATEGORIES_REJECTED',
            payload: error
        })
    })
}

export default LoadCategoryList;
