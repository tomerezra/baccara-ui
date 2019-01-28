const initState = {
    logedin:true,
    
  }
  
  
  const authReducer = (state=initState , action) => {
    
    if (action.type==='Log Out') {
      console.log('aa')
      return {logedin:action.logout}
    }
    if (action.type==='Log In') {
      console.log('bb')
      return {logedin:action.login}
    }
    
    
    return state
  }
  
  
  export default authReducer