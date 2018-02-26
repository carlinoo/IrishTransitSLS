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
  login_user(username, password, callback) {
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
                     callback != null && callback(false, error);
                     return false;
                } else {
                     // Instantiate aws sdk service objects now that the credentials have been updated.
                     // example: var s3 = new AWS.S3();
                     console.log('Successfully logged!');
                     callback != null && callback(true, null);
                     return true;
                }
            });
        },

        onFailure: function(err) {
            console.error(err);
            callback != null && callback(false, err);
        },

    });
  },


  // Method oto update User attributes
  userUpdateAttributes(attributes, callback) {

    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    var attributeList = [];

    for (var i = 0; i < attributes.length; i++) {
      var attribute = new CognitoUserAttribute(attributes[i]);
      attributeList.push(attribute);
    }

    cognitoUser.getSession(function(err, session) {
       if (err) {
          callback(false, err);
       }

      cognitoUser.updateAttributes(attributeList, function(err, result) {
          if (err) {
              callback(false, err);
              return;
          }
          callback(true, result);
      });

    });
  },


  userForgotPassword(username, callback) {
    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };

    var cognitoUser = new CognitoUser(userData);

    cognitoUser.forgotPassword({
        onSuccess: function(data) {
            callback(true, data);
        },
        onFailure: function(err) {
            callback(false, err);
        }
    });
  },


  confirmResetPassword(username, verificationCode, newPassword, callback) {
    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };

    var cognitoUser = new CognitoUser(userData);


    cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess() {
            callback(true, null);
        },
        onFailure(err) {
            callback(false, err);
        }
    });
  },



  // To check if a user is checked
  // user_signed_in(callback) {
    // var userPool = new CognitoUserPool(poolData);
    // var cognitoUser = userPool.getCurrentUser();
    //
    //
    // // Check if the user is set
    // if (cognitoUser != null) {
    //     cognitoUser.getSession(function(err, session) {
    //         if (err) {
    //             console.error(err);
    //         }
    //         callback(session.isValid());
    //         return session.isValid();;
    //     });
    // } else {
    //   // If the user is null, return false
    //   callback != null && callback(false);
    //   return false;
    // }
  // },

  cognitoUserToken(callback) {
    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser == null) {
      callback(null);
      return null;
    }

    cognitoUser.getSession(function(err, session) {
       if (err) {
          console.log(err);
          callback(null);
           return null;
       }

       callback(session.getIdToken().getJwtToken());
     });

  },


  user_signed_in(callback) {
    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser == null) {
      callback(false, null);
    } else {
      callback(true, cognitoUser);
    }
  },


  // To get the current user
  current_user(callback) {
    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser == null) {
      callback(null, null);
    }

    cognitoUser.getSession(function(err, session) {
      if (err) {
          console.error(err);
          callback(null, err);
      }

      cognitoUser.getUserAttributes(function(err, attributes) {
          if (err) {
              callback(null, err);
          } else {
            callback(attributes, null);
          }
      });
    });
  },



  // Sign out a user
  user_sign_out(globally = false, callback) {
    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    if (cognitoUser == null) {
      return false;
    }

    if (globally === false) {
      cognitoUser.signOut();
    } else {
      cognitoUser.globalSignOut(callback);
    }
    return true;
  },



  // Register a user
  register_user(email, username, password, callback = null) {

    var userPool = new CognitoUserPool(poolData);

    var attributeList = [];

    var dataEmail = {
        Name : 'email',
        Value : email
    };

    var attributeEmail = new CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp(username, password, attributeList, null, function(err, result) {
        if (err) {
            console.log(err);
            callback != null && callback(false, err);
            return false;
        }
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
        callback != null && callback(true, cognitoUser);
        return true;
    });
  },



  // To confirm email code
  confirm_user(username, code, callback = null) {
    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };

    var cognitoUser = new CognitoUser(userData);

    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            console.log(err);
            callback != null && callback(false);

        }
        console.log('call result: ' + result);
        callback != null && callback(true);

    });
  },



  resend_code_user(username, callback = null) {
    var userPool = new CognitoUserPool(poolData);
    var userData = {
        Username : username,
        Pool : userPool
    };

    var cognitoUser = new CognitoUser(userData);

    cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
            console.log(err);
            callback != null && callback(false);

        }
        console.log('call result: ' + result);
        callback != null && callback(true);
    });
  },




  user_list_devices(username, callback) {

    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();

    // Get the session
    cognitoUser.getSession(function(err, session) {
      if (err) {
          console.error(err);
          callback(false, err);
          return;
      }

      cognitoUser.listDevices(60, null, {
          onSuccess: function (result) {
              callback(true, result);
          },
          onFailure: function(err) {
            callback(false, err);
          }
      });
    });

  }
}
