const initState={
    nav:'acount'
}

const navReducer=(state=initState,action)=>{
    if (action.type==='footer') {
    
        return {nav:action.nav}
      }
      
      return state
}
export default navReducer