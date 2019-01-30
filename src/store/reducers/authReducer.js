const initState = {
    logedin:false,
    
  }
  
  
  const authReducer = (state=initState , action) => {
    
    switch (action.type) {
      case 'Log Out':
        return {logedin:action.logout}
        
      case 'Log In':
        return {logedin:action.login}
      
        
    }

    return state
  }
  
  
  export default authReducer