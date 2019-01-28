export const navActions = (nav)=>{
    return (dispatch, getState)=>{
        dispatch({type: 'footer',nav})
        
    }
}