const initState = {
    
    authError:null,
    
  }
  
  
  const authReducer = (state=initState , action) => {
    
    switch (action.type) {
      
      case 'LOGIN_SUCCESS':
        console.log('log in success')  
        return {
            ...state,
            authError:null
    }
      case 'LOGIN_ERROR':
          console.log('log in error')  
          return {
              ...state,
              authError:'Login faild'
          }
      case 'SIGNOUT_SUCCESS':
          console.log('signout success')
          return{
            ...state
          }
      case 'CREATE_USER':
          console.log('create user success')
          return{
            ...state,
            authError:null
          }
      case 'CREATE_USER_ERROR':
          console.log('create user error')
          return{
            ...state,
            authError: action.err.message
          }
      default:
          return state
    }
  }
  
  export default authReducer