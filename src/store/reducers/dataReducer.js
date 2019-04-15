import swal from "sweetalert";

const initState={
    guestdata:{
        gitems:[],
        gorders:[],
        
    },
        items:[],
        orders:[],
        addresses:[],
}

const dataReducer=(state=initState,action)=>{
    switch (action.type) {
        case 'CREATE_ITEM_GUEST':
            swal("Success", "The item has been added", "success");
            console.log(action.item)
            state.items.push(action.item)
            return state               
            
        case 'GET_ADDRESSES':
                            
            return {
                ...state,
                
                addresses:action.addresses,
            }               
        case 'GET_ORDERS':
                            
            return {
                ...state,
                
                orders:action.orders,
                
            }   
        case 'GET_ITEMS':
                            
            return {
                ...state,
                items:action.items,
                
            }   
        case 'CREATE_ITEM':
            swal("Success", "The item has been added", "success");
            return state ;
        case 'CREATE_ITEM_ERROR':
            console.log('create item error',action.err)
            return state;
        case 'CREATE_ORDER':
            console.log(action.order)
            swal("Success", "The order has been sent", "success")
            return state;
        case 'CREATE_ORDER_ERROR':
            console.log('create order error',action.err)
            return state;
        case 'CREATE_ADDRESS':
            console.log(action.address)
            swal("Success", "The address has been added", "success");
            return state;
        case 'CREATE_ADDRESS_ERROR':
            console.log('create address error',action.err)
            return state;
        case 'DELETE_ITEM':
            swal("Success", "The item has been delete", "success")
            return state;
        case 'DELETE_ITEM_ERROR':
                console.log('delete item error',action.err)
            return state;
        case 'DELETE_ADDRESS':
            console.log(action.address)
            return state;
        case 'DELETE_ADDRESS_ERROR':
            console.log('delete address error',action.err)
            return state;
        default:
            return state
    }
    
}
export default dataReducer