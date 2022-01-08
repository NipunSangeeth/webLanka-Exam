module.exports = {


  friendlyName: 'Save user',


  description: '',


  inputs: {

    id:{
      required: true,
      type: 'string',
    },
    
    emailAddress: {
      required: true,
      type: 'string',
      isEmail: true,
      description: 'The email address for the new account, e.g. m@example.com.',
      extendedDescription: 'Must be a valid email address.',
    },

    password: {
      required: true,
      type: 'string',
      maxLength: 200,
      example: 'passwordlol',
      description: 'The unencrypted password to use for the new account.'
    },

    fullName: {
      required: true,
      type: 'string',
      example: 'Frida Kahlo de Rivera',
      description: 'The user\'s full name.',
    },

    contact: {
      type: 'string'
    },

    addressLine: {
      type: 'string'
    },

  },


  exits: {

  },


  fn: async function(inputs, exits) {

    console.log(inputs);

    var newEmailAddress = inputs.emailAddress.toLowerCase();

    User.findOrCreate({
        id: inputs.id
      }, {
        fullName:inputs.fullName,
        emailAddress: newEmailAddress,
        contact: inputs.contact,
        addressLine: inputs.addressLine,
        password: await sails.helpers.passwords.hashPassword(inputs.password),
        tosAcceptedByIp: this.req.ip
      })
      .exec(async (err, record, wasCreated) => {
        if (err) {
          return res.serverError(err);
        }

        if (wasCreated) {

          return exits.success({
            data: record,
            error_status: record ? 0 : 1
          });

        } else {

          var updatedObj = await User.updateOne({
              id: inputs.id
            })
            .set({
              fullName:inputs.fullName,
              emailAddress: newEmailAddress,
              contact: inputs.contact,
              addressLine: inputs.addressLine,
              password: await sails.helpers.passwords.hashPassword(inputs.password),
            });


          return exits.success({
            data: updatedObj,
            error_status: updatedObj ? 0 : 1
          });
        }
      });
  }


};
