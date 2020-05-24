export const userLogOut=(username,roomID)=>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore();
        firestore.collection('rooms').doc(roomID).get()
        .then(doc=>{
            if(doc.exists){
                const users=doc.data().users;
                let newUsers=users.filter(userInfoName=>userInfoName!==username)
                let newSearchTerm="";
                let videoId="";
                if(newUsers.length===0){
                    newSearchTerm="";
                    videoId="";
                }else{
                    newSearchTerm=doc.data().searchTerm;
                    videoId=doc.data().videoId;
                }
                firestore.collection('rooms').doc(roomID).update({
                    users:newUsers,
                    searchTerm:newSearchTerm,
                    videoId
                })    
                .then(()=>{
                    dispatch({type:'LOGOUT_SUCCESS'});
                })
                .catch(terr=>dispatch({type:'LOGOUT_ERROR',err:terr}))
            }
        })
        .catch(err=>dispatch({type:'LOGOUT_ERROR',err}))
    }
}