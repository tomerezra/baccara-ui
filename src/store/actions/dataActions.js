export const createItem = (item)=>{
    return (dispatch, getState)=>{
        dispatch({type: 'CREATE_ITEM',item})
        
    }
}
export const deleteItem = (item)=>{
    return (dispatch, getState)=>{
        dispatch({type: 'DELETE_ITEM',item})
        
    }
}

export const createOrder = (order)=>{
    return (dispatch, getState)=>{
        dispatch({type: 'CREATE_ORDER',order})
        
    }
}
export const deleteOrder = (order)=>{
    return (dispatch, getState)=>{
        dispatch({type: 'DELETE_ORDER',order})
        
    }
}
export const createAddress = (address)=>{
    return (dispatch, getState)=>{
        dispatch({type: 'CREATE_ADDRESS',address})
        
    }
}
export const deleteAddress = (address)=>{
    return (dispatch, getState)=>{
        dispatch({type: 'DELETE_ADDRESS',address})
        
    }
}