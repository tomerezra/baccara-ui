import swal from "sweetalert";


const initState={
        success:0,
        gitems:[],
        gorders:[],
        
    
        items:[],
        orders:[],
        addresses:[],
}

const dataReducer=(state=initState,action)=>{
    switch (action.type) {
        case 'CREATE_ITEM_GUEST':
            swal("Success", "The item has been added", "success");
            console.log(action.item)
            state.gitems.push(action.item)
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
            console.log(action.item)
            swal("Success", "The item has been added", "success");
            return {
                ...state,
                success:state.success+1
            };
        case 'CREATE_ITEM_ERROR':
            console.log('create item error',action.err)
            swal('','something worng, try again','error');
            return state;
        case 'CREATE_ORDER':
            console.log(action.order)
            swal("Success", "The order has been sent", "success")
            return {
                ...state,
                success:state.success+1
            };
        case 'CREATE_ORDER_ERROR':
            console.log('create order error',action.err)
            swal('','something worng, try again','error');
            return state;
        case 'CREATE_ADDRESS':
            console.log(action.address)
            swal("Success", "The address has been added", "success");
            return {
                ...state,
                success:state.success+1
            };
        case 'CREATE_ADDRESS_ERROR':
            console.log('create address error',action.err)
            swal('','something worng, try again','error');
            return state;
        case 'UPDATE_ADDRESS':
            swal("Success", "The address has been update", "success");
            return {
                ...state,
                success:state.success+1
            };
        case 'UPDATE_ADDRESS_ERROR':
            console.log('update address error',action.err)
            swal('','something worng, try again','error');
            return state;
        case 'DELETE_ITEM':
            
            swal("Success", "The item has been deleted", "success")
            return {
                ...state,
                items:action.items,
                
            };
        case 'DELETE_ITEM_ERROR':
            console.log('delete item error',action.err)
            swal('','something worng, try again','error');
            return state;
        case 'DELETE_ADDRESS':
            
            swal("Success", "The address has been deleted", "success")
            return {
                ...state,
                
                addresses:action.addresses,
            };
        case 'DELETE_ADDRESS_ERROR':
            console.log('delete address error',action.err)
            swal('','something worng, try again','error');
            return state;
        default:
            return state
    }
    
}
export default dataReducer