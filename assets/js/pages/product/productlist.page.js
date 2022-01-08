parasails.registerPage('productlist', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    syncing: false,
    cloudError: '',
    formErrors: {},
    err: 0,

    itemView: '/product/',
    listView: '/productlist',

    allSelected: false,
    selectedItems: [],


    formData: {
      type: '',
      byOrder: '0',
    },

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    console.log(this.filter);

    this.formData.type = this.filter.type ? this.filter.type : '';
    this.formData.byOrder = this.filter.byOrder ? this.filter.byOrder : '0';

  },
  mounted: async function() {
    //…
  },


  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    refresh: function() {
      window.location.href = this.listView;
    },


    selectAll: function() {

      this.selectedItems = [];

      if (!this.allSelected) {
        for (i in this.data) {
          this.selectedItems.push(this.data[i].id);
        }
      }
    },
    select: function() {
      this.allSelected = false;
    },

    // ********************** SET FUNCTIONS *************************//

    addItems: async function() {

      this.saveModelOpen = true;

    },


    closeSaveModal: function() {

      this.saveModelOpen = false;
      this.cloudError = '';

    },
  }
});
