export const createRoom=(userInfo)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        firestore.collection('rooms').doc(userInfo.roomID).get()
        .then(doc=>{
            if(doc.exists){
                dispatch({type:'CREATE_ROOM_EXISTS'});
            }else{
                firestore.collection('rooms').doc(userInfo.roomID).set({
                    users:[userInfo.username],
                    paused:true,
                    searchTerm:"",
                    videoId:""
                })
                .then(()=>{
                    dispatch({type:'CREATE_ROOM_SUCCESS',user:userInfo});
                })
                .catch(terr=>dispatch({type:'CREATE_ROOM_ERROR',err:terr}))
            }
        })
        .catch(err=>dispatch({type:'CREATE_ROOM_ERROR',err:err}))
    }
}

export const joinRoom=(userInfo)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        firestore.collection('rooms').doc(userInfo.roomID).get()
        .then(doc=>{
            if(doc.exists){
                const users=doc.data().users;
                if(users.length<2){
                    users.push(userInfo.username);
                    firestore.collection('rooms').doc(userInfo.roomID).update({
                        users:users
                    })
                    .then(()=>{
                        dispatch({type:'JOIN_ROOM_SUCCESS',user:userInfo})
                    })
                    .catch(terr=>dispatch({type:'JOIN_ROOM_ERROR',err:terr}))    
                }else{
                    dispatch({type:'JOIN_ROOM_FULL',err:'The join room is already full'});
                }
            }else{
                dispatch({type:'JOIN_ROOM_NOTAVAILABLE',err:`There doesn't exist any room with this RoomID`});
            }
        })
        .catch(err=>dispatch({type:'JOIN_ROOM_ERROR',err:err}));
    }
}