module.exports = {


  friendlyName: 'View singleuser',


  description: 'Display "Singleuser" page.',

  inputs: {

    id: {
      type: 'string'
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/user/singleuser'
    }

  },


  fn: async function(inputs, exits) {

    var filter = {};
    var data = undefined;

    if (inputs.id) {

      filter = {
        id: inputs.id
      };

      data = await User.findOne(filter);

    }


    return exits.success({
      data: data,

    });


  }


};
