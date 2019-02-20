import {
	SET_DISPLAY_NAME,
	GET_DISPLAY_NAME,
	LOG_IN_USER,
	CREATE_USER,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
	SET_USER_AUTH,
	GET_PROFILE_DATA_SUCCESS,
	LOG_IN_USER_SUCCESS,
	CREATE_USER_SUCCESS,
	UPDATE_USER_SUCCESS,
	GET_ALL_USER_SUCCESS,
	GET_USER_SUCCESS, 
	AUTH_REQUEST_SUCCESS,
} from '../constants/Actions';

const INIT_STATE = {
	username: "Dummy DATA",
	displayname: "Dummy DATA",
	joindate: "DD/MM/YYYY",
	mentor: "Dummy DATA",
	electives: [],
	schedule: [],
	accesslevel: "",
	email: "DummyDATA@astro.com.my",
	mentoremail: "DummyDATA@astro.com.my",
	data: "",
	sessionToken: "NULL",
	idToken: "NULL",
	listUser: {},
	isLoggedIn: false,
	status: 0,
}

export default (state=INIT_STATE, action)=>{
	switch(action.type){
		case SET_DISPLAY_NAME:
			return {
				...state,
				displayname: action.payload
			}
		case SET_USER_AUTH:
			return {
				...state,
				accesslevel: action.payload
			}

		case GET_PROFILE_DATA_SUCCESS:
			return {
				...state,
				data: action.payload
			}
		
		case LOG_IN_USER_SUCCESS:
			return {
				...state,
				sessionToken: action.payload.sessionToken,
				idToken: action.payload.idToken,
			}

		case AUTH_REQUEST_SUCCESS:
			return {
				...state,
				isLoggedIn: action.payload,
			}

		case GET_ALL_USER_SUCCESS:
			return {
				...state,
				listUser: action.payload
			}

		case GET_USER_SUCCESS: 
			return {
				...state,
				displayname: action.payload.displayName,
				mentoremail: action.payload.mentorEmail,
				mentor: action.payload.mentorName,
				joindate: action.payload.joinDate,
				electives: action.payload.electives,
				username: action.payload.pK,
				email: action.payload.pK+"@astro.com.my",
				accesslevel: action.payload.role
			}

		case UPDATE_USER_SUCCESS:
			return{
				...state,
				updateuserresponse: action.payload.data
			}

		default:
			return state
	}
}
