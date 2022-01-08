module.exports = {


  friendlyName: 'View userlist',


  description: 'Display "Userlist" page.',

  inputs: {

    name: {
      description: 'Search Name',
      type: 'string'
    },

  },

  exits: {

    success: {
      viewTemplatePath: 'pages/user/userlist'
    }

  },


  fn: async function(inputs, exits) {

    // IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
    if (_.isEmpty(inputs)) {

      delete this.req.session.userList;

    }


    // VARIABLES
    var data = [];
    var filter = {};

    // SET FILTER
    if (typeof this.req.session.userList !== "undefined") {

      if (this.req.session.userList.name && (typeof inputs.name === 'undefined')) {

        inputs.name = this.req.session.userList.name;

      }

    }

    // SET FILTER VALUES
    Object.keys(inputs).forEach((name, i) => {

      var value = inputs[name];

      // NAME
      if (name == 'name' && value != '') {

        filter.fullName = {
          'contains': inputs.name
        };

      }

    });

    data = await User.find(filter).meta({
      makeLikeModifierCaseInsensitive: true
    }).sort('createdAt ASC');


    return exits.success({
      data: data,
      filter: this.req.session.userList ? this.req.session.userList : {}
    });

  }


};
