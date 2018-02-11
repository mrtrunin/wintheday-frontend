import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import user from './UserReducer';
import transactions from './TransactionListReducer';
import transaction from './TransactionReducer';
import merchants from './MerchantsReducer';
import statementUpload from './StatementUploadRecuder';
import budgetItems from './BudgetItemListReducer';
import aggregatedTransactions from './AggregatedTransactionListReducer';
import categories from './CategoriesReducer';

const appReducer = combineReducers({
    user,
    aggregatedTransactions,
    transactions,
    transaction,
    merchants,
    statementUpload,
    categories,
    budgetItems,
    form: formReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined
    }

    return appReducer(state, action)
}

export default rootReducer;
