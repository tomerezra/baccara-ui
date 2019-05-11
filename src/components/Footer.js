import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import {Icon,Button} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

const styles = {
  root: {
    width:'100%',
    position:'fixed',
    bottom:0,
    borderTopColor:'grey',
    borderTopWidth:2,
    borderWidth:0,
    borderStyle:'solid',
    zIndex:10,
    
    
    
  },
};

class Footer extends React.Component {
  state = {
    
  };
  addButton=()=>{
    const visible=this.props.location.pathname
    if (visible==='/orders'||visible==='/items'||visible==='/shipping') {
        return ''
    }
    else return 'none'
}

handleClickAdd=()=>{
    
    if (this.props.location.pathname==='/orders') {
        this.props.history.push('/createorder/0')
        
    }
    else if (this.props.location.pathname==='/items') {
        this.props.history.push('/builditem')
        
    }
    else if (this.props.location.pathname==='/shipping') {
        this.props.history.push('/newaddress/0')
        
    }
    
  }
  handleChange = (event, value) => {

        this.props.history.push(value)
    }
    
  

  render() {
    const { classes } = this.props;
    
    
    return (
      <BottomNavigation value={this.props.location.pathname} onChange={this.handleChange} className={classes.root} style={{display:this.props.auth.uid?'':'none'}}>
        <BottomNavigationAction label="Orders" value="/orders" icon={<Icon name='clipboard list' size='large'/>}/>
        <BottomNavigationAction label="Items" value="/items" icon={<Icon name='barcode' size='large' />} />
        <BottomNavigationAction label="Shipping" value="/shipping" icon={<Icon name='shipping' size='large'/>} />
        <BottomNavigationAction label="Acount" value="/acount" icon={<Icon name='user' size='large'/>} />
        
        
        <Button 
                circular 
                size='large'
                icon='add'
                style={{bottom:'5%',left:'45%',position:'fixed',display:this.addButton()}}
                onClick={this.handleClickAdd}
                >
            </Button>
      </BottomNavigation>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
    return{
        
        auth:state.firebase.auth
    }
    
  }
 
  const mapDispatchToProps =(dispatch)=> ({
    
  })
  
export default withRouter(withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(Footer)))