import React, { Component } from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withTheme, withStyles } from '@material-ui/core/styles';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import {connect} from 'react-redux';
import {
	setResponseSnackbar
} from '../actions/index';
import { responseSnackbar } from '../themeconfig';

const styles = theme => ({
  success: responseSnackbar.success,
  error: responseSnackbar.error,
  info: responseSnackbar.info,
  warning: responseSnackbar.warning,
  message: {
  	display: 'flex',
    alignItems: 'center',
  },
  icon: {
  	paddingRight: '4px'
  }
});


class ResponseSnackbar extends Component{
	constructor(props){
		super()
		this.state={
		}
		this.handleClose = this.handleClose.bind(this)
	}

	handleClose() {
		this.props.setResponseSnackbar({
			isOpen:false,
			message: "",
			type: "info"
		})
	}


	render(){
		const variantIcon = {
		  success: CheckCircleIcon,
		  warning: WarningIcon,
		  error: ErrorIcon,
		  info: InfoIcon,
		};
		const Icon = variantIcon[this.props.responseSnackbar.type];
		return(
			<React.Fragment>
				{console.log(this.props)}
				<Snackbar
					anchorOrigin={{  vertical:'top', horizontal:'right' }}
					open={this.props.responseSnackbar.isOpen}
					onClose={this.handleClose}
					autoHideDuration={3000}
					ContentProps={{
						'aria-describedby': 'message-id',
					}}				
				>	
					<SnackbarContent 
						className={this.props.classes[this.props.responseSnackbar.type]}
						message={<span id="message-id" className={this.props.classes.message}>
							<Icon fontSize='small' className={this.props.classes.icon}/>{this.props.responseSnackbar.message}
						</span>}
					/>
				</Snackbar>
			</React.Fragment>
		)
	}
}

const mapStateToProps = ({page}) => {
	const {responseSnackbar} = page;
	return{responseSnackbar}
};

export default connect(mapStateToProps, {setResponseSnackbar})(withStyles(styles)(ResponseSnackbar));