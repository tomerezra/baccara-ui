import React, {Component} from 'react'
import {Table,Header} from 'semantic-ui-react'
import TableComponent from '../TableComponent'
import firebase from 'firebase/app'
import swal from 'sweetalert' 
import {withRouter} from 'react-router-dom'



class ItemDetailsForm extends Component {
state={
    data:[]
}
componentDidMount() {
    firebase.firestore().collection('items').doc(this.props.match.params.id).get()
    .then((doc)=>this.setState({data:doc.data().data}))
    
    .catch(()=>{
        swal('','something worng, try again','error');
        this.props.history.goBack()}
        )
}

    render() {
        return (
            <div>
                <Header textAlign='center'>Item Details</Header>
                <Table celled unstackable compact fixed size='small' textAlign='center'>
                    <Table.Header>
                        <Table.HeaderCell>Stage</Table.HeaderCell>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Value</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {this.state.data.map((stage,i)=>{return <TableComponent key={i} data={stage}/>})}
                    </Table.Body>
                </Table>
            </div>
          )
  }
}

export default withRouter(ItemDetailsForm)



    
   
    
        
  




