import { Auth } from 'aws-amplify';
import config from '../config/aws';
import AWS from 'aws-sdk';

AWS.config.update({
  region: config.AWS_REGION,
});


const adminCreateUser = (username) => {
    const cognitoIDP = new AWS.CognitoIdentityServiceProvider();

    const params = {
        UserPoolId: config.cognito.USER_POOL_ID,
        Username: username,
        ForceAliasCreation: false,
        UserAttributes: [
            {
                Name: 'email',
                Value: `${username}@astro.com.my`
            },
        ],
    };
    cognitoIDP.adminCreateUser(params, (err, data) => {
        if (err) {
            console.log(err)
            return err
        }
        console.log(data)
        return data
    })
}

const logIn = async (username, password) => {
    Auth.signIn(username, password)
        .then(user => {
            // Link user to identity pool
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
                Logins: {
                    [`cognito-idp.${config.AWS_REGION}.amazonaws.com/${config.cognito.USER_POOL_ID}`]: user.signInUserSession.idToken.jwtToken
                }
            })
            AWS.config.credentials.get((err) => {
                if(err) {
                    console.log(err)
                } else {
                    return user
                }
            })
        })
        .catch(err => console.log(err));
}

const logOut = async () => {
    Auth.signOut({global: true})
        .then(data => {
            console.log(data)
        })
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
            Auth.currentSession().then(session => console.log(session))
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

const updateUserAttr = async (user, newAttr) => {
    let result = await Auth.updateUserAttributes(user, newAttr);
    console.log(result)
    return result
}

export default {
    logIn, logOut, changePassword, getUserInfo, getSessionInfo, updateUserAttr, adminCreateUser
}
