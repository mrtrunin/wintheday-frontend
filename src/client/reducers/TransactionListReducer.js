export default function reducer(state ={
	transactions: {},
	fetching:false,
	fetched: false,
	error: null
}, action){
	switch(action.type){
		case "FETCH_TRANSACTIONS":{
			return {...state, fetching: true}
		}
		case "FETCH_TRANSACTIONS_FULFILLED":{
			return {...state, fetching: false, fetched: true, transactions: action.payload}
		}
		case "FETCH_TRANSACTIONS_REJECTED":{
			return {...state, fetching: false, error: action.payload}
		}
	}

	return state;
}
