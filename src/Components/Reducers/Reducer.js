const initialState = {
    subId: '',
    email: '',
    userName: '',
    isLogged : false
}

const Reducer = (state = initialState, action) => {
	if(action.type === 'SET_MEMBER_ID'){
		return {
			...state,
            subId: action.subId,
            email: action.email,
            userName: action.userName,
            isLogged : action.isLogged
		}
	}

	return state;
}
export default Reducer;