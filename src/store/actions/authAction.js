export const logasguest =()=>{
    return(dispatch, getState)=>{
        dispatch({type:'GUEST'})
    }
}

export const signIn = (credentials)=>{
    return (dispatch, getState,{firebase})=>{
        
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )
        .then(()=>{
            dispatch({type:'LOGIN_SUCCESS'})
        })
        .catch((err)=>{
            dispatch({type:'LOGIN_ERROR',err})
        })
        
    }
}
export const signOut = ()=>{
    return (dispatch, getState,{firebase})=>{
        
        firebase.auth().signOut()
        .then(()=>{
            dispatch({type:'SIGNOUT_SUCCESS'})
        })
        .catch((err)=>{
            dispatch({type:'SIGNOUT_ERROR',err})
        })
        
    }
}
export const createUser = (user)=>{
    return (dispatch, getState, {firebase})=>{
        
        const firestore=firebase.firestore()
        firebase.auth().createUserWithEmailAndPassword(
            user.email,
            user.password
        ).then((resp)=>{
            return firestore.collection('users').doc(resp.user.uid).set({
                firstname:user.firstname,
                lastname:user.lastname,
                country:user.country,
                city:user.city,
                address:user.address,
                phone:user.phone,
                company:user.company

            })
        }).then(()=>{
            dispatch({type: 'CREATE_USER'})
        }).catch((err)=>{
            dispatch({type: 'CREATE_USER_ERROR',err})
            
        })
        
        
    }
}