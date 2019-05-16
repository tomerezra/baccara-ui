import Axios from 'axios'
import { getAddresses, getItems, getOrders, getCitys } from './dataActions';


export const logAsGuest =()=>{
    return(dispatch, getState)=>{
        dispatch(getCitys())
        dispatch({type:'GUEST'})
    }
}
export const Loading =()=>{
    return(dispatch, getState)=>{
        if (getState().auth.loading) {
            dispatch({type:'LOADING_FALSE'})
        } else {
            dispatch({type:'LOADING_TRUE'})
        } 
        
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
            
            dispatch(getAddresses())
            dispatch(getItems())
            dispatch(getOrders())
            dispatch(getCitys())
        })
        .then(()=>{
                       
            dispatch({type:'LOGIN_SUCCESS'})
                       
        })
        
        .catch((err)=>{
            dispatch({type:'LOGIN_ERROR',err})
        })
        
    }
}
export const signout = ()=>{
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
        
        var user = firebase.auth().currentUser
        user.updatePassword(data.password)
        
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

        firebase.auth().createUserWithEmailAndPassword(
            user.email,
            user.password
        )
        .then(()=>{
            
            Axios.post('http://proj.ruppin.ac.il/bgroup71/prod/api/Customer','='+user.email)
         
        })
        .then(()=>{
            dispatch(getAddresses())
            dispatch(getItems())
            dispatch(getOrders())
            dispatch(getCitys())
        })
        .then(()=>{
            dispatch({type: 'CREATE_USER'})
            
        }).catch((err)=>{
            dispatch({type: 'CREATE_USER_ERROR',err})
            
        })
        
        
    }
}
export const logWithProvider = (prov)=>{
    return (dispatch,getState, {firebase})=>{
        var provider
        if (prov==='google') {
            provider =  new firebase.auth.GoogleAuthProvider();
        } 
        else if(prov==='facebook') {
            provider = new firebase.auth.FacebookAuthProvider();
        }
        firebase.auth().signInWithPopup(provider)
        
        .then((result) =>{
            
            if (result.additionalUserInfo.isNewUser) {
                Axios.post('http://proj.ruppin.ac.il/bgroup71/prod/api/Customer','='+result.user.email)
            }
            
                
        })
        .then(()=>{
            dispatch(getAddresses())
            dispatch(getItems())
            dispatch(getOrders())
            dispatch(getCitys())
        })
        .then(()=>{
            dispatch(Loading())
            dispatch({type: 'LOGIN_SUCCESS'})
            
        }).catch((err)=>{
            dispatch(Loading())
            dispatch({type: 'LOGIN_ERROR',err})
            
        })
        
        
    }
}