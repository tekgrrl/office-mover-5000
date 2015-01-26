var utils  = require('../helpers/utils');
var rootRef = new Firebase(utils.urls.root);

/*
* Welcome module
*
* This is the module that sets up the welcome page and Google login
*/

var welcome = {
  $alert: null,
  $signInButtons: null,

  init: function(){
    var self = this;

    // REGISTER ELEMENTS
    this.$alert = $(".alert");
    this.$signInButtons = $(".welcome-hero-signin");

    // SETUP LOGIN BUTTON
    this.$signInButtons.on("click", function(e){
      var provider = $(this).data("provider");

      /* TODO: STEP-4
      *
      * Authenticate the user with the authentication provider
      * specified by provider. On error display the index.html tag
      * with class='alert'
      */
    });
  }
};


// EXPORT MODULE
module.exports = welcome;
