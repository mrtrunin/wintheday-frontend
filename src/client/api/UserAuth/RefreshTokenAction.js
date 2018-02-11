import Message from 'Message';
const base64 = require('base-64');
import axios from 'axios';

let client_id = process.env.REACT_APP_CLIENT_ID;
let client_secret = process.env.REACT_APP_CLIENT_SECRET;

export function refreshToken() {

    let data = new FormData()
    data.append('grant_type', 'refresh_token')
    data.append('refresh_token', localStorage.refresh_token)

    return axios.post(process.env.SERVER_URL + '/o/token/', data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + base64.encode(client_id + ':' + client_secret)
        }

    }).then(results => {
        return results.data
    }).then(results => {
        const access_token = results.access_token
        const refresh_token = results.refresh_token
        const expiration_time = Date.now() + results.expires_in * 1000

        localStorage.setItem('jwtToken', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('jwtToken_expiration_time', expiration_time);
    }).catch(error => {
        Message(error, 'error')
    });

}
