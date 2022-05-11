import { CognitoUserPool } from 'amazon-cognito-identity-js'
import AWS, { CognitoIdentityCredentials } from 'aws-sdk'
import nodeFetch from 'node-fetch'
global.fetch = nodeFetch

// AWS Cognito User Pool
AWS.config.region = process.env.AWS_REGION
AWS.config.credentials = new CognitoIdentityCredentials({
  IdentityPoolId: process.env.AWS_IDENTITY_POOL_ID
})

// Cognito User Pool Data
const poolData = {
  UserPoolId: process.env.AWS_USER_POOL_ID,
  ClientId: process.env.AWS_CLIENT_ID
}

// Export the Cognito User Pool to reuse across
export const awsUserPool = new CognitoUserPool(poolData)
