module.exports = {


  friendlyName: 'Remove user',


  description: '',


  inputs: {

    selectedItems: {

      type: 'ref',
      required: true

    }

  },


  exits: {

  },


  fn: async function(inputs, exits) {

    var result = await User.destroy({
      id: {
        in: inputs.selectedItems
      }
    }).fetch();

    return exits.success({
      result: result
    });

  }


};
