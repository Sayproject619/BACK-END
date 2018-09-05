// Imports
var jwt = require('jsonwebtoken');

const SECRET = 'say';

// Exported functions
module.exports = {
  generateTokenForUser: function(userData,SECRET) {
    return jwt.sign({
      Id: userData.id,
      Profile: userData.profile
    },
    SECRET,
    {
      expiresIn: '1d'
    })
  },
  // A utiliser si on ne choisit pas la méthode automatique jwt-express
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function(authorization) {
    var Id = -1;
    var token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        var jwtToken = jwt.verify(token, SECRET);
        if(jwtToken != null)
          Id = jwtToken.Id;
      } catch(err) { }
    }
    return Id;
  }
}