export default function reducer(state ={
    budgetItems: {},
    fetching:false,
    fetched: false,
    error: null
}, action){
    switch(action.type){
    case 'FETCH_BUDGET_ITEMS':{
        return {...state, fetching: true}
    }
    case 'FETCH_BUDGET_ITEMS_FULFILLED':{
        return {...state, fetching: false, fetched: true, budgetItems: action.payload}
    }
    case 'FETCH_BUDGET_ITEMS_REJECTED':{
        return {...state, fetching: false, error: action.payload}
    }
    }

    return state;
}
