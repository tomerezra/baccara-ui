import swal from '@sweetalert/with-react';


const initState = {
    guest:false,
    authError:null,
    loading:false
    
  }
  
  
  const authReducer = (state=initState , action) => {
    
    switch (action.type) {
      case 'ERRORCLEAR':
        
        return {
            ...state,
            authError:null
      }
      case 'LOADING_TRUE':
        return {
          ...state,
          loading:true
      }
      case 'LOADING_FALSE':
            return {
              ...state,
              loading:false
      }
      case 'GUEST':
        console.log('log in guest')  
        return {
            ...state,
            guest:true
      }
      case 'LOGIN_SUCCESS':
        console.log('log in success')
        swal("Welcome","","success")
        return {
            ...state,
            authError:null,
            guest:false
    }
      case 'LOGIN_ERROR':
          console.log('login error')
          
          return {
            ...state,
            authError:'Error: '+ action.err.message
          }
      
      case 'UPDATE_PASS_SUCCESS':
        console.log('update pass success')  
        swal("Success", "The password has been update", "success");
        return {
            ...state,
            authError:null
            
        }
      case 'UPDATE_PASS_ERROR':
          console.log('update pass error')
          
          return {
              ...state,
              authError:'Error: '+ action.err.message
          }
      case 'SIGNOUT_SUCCESS':
          console.log('signout success')
          return{
            ...state
          }
      case 'CREATE_USER':
          console.log('create user success')
          swal("Welcome","Sign Up Sucsess","success")
          

          return{
            ...state,
            authError:null,
            
          }
      case 'CREATE_USER_ERROR':
          console.log('create user error')
          return{
            ...state,
            authError:'Error: '+  action.err.message
          }
      default:
          return state
    }
  }
  
  export default authReducer