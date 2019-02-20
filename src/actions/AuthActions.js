import {
	SET_DISPLAY_NAME,
	GET_DISPLAY_NAME,
	LOG_IN_USER,
	LOG_IN_USER_SUCCESS,
	CREATE_USER,
	CREATE_USER_SUCCESS,
	UPDATE_USER,
	UPDATE_USER_SUCCESS,
	SET_USER_AUTH,
	GET_PROFILE_DATA,
	GET_PROFILE_DATA_SUCCESS,
	GET_ALL_USER,
	GET_ALL_USER_SUCCESS,
	LOG_OUT_USER,
	GET_USER,
	GET_USER_SUCCESS,
	AUTH_REQUEST,
	AUTH_REQUEST_SUCCESS,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS
} from '../constants/Actions';

export const setDisplayName = (name) => {
	return {
		type: SET_DISPLAY_NAME,
		payload: name
	}
}

export const setUserAuth = (authlevel) => {
	return {
		type: SET_USER_AUTH,
		payload: authlevel
	}
}

export const getProfileData = (data) => {
	return {
		type: GET_PROFILE_DATA,
		payload: data
	}
}

export const getProfileDataSuccess = (data) => {
	return {
		type: GET_PROFILE_DATA_SUCCESS,
		payload: data
	}
}

export const loginUser = (username, password) => {
	return {
		type: LOG_IN_USER,
		payload: {username, password}
	}
}

export const loginUserSuccess = (token) => {
	return {
		type: LOG_IN_USER_SUCCESS,
		payload: token
	}
}

export const updateUser = (userid, data) => {
	return {
		type: UPDATE_USER,
		payload: {userid, data}
	}
}

export const updateUserSuccess = (data) => {
	return {
		type: UPDATE_USER_SUCCESS,
		payload: {data}
	}
} 

export const changePassword = (data) => {
	return {
		type: CHANGE_PASSWORD,
		payload: {data}
	}
}

export const changePasswordSuccess = () => {
	return {
		type: CHANGE_PASSWORD_SUCCESS
	}
}

export const createUser = (data) => {
	return {
		type: CREATE_USER,
		payload: {data}
	}
}

export const createUserSuccess = () => {
	return {
		type: CREATE_USER_SUCCESS
	}
}

export const getAllUser = () => {
	return {
		type: GET_ALL_USER
	}
}

export const getAllUserSuccess = (data) => {
	return {
		type: GET_ALL_USER_SUCCESS,
		payload: data
	}
}

export const logOutUser = (userid) => {
	return {
		type: LOG_OUT_USER,
		payload: userid
	}
}

export const getUser = (userid) => {
	return {
		type: GET_USER,
		payload: userid
	}
}

export const getUserSuccess = (data) => {
	return{
		type: GET_USER_SUCCESS,
		payload: data
	}
}

export const authToken = (token, userid) => {
	return{
		type: AUTH_REQUEST,
		payload: {token, userid}
	}
}

export const authTokenSuccess = (flag) => {
	return{
		type: AUTH_REQUEST_SUCCESS,
		payload: flag
	}
}



