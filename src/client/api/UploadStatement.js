import store from 'store';
import axios from 'axios';
import Message from 'Message';

async function UploadStatement(statement, bank) {

    let data = new FormData()
    data.append('bank', bank)
    data.append('statement', statement);

    await axios.post(process.env.SERVER_URL + '/statements/', data, {
        headers: {
            Authorization: 'Bearer ' + localStorage.jwtToken
        }
    }).then(results => {
        store.dispatch({
            type: 'UPLOAD_STATEMENT_FULFILLED',
            payload: results.data
        })
        return results.data
    }).catch(error => {
        Message(error, 'error')
    })

}

export default UploadStatement;
