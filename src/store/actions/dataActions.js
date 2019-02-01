export const createItem = (item)=>{
    return (dispatch, getState,{getFirebase,getFirestore})=>{
        const firestore = getFirestore()
        const firebase = getFirebase()
        const userid = getState().firebase.auth.uid
        firestore.collection('items').add({
            ...item,
            userid,
            createdAt:new Date()
        })
        .then(()=>{
            dispatch({type: 'CREATE_ITEM',item})
        })
        .catch((err)=>{
            dispatch({type: 'CREATE_ITEM_ERROR',err})
        })
        
    }
}
export const deleteItem = (item)=>{
    return (dispatch, getState,{getFirebase,getFirestore})=>{
        // const firestore=getFirestore()
        // firestore.collection('items').add({
           
        // })
        // .then(()=>{
        //     dispatch({type: 'DELETE_ITEM',item})
        // })
        // .catch((err)=>{
        //     dispatch({type: 'DELETE_ITEM_ERROR',err})
        // })
        
    }
}

export const createOrder = (order)=>{
    return (dispatch, getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore()
        firestore.collection('orders').add({
            ...order,
            
            createdAt:new Date()
        })
        .then(()=>{
            dispatch({type: 'CREATE_ORDER',order})
        })
        .catch((err)=>{
            dispatch({type: 'CREATE_ORDER_ERROR',err})
        })
        
    }
}
export const deleteOrder = (order)=>{
    return (dispatch, getState,{getFirebase,getFirestore})=>{
        // const firestore=getFirestore()
        // firestore.collection('orders').add({
            
        // })
        // .then(()=>{
        //     dispatch({type: 'DELETE_ITEM',order})
        // })
        // .catch((err)=>{
        //     dispatch({type: 'DELETE_ITEM_ERROR',err})
        // })
        
    }
}
export const createAddress = (address)=>{
    return (dispatch, getState,{getFirebase,getFirestore})=>{
        const firestore=getFirestore()
        firestore.collection('addresses').add({
            ...address,
            
            createdAt:new Date()
        })
        .then(()=>{
            dispatch({type: 'CREATE_ADDRESS',address})
        })
        .catch((err)=>{
            dispatch({type: 'CREATE_ADDRESS_ERROR',err})
        })
        
    }
}
export const deleteAddress = (address)=>{
    return (dispatch, getState,{getFirebase,getFirestore})=>{
        // const firestore=getFirestore()
        // firestore.collection('addresses').add({
            
        // })
        // .then(()=>{
        //     dispatch({type: 'DELETE_ITEM',address})
        // })
        // .catch((err)=>{
        //     dispatch({type: 'DELETE_ITEM_ERROR',err})
        // })
        
    }
}