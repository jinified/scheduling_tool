import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
// to do check box 
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// to do API 
import {
    setNotificationSnackbar,
} from '../../../../actions/index'; 

class ChooseElectives extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: [],
            monthsLeft :10,
        } 
    }

    //when module is select, monthsLeft will change 
    //the module will be ticked 
  	handleChange = event => () => {
		const { checked } = this.state;
		const currentIndex = checked.indexOf(event.name);
        const newChecked = [...checked];

		if (currentIndex === -1) { 
            if (this.state.monthsLeft>=event.duration){
                newChecked.push(event.name);
                this.setState({monthsLeft: this.state.monthsLeft - event.duration})
            }
            else{
                    this.props.setNotificationSnackbar({isOpen: true, message:(<span>You have not enough credit to choose the module. Please unselect some to release more credits.</span>)})
            }
		} else {
			this.setState({monthsLeft: parseInt(event.duration, 10) + this.state.monthsLeft})
		  	newChecked.splice(currentIndex, 1)
		}
		this.setState({
		  checked: newChecked,
		});
		
    }
    
    onClickButton = e => {
        e.preventDefault();
        this.props.moduleList(this.state.checked)
    }

    onCancelButton = e => {
        e.preventDefault();
        this.props.moduleList()
    }
    
    render() {
        const {classes} = this.props
        return(
        <div> 
            <div>
                <Typography variant='body1' style={{margin:'10px 0'}}>
                    <span>Minimum required months are 11. Please select up to 4-5 preferred modules.</span>
                </Typography>
            </div>
            <div style={{display:'flex', float:'right'}}>
                <Typography variant='body1' style={{textAlign:'right', paddingTop:10, paddingRight:10}}>
                    <span>Months Left</span>
                </Typography>
                <Typography variant='body1' style={{textAlign:'right', fontWeight:'bold', color:'white', padding:10, backgroundColor:'#112E51'}}>
                <span>{this.state.monthsLeft}</span>
                </Typography>
            </div>
            <div style={{textAlign: 'left', paddingTop: '50px'}} >
                <FormControl>
                    <FormLabel>
                        <FormGroup column>
                            {this.props.rotations.rotations.map(item =>{
                                if (item.data == 'elective'){
										return(
                                <FormControlLabel control=
                                    {
                                        <Checkbox 
                                            checked={this.state.checked.indexOf(item.name) !== -1}
                                            tabIndex={-1}
                                        />
                                    }
                                    onChange={this.handleChange(item)}
                                    label={
                                        <span>
                                            {item.name+' '+'('+item.duration+')'}
                                        </span>
                                    }
                                />
                            )}
                            })}
                        </FormGroup>
                    </FormLabel>
                </FormControl>
            </div>
            <div>
                <Button onClick={this.onCancelButton.bind(this)} style={{float: 'right', margin:10}}>
                    Cancel
                </Button>
                <Button disabled={this.state.monthsLeft > 1}  onClick={this.onClickButton.bind(this)} style={{float: 'right', margin:10}} >
                    Submit Choices
                </Button>
            </div>
        </div>
    );
    }
}

const mapStateToProps = ({rotation}) => {
    const {rotations} = rotation
    return{rotations}
};

export default connect(mapStateToProps, {setNotificationSnackbar})(withStyles()(ChooseElectives));