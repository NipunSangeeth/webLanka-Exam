module.exports = {


  friendlyName: 'View productlist',


  description: 'Display "Productlist" page.',

  inputs: {

    type: {
      description: 'Search type',
      type: 'string'
    },

    byOrder: {
      type: 'string'
    }

  },


  exits: {

    success: {
      viewTemplatePath: 'pages/product/productlist'
    }

  },


  fn: async function(inputs, exits) {

    console.log("inputs");
    console.log(inputs);

    // IF EMPTY ALL INPUTS IT MEANS DIRECT LIST
    if (_.isEmpty(inputs)) {

      delete this.req.session.productList;

    }


    // VARIABLES
    var data = [];
    var filter = {};

    // SET FILTER
    if (typeof this.req.session.productList !== "undefined") {

      if (this.req.session.productList.type && (typeof inputs.type === 'undefined')) {

        inputs.type = this.req.session.productList.type;

      }

      if (this.req.session.productList.visibility && (typeof inputs.visibility === 'undefined')) {

        inputs.visibility = this.req.session.productList.visibility;

      }

    }

    // SET FILTER VALUES
    Object.keys(inputs).forEach((name, i) => {

      var value = inputs[name];

      // NAME
      if (name == 'type' && value != '') {

        filter.type = inputs.type;

      }

    });

    if (inputs.byOrder == '1') {
      data = await Product.find(filter).meta({
        makeLikeModifierCaseInsensitive: true
      }).sort('price DESC');
    } else {
      data = await Product.find(filter).meta({
        makeLikeModifierCaseInsensitive: true
      }).sort('price ASC');
    }




    return exits.success({
      data: data,
      filter: inputs
    });

  }


};
