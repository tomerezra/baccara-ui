const initState={
    users:[]
}
const usersReducer=(state=initState,action)=>{
    if (action.type==='CREATE_USER') {
    
        console.log('create user',action.user)
      }
      
    return state
}
export default usersReducer