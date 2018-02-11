export default function reducer(state ={
	transaction: {},
	fetching:false,
	fetched: false,
	error: null
}, action){
	switch(action.type){
		case "FETCH_TRANSACTION":{
			return {...state, fetching: true}
		}
		case "FETCH_TRANSACTION_FULFILLED":{
			return {...state, fetching: false, fetched: true, transaction: action.payload}
		}
		case "FETCH_TRANSACTION_REJECTED":{
			return {...state, fetching: false, error: action.payload}
		}
	}

	return state;
}
