var bcrypt = require('bcrypt');
var jwt = require('../utils/jwt.utils');

module.exports = {
  User: {
    profile: ({ profile }, args, { models }) =>
      models.Profile.findOne({
        where: {
          id: profile,
        },
      })
  },
  Profile: {
    permissions: ({ id }, args, { models }) =>
      models.rel_profile_permission.findAll({
        where: {
          profile: id,
        },
      })
  },
  Rel_profile_permission: {
    permission: ({ permission }, args, { models }) =>
      models.Permission.findOne({
        where: {
          id: permission,
        },
      }),
  },
  Query: {
    allUsers: (parent, args, { models }) => {
      return models.User.findAll();
    },
    /*Exemple d'appel 
    query
    {
      allUsers
    }*/
    me: (parent, args, { models, user }) => {
      if (user) {
        // they are logged in
        return models.User.findOne({
          attributes: ['id', 'email', 'name', 'surname', 'profile', 'createdAt', 'updatedAt'],
          where: { id: user.Id }
        });
      }
      // not logged in user
      throw new Error('Vous devez vous connecter');
    },
    /*Exemple d'appel *
    query
    {
      me
    }
    */
    profilePermission: (parent, args, { models }) => {
      return models.Profile.findAll()
      //({attributes: [ 'id', 'name', 'permissions'],
      //where: { id: user.Id }})
    }
  },

  Mutation: {
    register: async (parent, args, { models }) => {
      const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
      const user = args;
      if (!EMAIL_REGEX.test(user.email)) {
        throw new Error('Email non valide');
      }
      if (!PASSWORD_REGEX.test(user.password)) {
        throw new Error('Mot de passe entre 4 et 8 caractères avec au moins 1 chiffre');
      }
      user.password = await bcrypt.hash(user.password, 12);
      return models.User.create(user);
      /*Exemple d'Appel d'inscription
      mutation
      {
        register(name:"thierry",surname="Antoni",email:"rat619@test.fr",password:"tita619")
      }
      */
    },
    login: async (parent, { email, password }, { models, SECRET }, context) => {
      const user = await models.User.findOne({ where: { email } });
      const perm = await models.rel_profile_permission.findAll({
        attributes: ['permission'],
        where: { profile: user.profile, }
      });
      if (!user) {
        throw new Error('Not user with that email');
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Incorrect password');
      }
      const token = jwt.generateTokenForUser(user, SECRET);
      return token;
      /*Exemple d'Appel de connexion
      mutation
      {
        login(email:"rat619@test.fr",password:"tita619")
      }
      */
    },
    updateUser: (parent, { name, newName }, { models }) =>
      models.User.update({ name: newName }, { where: { name } }),
    /*Exemple de modification
    mutation
    {
      updateUser(name:"thierry",newName:"antoni")
    }
    */
    deleteUser: (parent, args, { models }) =>
      models.User.destroy({ where: args }),
    /*Exemple de suppression
    mutation
    {
      deleteUser(name:"thierry")
    }
    */
    createProfile: (parent, args, { models }) =>
      models.Profile.create(args),
    createPermission: (parent, args, { models }) =>
      models.Permission.create(args),
    createProfilePermission: (parent, args, { models }) =>
      models.rel_profile_permission.create(args),
  }
}; 