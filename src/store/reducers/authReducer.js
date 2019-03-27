const initState = {
    guest:false,
    authError:null,
    
  }
  
  
  const authReducer = (state=initState , action) => {
    
    switch (action.type) {
      case 'GUEST':
        console.log('log in guest')  
        return {
            ...state,
            guest:true
    }
      case 'LOGIN_SUCCESS':
        console.log('log in success')  
        return {
            ...state,
            authError:null,
            guest:false
    }
      case 'LOGIN_ERROR':
          console.log('log in error')  
          return {
              ...state,
              authError:'Login faild'
          }
      case 'UPDATE_EMAIL_SUCCESS':
        console.log('update email success')  
        return {
            ...state,
            authError:null
            
    }
      case 'UPDATE_EMAIL_ERROR':
          console.log(action.err.message)  
          return {
              ...state,
              authError:'Update email faild'
          }
          case 'UPDATE_PASS_SUCCESS':
        console.log('update pass success')  
        return {
            ...state,
            authError:null
            
    }
      case 'UPDATE_PASS_ERROR':
          console.log(action.err.message)  
          return {
              ...state,
              authError:'Update pass faild'
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