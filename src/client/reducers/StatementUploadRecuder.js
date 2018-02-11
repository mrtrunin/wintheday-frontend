export default function reducer(state ={
	message: null,
	uploading:false,
	uploaded: false,
	error: null
}, action){
	switch(action.type){
		case "UPLOAD_STATEMENT":{
			return {...state, uploading: true}
		}
		case "UPLOAD_STATEMENT_FULFILLED":{
			return {...state, uploading: false, uploaded: true, message: action.payload}
		}
		case "UPLOAD_STATEMENT_REJECTED":{
			return {...state, uploading: false, error: action.payload}
		}
	}

	return state;
}
