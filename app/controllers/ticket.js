// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

/**
 * Callback for Android OptionsMenu
 */
function onCreateOptionsMenu(e) {
  
  // additional overflow menu item
  e.menu.add({
    title : "Main option",
    showAsAction : Ti.Android.SHOW_AS_ACTION_NEVER
  });

}

/**
 * Cleans up the controller
 * 
 * http://www.tidev.io/2014/09/18/cleaning-up-alloy-controllers/
 */
function cleanup() {
  $.off();
}

/**
 * Initializes the controller
 */
function init() {
  
  $.on('createOptionsMenu', onCreateOptionsMenu);

}

// PUBLIC
exports.id = 'ticket';
exports.cleanup = cleanup;
exports.init = init;
