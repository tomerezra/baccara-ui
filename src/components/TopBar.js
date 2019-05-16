import React, { Component } from 'react'
import swal from '@sweetalert/with-react'
import {Search,Table,Icon} from 'semantic-ui-react';
import {signout} from '../store/actions/authAction'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
export class TopBar extends Component {
    state = {
        isLoading: false,
        results: [],
        value: ""
      };
     
      componentWillMount() {
        this.resetComponent()
      }
      getResults = (result,name)=>{
        return result.map(obj=>{
          if (name==='Orders') {
            return {obj,title:obj.OrderId}
          } else {
            return {obj,title:obj.ItemName}
          }
          })
      }
      
      resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })
      
      handleResultSelect = (e,{result}) => {
        const tmp = []
        var header
        
        for (const key in result.obj) {
              if (key==='Address'||key==='Quantity') {
                
              }
              else{
                if (key==='IsStandard') {
                  header = 'Item'
                  tmp.push(
                    <Table.Row>
                      <Table.Cell>{key}</Table.Cell>
                      <Table.Cell>{(key,result.obj[key])?'Yes':'No'}</Table.Cell>
                    </Table.Row>
                  )
                }
                else if (key==='Part') {
                  header= 'Order'
                  tmp.push(
                    <Table.Row>
                    <Table.Cell>Items</Table.Cell>
                    <Table.Cell>{(key,result.obj[key].length)}</Table.Cell>
                  </Table.Row>
                  )
                  
                }
                // else if (key==='createdAt') {
                //   tmp.push(
                //     <Table.Row>
                //       <Table.Cell>{key}</Table.Cell>
                //       <Table.Cell>{(key,moment(result.obj[key].toDate()).calendar())}</Table.Cell>
                //     </Table.Row>
                    
                //   )
                // }
                else tmp.push(
                  <Table.Row>
                    <Table.Cell>{key}</Table.Cell>
                    <Table.Cell>{(key,result.obj[key])}</Table.Cell>
                  </Table.Row>
                )
              }
                
            }
              
        
      swal(
          <div>
            <Table celled unstackable compact fixed size='small' >
            <Table.Header >
              <Table.Row textAlign='center'>
                <Table.HeaderCell  colSpan='2'>{header}</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
              <Table.Body>
                {tmp}
              </Table.Body>
            </Table>
            
          </div>
          )
        this.setState({value:result.title})}
      
      handleSearchChange = (e, { value }) => {
        
        this.setState({ isLoading: true, value })
      
        setTimeout(() => {
          if (this.state.value.length < 1) return this.resetComponent()
          const {data} =this.props
          const re = new RegExp(this.state.value,'i')
          
          const tmp=[]
          
          for (let i = 1; i < 3; i++) {
            if (i===1) {
              const result = data.items.filter(item=>(re.test(item.ItemName)))
              if (result.length>0) {
                tmp.push(
                  {
                  name:'Items',
                  results:this.getResults(result,'Items')
                  }
                )
              }
            }
            else if (i===2) {
              const result = data.orders.filter(order=>(re.test(order.OrderId)))
              if (result.length>0) {
                tmp.push(
                  {
                  name:'Orders',
                  results:this.getResults(result,'Orders')
                  }
                )
              }
            }
            // else{
            //   const result = data.addresses.filter(address=>(re.test(address.address)))
            //   if (result.length>0) {
            //     tmp.push(
            //       {
            //       name:'Addresses',
            //       results:this.getResults(result)
            //       }
            //     )
            //   }
              
            // }
            }
      
            
          this.setState({
            isLoading: false,
            results: tmp,
          })
        }, 300)
      }

  render() {
      
    const {auth}=this.props
    return (
        <div className='appbar' style={{display:this.props.location.pathname==='/'?'none':this.props.location.pathname==='/login'?'none':''}}>
            <div className='a'>
            <Icon
            name='arrow circle left'
            className='back'
            size='large'
            style={{display:auth.uid?'':'none'}} 
            onClick={()=>{
              if (this.props.location.pathname==='/acount') {  
              }
              else this.props.history.goBack()}}>

            </Icon>
            </div>
           
            <div className='c'>
            <Search 
                
                placeholder='Search...' 
                style={{display:auth.uid?'':'none'}}
                category
                loading={this.state.isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={this.handleSearchChange}
                results={this.state.results}
                value={this.state.value}
                {...this.props}
                >
            </Search>
            </div>
           
            <div className='b'>
                <button  
                className='logout'
                onClick={()=>this.props.signout()} 
                style={{display:auth.uid?'':'none'}}
                >
                Log Out</button>
            </div>
            

      </div>
    )
  }
}
const mapStateToProps = (state) => {
  
    return{
          
          auth:state.firebase.auth,
          data:state.data
      }
      
    }
const mapDispatchToProps =(dispatch)=> {
      return{
        
        signout:()=>dispatch(signout())
      }
      
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(TopBar)) 

