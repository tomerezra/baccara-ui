const initState={
    Data:{
        items:{
            name:'items',
            results:[]
        },
        orders:{
            name:'orders',
            results:[]
        },
        shipping:{
            name:'shipping',
            results:[]
        }
    }
}

const dataReducer=(state=initState,action)=>{
    switch (action.type) {
        case 'CREATE_ITEM':
            console.log(action.item)
            break;
        case 'CREATE_ORDER':
            console.log(action.order)
            break;
        case 'CREATE_ADDRESS':
            console.log(action.address)
            break;
        case 'DELETE_ITEM':
            console.log(action.item)
            break;
        case 'DELETE_ORDER':
            console.log(action.order)
            break;
        case 'DELETE_ADDRESS':
            console.log(action.address)
            break;
        
    }
    return state
}
export default dataReducer