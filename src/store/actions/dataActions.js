import Axios from 'axios'

export const getCitys=()=>{
    return(dispatch)=>{
        var citys=[]
        Axios.get('http://proj.ruppin.ac.il/bgroup71/prod/api/City')
        .then(res=> citys=res.data.map(city=>{return{text:city.Name,value:city.Name}}))
        .then(()=>{
            dispatch({type: 'GET_CITYS',citys})
        })
        .catch((err)=>{
            dispatch({type: 'GET_ALL_DATA_ERROR',err})
        })
    }
}



export const getAddresses = ()=>{
    return (dispatch, getState,{firebase})=>{
        var addresses=[]
        
        const userid =firebase.auth().currentUser.email
        Axios.get('http://proj.ruppin.ac.il/bgroup71/prod/api/Address/5?email='+userid)
          .then(res=>addresses=res.data)
        
        .then(()=>{
            
            dispatch({type: 'GET_ADDRESSES',addresses})
            
        })
        .catch((err)=>{
            dispatch({type: 'GET_ALL_DATA_ERROR',err})
            
        })
        
    }
}
export const getOrders = ()=>{
    return (dispatch, getState,{firebase})=>{
        var orders=[]
        
        const userid =firebase.auth().currentUser.email
        
        Axios.get('http://proj.ruppin.ac.il/bgroup71/prod/api/Order?email='+userid)
          .then(res=>orders=res.data)
        .then(()=>{
            dispatch({type: 'GET_ORDERS',orders})
            
        })
        .catch((err)=>{
            dispatch({type: 'GET_ALL_DATA_ERROR',err})
            
        })
        
    }
}
export const getItems = ()=>{
    return (dispatch, getState,{firebase})=>{
        var items=[]
        
        const userid =firebase.auth().currentUser.email
        
        Axios.get('http://proj.ruppin.ac.il/bgroup71/prod/api/Items?email='+userid)
          .then(res=>items=res.data)
        
        .then(()=>{
            dispatch({type: 'GET_ITEMS',items})
            
        })
        .catch((err)=>{
            dispatch({type: 'GET_ALL_DATA_ERROR',err})
            
        })
        
    }
}

export const createItem = (item)=>{
    return (dispatch, getState,{firebase})=>{
        // const firestore = firebase.firestore()
        
        Axios.post('http://proj.ruppin.ac.il/bgroup71/prod/api/Items',JSON.stringify(item),{headers: { "Content-Type": "application/json" }})
        // const userid = getState().firebase.auth.uid
        // firestore.collection('items').add({
        //     ...item,
        //     userid,
        //     createdAt:new Date()
        // })
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
        
        Axios.delete('http://proj.ruppin.ac.il/bgroup71/prod/api/Items?id='+item.ItemID)
        .then(()=>{
            dispatch(getItems())
        })
        
        .then(()=>{
            
            dispatch({type: 'DELETE_ITEM'})
        })
        .catch((err)=>{
            dispatch({type: 'DELETE_ITEM_ERROR',err})
        })
        
    }
}

export const createOrder = (order)=>{
    return (dispatch, getState,{firebase})=>{
        // const firestore=firebase.firestore()
        // const userid =firebase.auth().currentUser.email
        // firestore.collection('orders').add({
        //     ...order,
        //     userid,
        //     createdAt:new Date(),
        //     status:'Send to sales man'
        // })
        
        Axios.post('http://127.0.0.1:8080/api/Order',JSON.stringify(order),{headers: { "Content-Type": "application/json" }})
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
        // const firestore=firebase.firestore()
        // const userid = getState().firebase.auth.uid
        // firestore.collection('addresses').add({
        //     ...address,
        //     userid,
        //     createdAt:new Date()
        // })
        Axios.post('http://proj.ruppin.ac.il/bgroup71/prod/api/Address',JSON.stringify(address),{headers: { "Content-Type": "application/json" }})
        .then(()=>{
            dispatch({type: 'CREATE_ADDRESS',address})
            
        })
        .catch((err)=>{
            dispatch({type: 'CREATE_ADDRESS_ERROR',err})
           
        })
        
    }
}
export const updateAddress = (address,id)=>{
    return (dispatch, getState,{firebase})=>{
        
        Axios.put('http://proj.ruppin.ac.il/bgroup71/prod/api/Address?id='+id,JSON.stringify(address),{headers: { "Content-Type": "application/json" }})
        .then(()=>{
            dispatch({type: 'UPDATE_ADDRESS',address})
            
        })
        .catch((err)=>{
            dispatch({type: 'UPDATE_ADDRESS_ERROR',err})
           
        })
        
    }
}
export const deleteAddress = (address)=>{
    return (dispatch, getState,{firebase})=>{
        
        Axios.delete('http://proj.ruppin.ac.il/bgroup71/prod/api/Address?id='+address.ID)
        .then(()=>{
            dispatch(getAddresses())
            
        })
       
        .then(()=>{
            dispatch({type: 'DELETE_ADDRESS'})
        })
           
        .catch((err)=>{
            dispatch({type: 'DELETE_ADDRESS_ERROR',err})
        })
        
    }
}

