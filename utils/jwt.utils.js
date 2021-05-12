var jwt = require('jsonwebtoken')
const SECRETS = "hellomister000001vaailleurstien02135"

module.exports = {
    generateTokenForUser: (userData)=>{
        return jwt.sign({
            userId: userData.id,
            userName: userData.UserName
        }
        ,SECRETS
        )
    },
    parseAuthorization: (authorization)=>{
       return (authorization!=null)? authorization.replace('bearer',''):null
    },
    getUserId: (authorization)=>{
       let userId=-1
       let token = module.exports.parseAuthorization(authorization)
       
       if(token!=null){
          let jwtToken= jwt.verify(token,SECRETS)
          if(jwtToken!=null){
             userId= jwtToken.userId
          }
       }
       return userId;
    }
}