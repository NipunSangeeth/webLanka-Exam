parasails.registerPage('productlist', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

    syncing: false,
    cloudError: '',
    formErrors: {},
    records: '',
    dataArr: '',
    status: '',
    csvUploader: false,
    infoAlert: false,
    successAlert: false,
    saveModelOpen: false,
    loading: false,
    alert: false,
    prepare: false,
    ready: false,
    err: 0,

    itemView: '/product/',
    listView: '/productlist',
    removeAction: 'removeproduct',

    allSelected: false,
    selectedItems: [],

    deleteModelOpen: false,

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

    removeItem: function(id) {

      var selectedArr = [];
      if (id) {
        selectedArr.push(id);
      }

      this.selectedItems = selectedArr;

      if (this.selectedItems.length == 0) {

        alert("Please select an item!");

      } else {

        this.deleteModelOpen = true;

      }

    },


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

    deleteItems: async function() {

      if (this.selectedItems.length == 0) {

        alert("Please select an item!");

      } else {

        this.deleteModelOpen = true;

      }

    },

    closeDeleteModal: function() {

      this.deleteModelOpen = false;
      this.cloudError = '';

    },

    handleParsingDeleteForm: function() {

      return {
        selectedItems: this.selectedItems,

      };

    },

    submittedDeleteForm: function(result) {

      if (result.result) {

        for (i = 0; i < result.result.length; i++) {
          _.remove(this.data, {
            id: result.result[i].id
          });
        }

        this.deleteModelOpen = false;
        this.cloudError = '';

        this.$forceUpdate();

      }

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
