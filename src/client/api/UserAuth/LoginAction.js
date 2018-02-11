const base64 = require('base-64');
import axios from 'axios';
import Message from 'Message';

let client_id = process.env.REACT_APP_CLIENT_ID;
let client_secret = process.env.REACT_APP_CLIENT_SECRET;

export function login(data) {

    let formdata = new FormData()
    formdata.append('grant_type', 'password')
    formdata.append('username', data.username)
    formdata.append('password', data.password)

    return axios.post(process.env.SERVER_URL + '/o/token/', formdata, {
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



    // return fetch(config.API.serverUrl + '/o/token/', {
    //     mode: 'cors',
    //     method: 'POST',
    //     headers: {
    //         "Content-Type": "application/x-www-form-urlencoded",
    //         "Authorization": "Basic " + base64.encode(client_id + ':' + client_secret)
    //     },
    //     body: 'grant_type=password&username=' + data.username + '&password=' + data.password
    //
    // }).then(results => {
    //     return results.json()
    // }).then(results => {
    //     const access_token = results.access_token
    //     const refresh_token = results.refresh_token
    //     const expiration_time = Date.now() + results.expires_in * 1000
    //
    //     localStorage.setItem('jwtToken', access_token);
    //     localStorage.setItem('refresh_token', refresh_token);
    //     localStorage.setItem('jwtToken_expiration_time', expiration_time);
    // }).catch(error => {
    //     console.log('ERROR');
    //     console.log(error);
    // });
}
