module.exports = {


  friendlyName: 'View product',


  description: 'Display "Product" page.',

  inputs: {

    id: {
      type: 'string'
    }
  },

  exits: {

    success: {
      viewTemplatePath: 'pages/product/product'
    }

  },


  fn: async function(inputs, exits) {

    var filter = {};
    var data = undefined;

    if (inputs.id) {

      filter = {
        id: inputs.id
      };

      data = await Product.findOne(filter);

    }


    return exits.success({
      data: data,

    });


  }


};
