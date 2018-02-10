// The pool data
var poolData = {
    UserPoolId : 'eu-west-1_6VeeWKNeT',
    ClientId : '7875e8drhne3d1qjqn41gp6q8a'
};

var identityPoolId = 'eu-west-1:7e7fe6f7-0463-4e8b-840e-4513d469f02b';

import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';


export default {

  // Log in a user given the username and password
  login_user(username, password) {
    var authenticationData = {
        Username : username,
        Password : password,
    };
    var authenticationDetails = new AuthenticationDetails(authenticationData);

    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };

    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {

            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = 'eu-west-1';

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId : 'eu-west-1:7e7fe6f7-0463-4e8b-840e-4513d469f02b', // your identity pool id here
                Logins : {
                    // Change the key below according to the specific region your user pool is in.
                    'cognito-idp.eu-west-1.amazonaws.com/eu-west-1_6VeeWKNeT': result.getIdToken().getJwtToken()
                }
            });

            //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
            AWS.config.credentials.refresh((error) => {
                if (error) {
                     console.error(error);
                } else {
                     // Instantiate aws sdk service objects now that the credentials have been updated.
                     // example: var s3 = new AWS.S3();
                     console.log('Successfully logged!');
                     return true;
                }
            });
        },

        onFailure: function(err) {
            alert(err);
        },

    });
  }
}
