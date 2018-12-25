import { Auth } from 'aws-amplify';
import { CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import config from '../config/aws';


const _poolData = {
    UserPoolId: config.cognito.USER_POOL_ID,
    ClientId: config.cognito.APP_CLIENT_ID
}

const createUser = (username, password) => {
    // TODO use aws sdk to use admincreateuser
    return username
}

const logIn = (username, password) => {
    Auth.signIn(username, password)
        .then(user => console.log(`${user} is logged in`))
        .catch(err => console.log(err));
}

const logOut = (username, password) => {
    Auth.signOut({ global: true })
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

const changePassword = (oldPassword, newPassword) => {
    Auth.currentAuthenticatedUser()
        .then(user => {
            return Auth.changePassword(user, oldPassword, newPassword);
        })
        .then(data => console.log(data))
        .catch(err => console.log(err));
}

const getUserInfo = () => {
    Auth.currentAuthenticatedUser()
        .then(user => {
            console.log(user)
            return user
        })
        .catch(err => console.log(err));
}

const getSessionInfo = () => {
    // Returns id token, access token and refresh token
    Auth.currentSession()
        .then(data => {
            console.log(data)
            return data
        })
        .catch(err => console.log(err));
}

const updateUserAttr = (user, newAttr) => {
    let result = await Auth.updateUserAttributes(user, newAttr);
    console.log(result)
    return result
}

module.exports = {
    logIn, logOut, changePassword, getUserInfo, getSessionInfo, updateUserAttr
}
