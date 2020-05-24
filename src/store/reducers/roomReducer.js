const initState={
    errorMessage:null,
    userInfo:null
}

const roomReducer=(state=initState,action)=>{
    switch(action.type){
        case 'CREATE_ROOM_EXISTS':
            return {
                ...state,
                errorMessage:'Already a Room with ID exists, choose a new one'
            }
        case 'CREATE_ROOM_SUCCESS':
            return {
                ...state,
                errorMessage:'Successfully created the room',
                userInfo:action.user
            }
        case 'CREATE_ROOM_ERROR':
            return {
                ...state,
                errorMessage:action.err
            }
        case 'JOIN_ROOM_SUCCESS':
            return {
                ...state,
                errorMessage:'Successfully joined the room',
                userInfo:action.user
            }
        case 'JOIN_ROOM_ERROR':
            return {
                ...state,
                errorMessage:action.err
            }
        case 'JOIN_ROOM_NOTAVAILABLE':
            return {
                ...state,
                errorMessage:action.err
            }
        case 'JOIN_ROOM_FULL':
            return {
                ...state,
                errorMessage:action.err
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                errorMessage:'Logged out successfully',
                userInfo:null
            }
        default:
            return {...state};
    }
}

export default roomReducer;