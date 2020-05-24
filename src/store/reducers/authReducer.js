const initState={
    authMessage:null
};

const authReducer=(state=initState,action)=>{
    switch(action.type){
        case 'LOGOUT_ERROR':
            return {
                ...state,
                authMessage:action.err
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                authMessage:'Logged out successfully'
            }
        default:
            return state;
    }
}

export default authReducer;