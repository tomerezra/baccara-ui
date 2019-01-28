import React,{Component} from 'react'
import swal from'@sweetalert/with-react'
import {Button} from 'semantic-ui-react'
import Parts from '../data/parts'
class Question extends Component{
    state={
        data:{}
    }
    makebuttons=(option)=>{
        return(
            <Button
                content={option}
                >
    
            </Button>
        )
    }
  componentDidMount(){
      this.setState({data:Parts})
  }
    render(){
        alert('yyy')
        console.log(this.state.data)
    return (
        swal(
            <div>
                {/* <h1>{part.name}</h1>
                <p>{part.question}</p>
                {part.options.map(option=>this.makebuttons(option)) } */}
            </div>
        )
      )
  
  }
    
    
}


export default Question
