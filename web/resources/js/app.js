var Utils  = require('./helpers/utils');
var data  = require('./helpers/data');
var userProfile = require('./components/user-profile');
var Dropdown = require('./components/dropdown');
var Furniture  = require('./components/furniture');
var welcome = require('./components/welcome');
var backgroundRef = new Firebase(Utils.urls.background);
var furnitureRef = new Firebase(Utils.urls.furniture);

/*
* Application Module
*
* This is the main module that initializes the entire application.
*/

var app = {
  $welcome: null,
  $app: null,
  $signInButtons: null,
  $alert: null,
  $signOutButton: null,
  maxZIndex: 0,


  /*
  * Initalize the application
  *
  * Get intials dump of Firebase furniture data.
  */

  init: function() {
    // REGISTER ELEMENTS
    this.$welcome = $("#welcome");
    this.$app = $("#app");
    this.$officeSpace = $("#office-space");
    this.$officeSpaceWrapper = $("#office-space-wrapper");
    this.$signInButtons = $(".welcome-hero-signin");
    this.$alert = $(".alert");
    this.$signOutButton = $(".toolbar-sign-out");

    //INITIALIZE APP
    welcome.init();
    // this.checkUserAuthentication();
    this.createDropdowns();
    this.setOfficeBackground();
    // this.logout();
  },


  /*
  * Create Dropdowns
  *
  * Create add furniture and background dropdowns
  */

  createDropdowns: function() {
    var self = this;
    var $addFurniture = $('#add-furniture');
    var $addBackground = $('#select-background');

    //CREATE NEW FURNITURE OBJECTS
    this.furnitureDropdown = new Dropdown($addFurniture, data.furniture, 'furniture');
    this.backgroundDropdown = new Dropdown($addBackground, data.backgrounds, 'background');

    // LISTEN FOR CLICK EVENT ON DROPDOWNS
    $('.dropdown').on('click', '.dropdown-button', function(e) {
      e.preventDefault();
      var button = $(e.currentTarget);
      var type = button.data('type');
      var name = button.data('name');

      switch(type) {
        case 'furniture': self.addFurniture(name); break;
        case 'background': self.changeBackground(name); break;
      }
    });
  },


  /*
  * Change Office Space Background
  *
  */

  changeBackground: function(name) {
    backgroundRef.set(name);
  },


  /*
  * Set Office Space Background
  *
  */

  setOfficeBackground: function() {
    var self = this;

    // LISTEN FOR FIREBASE UPDATE
    backgroundRef.on('value', function(snapshot) {
      var value = snapshot.val();
      var pattern = value ? 'background-' + value : '';

      self.$officeSpaceWrapper.removeClass().addClass('l-canvas-wrapper l-center-canvas ' +  pattern);
    });
  },


  /*
  * Add Furniture
  *
  * Adds a blank piece of new furniture
  */

  addFurniture: function(type) {
    furnitureRef.push({
      type: type,
      top: 400,
      left: 300,
      rotation: 0,
      locked: false,
      "z-index": 0,
      name: ""
    });
  }
};


/*
* Initialize App
*
*/

$(document).ready(function() {
  app.init();
});


// EXPORT MODULE
module.exports = app;
