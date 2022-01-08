module.exports = {


  friendlyName: 'Saveproduct',


  description: 'Saveproduct product.',


  inputs: {

    id:{
      type:'string'
    },

    name:{
      type:'string'
    },

    type:{
      type:'string'
    },

    price:{
      type:'string'
    },

    status:{
      type:'string'
    },
  },


  exits: {

  },


  fn: async function(inputs, exits) {

    console.log(inputs);

    Product.findOrCreate({
        id: inputs.id
      }, {
        name: inputs.name,
        type: inputs.type,
        price: inputs.price,
        status: inputs.status,

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

          var updatedObj = await Product.updateOne({
              id: inputs.id
            })
            .set({
              name: inputs.name,
              type: inputs.type,
              price: inputs.price,
              status: inputs.status,
            });


          return exits.success({
            data: updatedObj,
            error_status: updatedObj ? 0 : 1
          });
        }
      });
  }

};
