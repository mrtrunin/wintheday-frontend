import axios from 'axios';
import Message from 'Message';

async function CategoriseTransaction(transactionId, merchantName, categoryName, budgetItemName) {
    let payload = {}

    if (merchantName) {
        payload.merchant = merchantName
    }

    if (categoryName) {
        payload.category = categoryName
    }

    if (budgetItemName) {
        payload.budget_item = budgetItemName
    }

    await axios.patch(
        process.env.SERVER_URL + '/transactions/' + transactionId + '/',
        payload, {
            headers: {
                Authorization: 'Bearer ' + localStorage.jwtToken
            }
        }).then(results => {
        return results.data
    }).then(() => {

        if (merchantName) {
            Message(merchantName + ' was added successfully to transaction ' + transactionId + '!', 'success');
        }

        if (categoryName) {
            Message(categoryName + ' was added successfully to transaction ' + transactionId + '!', 'success');
        }

        if (budgetItemName) {
            Message(budgetItemName + ' was added successfully to transaction ' + transactionId + '!', 'success');
        }

    }).catch(error => {
        Message(error, 'error')
    })
}

export default CategoriseTransaction;
