import React from 'react'
import {Table} from 'semantic-ui-react'
function TableComponent (props) {
  
      const {stage,data,negative}=props
      var name = stage.Name.toLowerCase()
    return (
      
            <Table.Row textAlign='center' negative={negative[stage.QID]}>
                <Table.Cell>{stage.QID}</Table.Cell>
                <Table.Cell>{stage.Name}</Table.Cell>
                <Table.Cell>{data[name]}</Table.Cell>
            </Table.Row>
      
    )
  }



export default TableComponent
