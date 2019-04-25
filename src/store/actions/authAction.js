import Axios from 'axios'

export const logasguest =()=>{
    return(dispatch, getState)=>{
        dispatch({type:'GUEST'})
    }
}
export const errorClear =()=>{
    return(dispatch, getState)=>{
        dispatch({type:'ERRORCLEAR'})
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
export const updateUser = (data)=>{
    return (dispatch, getState,{firebase})=>{
        console.log(data)
        var user = firebase.auth().currentUser
        // user.updateEmail(data.email)
        
        // .then(()=>{
        //     dispatch({type:'UPDATE_EMAIL_SUCCESS'})
        // })
        // .catch((err)=>{
        //     dispatch({type:'UPDATE_EMAIL_ERROR',err})
        // })
        // .then(()=>{
            user.updatePassword(data.password)
        // })
        .then(()=>{
            dispatch({type:'UPDATE_PASS_SUCCESS'})
        })
        .catch((err)=>{
            dispatch({type:'UPDATE_PASS_ERROR',err})
        })
        
    }
}

export const createUser = (user)=>{
    return (dispatch, getState, {firebase})=>{
        
        // const firestore=firebase.firestore()
        firebase.auth().createUserWithEmailAndPassword(
            user.email,
            user.password
        )
        .then(()=>{
            
            Axios.post('http://proj.ruppin.ac.il/bgroup71/prod/api/Customer','='+user.email)
            // return firestore.collection('addresses').add({
            //     userid:resp.user.uid,
            //     country:user.country,
            //     city:user.city,
            //     address:user.address,
            //     phone:user.phone,
            //     company:user.company

            // })
        })
        .then(()=>{
            dispatch({type: 'CREATE_USER'})
            
        }).catch((err)=>{
            dispatch({type: 'CREATE_USER_ERROR',err})
            
        })
        
        
    }
}