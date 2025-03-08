// aws-exports.ts
const awsConfig = {
  Auth: {
    region: "us-east-1",
    userPoolId: "us-east-1_13qoo9QXx",
    userPoolWebClientId: "3rqonf5174ahom3o2djp6rfrkl",
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
