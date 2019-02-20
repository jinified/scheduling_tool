// Author: Brianna Chang
// Reviewer: Ahmad Akmaluddin
// Notes: Moved variable to be handle by state and sagas, to be added to apis i believe 


import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {
} from '../../../actions/index';
import Typography from '@material-ui/core/Typography';
// help icon
//import Tooltip from '../../../components/Tooltip'
import Tooltip from '@material-ui/core/Tooltip'
import HelpIcon from '@material-ui/icons/Help';
//show button 
import Button from '@material-ui/core/Button';
// show module selection page 
import ChooseElectives from './components/chooseElectives'; 
// tocall API
//get userID & electives from loaded credentials
import {
	updateUser,
	getAllRotations,
	getUser,
	setNotificationSnackbar
} from '../../../actions/index'; 
//configure date to show edit choices button 
import moment from "moment"

const styles = theme => ({

	// design for cards 
	card: {
		display: 'flex',
		width: 230,
		height: 50,
		marginLeft: 10,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	// arrangement for module cards 
	arrangedCard: {
		display:'flex', 
		flexWrap:'wrap',
		justifyContent: 'center',
	},
	//for tooltip
	tooltip: {
		maxWidth: 220,
		},
	});

//user data 
var userData = {
	'data': '',
	'displayName': '',
	'joinDate': '',
	'electives': [],
	'status': 'active',
	'mentorName':'',
	'mentorEmail': ''
}



class ElectiveCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			electives: this.props.electives, 
			// a mode to switch between pages 
			editMode: false, 
			showEditButton: true,  
			rotations: [],
			submittedList: []
		}
	}
	componentDidMount(){
		const duedate = moment(this.props.joindate).add(84, 'days').format("YYYY-MM-DD");
		if (moment(duedate).isBefore(moment())){
			this.setState({showEditButton: false})
		}
		this.props.getAllRotations()
		this.setState({electives:this.props.electives})
	}

	componentDidUpdate(prevProps){
		// update electives list whenever new list is received
		if (prevProps.rotations != this.props.rotations){
			// update rotation list whenever new list is received
			this.setState({
				...this.state,
				rotations:this.props.rotations.rotations
			})
		}
	}

	//get a dictionary that has the name of the modules and the duration to be spent in the modules  
	getModuleDictionary=(module)=>{
		var dict = []
		for (var single in module){
			this.state.rotations.map(item=>{
				if (module[single]==item.pK){
					dict.push(
						{
						name: item.name,
						weight: item.duration,
					}
					)
				}
			}
			)
		}
		console.log('Dictionary created for',module, ':', dict)
		return(dict)
	}
	// when edit choices button is hit, change the editButtonHit to true to show mod selection page
	onChange = () => {
		this.setState({editMode:true})
	}

	//update new module list and send to updateUser
	updateModuleList = list => {
		//empty list to store all the selected electives id 
		var rot_id =[]
		//turn off editMode
		this.setState({editMode: false})
		// if list passed is null, meaning they cancel submission 
		// then we dont process
		if (list){
			console.log('User has submitted the choices:',list)
			// change the list into rotations ID 
			for (var i in list){
				this.state.rotations.map(check=>{
					if (list[i] == check.name){
						rot_id.push(check.pK)
					}
				}
				)
			}
			console.log('list of rotation id for',list, 'is:', rot_id)
			//in the case when user just click submit without changing anything, we dont need to update db again. 
			if (JSON.stringify(rot_id.sort()) === JSON.stringify(this.state.electives.sort())){
				console.log('User has selected the same set of choices.')
			}
			else{
				userData = {
					'data': 'active#2017-09-04',
					'displayName': this.props.displayname,
					'joinDate': this.props.joindate,
					'electives':rot_id,
					'schedule': [],
					'status': 'active',
					'mentorName':this.props.mentor,
					'mentorEmail': this.props.mentorEmail
				}
				this.setState({submittedList:rot_id})
				this.props.updateUser(this.props.username, userData)
			}
		}
		else{
			console.log('User did not select their choices.')
		}
		console.log('Updated user data list:', userData)
	}

	render() {
		if(this.props.updateuserresponse == 200){
			if (JSON.stringify(this.state.electives.sort()) === JSON.stringify(this.state.submittedList.sort())){
			}
			else {
				this.setState({electives:this.state.submittedList})
			}
		}
		const {classes} = this.props
		const dict =this.getModuleDictionary(this.state.electives)
		//determine which page to show, use emptyModList 
		return(
			<div>
				<Card>
					<CardContent style={{textAlign: 'center'}}>
						<div>
							<Typography variant='body2'>
									<span>
										Core Modules
										<Tooltip 
										title='The number indicates the number of months spent in the rotation'
										classes={{ tooltip: classes.tooltip }}
										>
										<HelpIcon
										style={{
											fontSize:'21px',
										paddingTop: '10px'
										}}/>
										</Tooltip>
									</span>
							</Typography>
						</div>
						<div>
							<div className={classes.arrangedCard}>
								{this.state.rotations.map(mod => {
									if (mod.data == 'core'){
										return(
										<Card className={classes.card} key={mod}>
												<CardContent>
													<Typography variant='body1'>
														{mod.name} ({mod.duration})
													</Typography>
												</CardContent>
										</Card>); 
									}
								})}
							</div>
						</div>
						<div>
							<Typography variant='body2' style={{marginTop:40}}>
									<span>
										Elective Modules
									</span>
							</Typography>
						</div>
						<div>
							{this.state.editMode 
								? <ChooseElectives moduleList={this.updateModuleList.bind(this)} />
								: 
								<div>
									<div className={classes.arrangedCard}>
										{dict.map(elect => {
											return(
												<Card className={classes.card} key={elect}>
													<div>
														<CardContent>
															<Typography variant='body1'>
																{elect.name} ({elect.weight})
															</Typography>
														</CardContent>
													</div>
												</Card>); 
										})}
									</div>
									<div style={{paddingTop:20}}>
										<Button diasbled={!this.state.showEditButton} onClick={this.onChange} style={{float: 'right'}}>
											Edit Choices
										</Button>
									</div> 
								</div>
							}
						</div>
					</CardContent>
				</Card>
			</div>
	)
}
};


const mapStateToProps = ({auth, rotation}) => {
	const {displayname, joindate, electives, mentoremail, mentor, username, updateuserresponse} = auth
	const {rotations} = rotation
  return{displayname, joindate, electives, mentoremail, mentor, username, rotations, updateuserresponse}
};

export default connect(mapStateToProps, {getUser, updateUser, getAllRotations,setNotificationSnackbar})(withStyles(styles)(ElectiveCard));