import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
} from '../../../actions/index';
import axios from 'axios';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Import API
import {
	getAllUser,
	getAllSchedule
} from '../../../actions/index';

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
		borderRadius: 12,
	},
	row: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.background.default,
		},
	},
	redText: {
		color: 'red'
	},
	overflowXTable: {
		overflowX: 'auto'
	}
});

class CustomizedTable extends Component {
	constructor(props) {
		super(props)
		this.state = {
			classes: props.classes,
			listUser: {},
			allSchedule: [],
		}
	}

	componentDidMount(){
		this.props.getAllUser()
		this.props.getAllSchedule();
	}

	componentDidUpdate(prevProps,prevState){
		if(this.props.listUser !=prevProps.listUser || this.state.listUser !=prevState.listUser){
			this.setState({
				...this.state,
				listUser: this.props.listUser.rotations,
				listUserLength: this.props.listUser.rotations.length
			})
		}
		if (this.props.allSchedule && prevState.allSchedule != this.props.allSchedule && this.props.allSchedule.length > 0){
			this.setState({
				...this.state,
				allSchedule: this.props.allSchedule,
				allScheduleLength: this.props.allSchedule.length
			})
		}
	}

	filteredUser(username){
		if(this.state.allScheduleLength>0){
			let filteredUser = this.state.allSchedule[0][username]
			return filteredUser
		}
	}

	findNextRotation(username) {
		let currentDate = new Date().toISOString().split('T')[0]

		// Obtain filtered user
		let filteredUserValue = this.filteredUser(username)

		// Find current rotation object
		if (filteredUserValue){
			let filteredEndDate = filteredUserValue.filter(f => f.endDate >= currentDate)[0]['endDate']	
	
			// Index of current rotation object
			let index = filteredUserValue.findIndex(index => index.endDate ===filteredEndDate)
	
			// Next rotation ID and Start Date
			if (filteredUserValue[index+1]){
				let nextRotationID = filteredUserValue[index+1].rotationId
				let nextRotationStartDate = filteredUserValue[index+1].startDate
				return [nextRotationID,nextRotationStartDate]
				
			}
			// If no next rotation info
			else {
				let nextRotationID = 'NIL'
				let nextRotationStartDate = filteredEndDate
				return [nextRotationID,nextRotationStartDate]
			}
		}
		// If no username / filteredUserValue
		else {
			let nextRotationID = 'Error'
			let nextRotationStartDate = 'Error'
			return [nextRotationID, nextRotationStartDate]
		}	
	}

	render(){
		const classes = this.state.classes;
		const renderInfo = (this.state.listUserLength>0 && this.state.allScheduleLength>0) ? (
			<Paper className={classes.overflowXTable}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Username</TableCell>
							<TableCell>Display Name</TableCell>
							<TableCell>Join Date</TableCell>
							<TableCell>Next Rotation</TableCell>
							<TableCell>Next Rotation Start Date</TableCell>
							<TableCell>Starting In</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{this.state.listUser.filter(user=> user.role === 'regular').map((row,index) => {

							// Time
							let current_date = Date.now()
							let next_startdate = new Date(this.findNextRotation(row.pK)[1]).getTime()
							let days_to_start = Math.ceil((next_startdate - current_date) / (1000 * 60 * 60 * 24))
							let starting_in = days_to_start.toString() + ' day' + (days_to_start > 1 ? 's' : '')
							if (days_to_start >= 30) {
								let month = Math.round(days_to_start / 30 * 10) / 10
								starting_in = month.toFixed(1) + ' month' + (month > 1 ? 's' : '')
							}
						
							return (
								<TableRow key={index}>
									<TableCell component="th" scope="row">{row.pK}</TableCell>
									<TableCell>{row.displayName}</TableCell>
									<TableCell>{row.joinDate}</TableCell>
									<TableCell className={this.findNextRotation(row.pK)[0]===('NIL'||'ERROR') ? classes.redText: ''}>{this.findNextRotation(row.pK)[0]}</TableCell>
									<TableCell className={days_to_start > 10 ? '' : classes.redText}>{this.findNextRotation(row.pK)[1]}</TableCell>
									<TableCell className={days_to_start > 10 ? '' : classes.redText}>{starting_in}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</Paper>
		):(
		<Paper className={classes.overflowXTable}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Username</TableCell>
						<TableCell>Display Name</TableCell>
						<TableCell>Join Date</TableCell>
						<TableCell>Next Rotation</TableCell>
						<TableCell>Next Rotation Start Date</TableCell>
						<TableCell>Starting In</TableCell>
					</TableRow>
				</TableHead>
			</Table>
		</Paper>)

		return (
			<div>{renderInfo}</div>
		);
	}
	
}

CustomizedTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({auth,schedule}) => {
	const {listUser} = auth;
	const {allSchedule} = schedule;
	return {listUser,allSchedule}
};

export default connect(mapStateToProps, {getAllSchedule,getAllUser})(withStyles(styles)(CustomizedTable));