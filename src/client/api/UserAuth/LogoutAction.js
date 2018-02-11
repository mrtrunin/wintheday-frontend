import store from 'store';
import axios from 'axios';
import Message from 'Message';

let client_id = process.env.REACT_APP_CLIENT_ID;
let client_secret = process.env.REACT_APP_CLIENT_SECRET;

export function logout() {

    const token = localStorage.jwtToken

    let data = new FormData()
    data.append('token', token)
    data.append('client_id', client_id)
    data.append('client_secret', client_secret)

    return axios.post(process.env.SERVER_URL + '/o/revoke_token/', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token
        }
    }).then(() => {

        store.dispatch({type: 'USER_LOGOUT'})

        localStorage.removeItem('refresh_token');
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('jwtToken_expiration_time');
        localStorage.removeItem('reduxState');

        Message('Logged out successfully')

    }).catch(error => {
        Message(error, 'error')
    });
}
