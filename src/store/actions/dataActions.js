export const createItem = (item)=>{
    return (dispatch, getState,{firebase})=>{
        const firestore = firebase.firestore()
        
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
export const createitemguest=(item)=>{
    return (dispatch)=>{
        dispatch({type:'CREATE_ITEM_GUEST',item})
    }
}
export const deleteItem = (item)=>{
    return (dispatch, getState,{firebase})=>{
        const firestore=firebase.firestore()
        firestore.collection('items').doc(item.id).delete()
        
        .then(()=>{
            dispatch({type: 'DELETE_ITEM',item})
        })
        .catch((err)=>{
            dispatch({type: 'DELETE_ITEM_ERROR',err})
        })
        
    }
}

export const createOrder = (order)=>{
    return (dispatch, getState,{firebase})=>{
        const firestore=firebase.firestore()
        const userid = getState().firebase.auth.uid
        firestore.collection('orders').add({
            ...order,
            userid,
            createdAt:new Date(),
            status:'Send to sales man'
        })
        .then(()=>{
            dispatch({type: 'CREATE_ORDER',order})
        })
        .catch((err)=>{
            dispatch({type: 'CREATE_ORDER_ERROR',err})
        })
        
    }
}

export const createAddress = (address)=>{
    return (dispatch, getState,{firebase})=>{
        const firestore=firebase.firestore()
        const userid = getState().firebase.auth.uid
        firestore.collection('addresses').add({
            ...address,
            userid,
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
    return (dispatch, getState,{firebase})=>{
        const firestore=firebase.firestore()
        firestore.collection('addresses').doc(address.id).delete()
        .then(()=>{
            dispatch({type: 'DELETE_ADDRESS',address})
        })
        .catch((err)=>{
            dispatch({type: 'DELETE_ADDRESS_ERROR',err})
        })
        
    }
}
export const standard = (item)=>{
    return (dispatch, getState,{firebase})=>{
        const firestore = firebase.firestore()
        
        
        firestore.collection('standard').add({
            
            id:item.id,
            value:item.value.toString(),
            parent:item.parent.toString()
            
            
        })
        .then(()=>{
            alert('ok')
            
        })
        .catch((err)=>{
            alert(err)
            
        })
        
    }
    
}
export const getstandard = ()=>{
    return (dispatch, getState,{firebase})=>{
        const firestore = firebase.firestore()
        
        
        firestore.collection('standard').get()
        
        .then(snapshot => {
            snapshot.forEach(doc => {
              console.log(new RegExp (doc.data().value),'i');
            });
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
        
    }
}