// aws-exports.ts

const awsConfig = {
    Auth: {
      region: "us-east-1",
      userPoolId: "us-east-1_13gqo9QX",       // e.g. "us-east-1_AbCdEf123"
      userPoolWebClientId: "3rqonf517aholm2dg7tk2ha", // your app client ID
      oauth: {
        domain: "us-east-113qoo9qxx.auth.us-east-1.amazoncognito.com",
        scope: ["openid", "email", "phone"],
        redirectSignIn: "https://d84l1y8p4kdic.cloudfront.net",
        redirectSignOut: "https://d84l1y8p4kdic.cloudfront.net",
        responseType: "code",
      },
    },
  };
  
  export default awsConfig;
  