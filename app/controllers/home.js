// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function toggleMenu() {
	Alloy.Globals.drawer.toggleLeftWindow();
}

/**
 * #Home Controller
 * 
 * Here is where we setup the drawer layout and create a global reference.
 * Since the activity behind the index window will be the only access point
 * for the ActionBar and the optionsMenu, we also setup a forwarding
 * mechanism for nested controllers (content views).
 * 
 * We want to use the drawer for our top-level-navigation. So, each content
 * view is represented as an element in the menu, which will act as the
 * leftView of the drawer.
 * 
 * Initialization works as follows:
 *  1. init drawer
 *  2. open index window
 *  3. setup actionbar, optionsMenu
 *  4. init content view
 * 
 * Every content view is a separate controller which can have its own
 * ActionBar setup and optionsMenu.
 */

initDrawer();

/**
 * initializes drawer navigation
 */
function initDrawer() {
  // Android only
  if (OS_ANDROID) {
    
    // Load module
    var TiDrawerLayout = require('com.tripvi.drawerlayout');
    
    // define menu and main content view
    Alloy.Globals.menu = Alloy.createController('menu', {
      parent : $.homeWin
    });
    
    var filter = Alloy.createController('filter'); 
    
    // this is just a wrapper
    // actual content views are add to this later
    Alloy.Globals.contentView = Ti.UI.createView({
      width : Ti.UI.FILL,
      height : Ti.UI.FILL
    });

    Alloy.Globals.drawer = TiDrawerLayout.createDrawer({
      leftView: Alloy.Globals.menu.getView(),
      //rightView: filter.getView(),
      centerView: Alloy.Globals.contentView,
      leftDrawerWidth: "260",
      rightDrawerWidth: "240"
    });

    Alloy.Globals.drawer.addEventListener('drawerclose', onDrawerChange);
    $.homeWin.add(Alloy.Globals.drawer);
    
  }
  
  //$.index.open();
}

/**
 * Android callback for {Ti.UI.Window} open event
 */
function onOpen() {
  
  var activity = $.homeWin.getActivity();

  if (activity) {

    var actionBar = activity.getActionBar();
    actionBar.hide();

    activity.onCreateOptionsMenu = function(e) {
      e.menu.clear();

      e.activity = activity;
      e.actionBar = actionBar;

      // distinguishing the drawer state is not necessary anymore
      // since the drawer covers the toolbar
      Alloy.Globals.optionsMenu(e);//
      
    };

    if (actionBar) {
      actionBar.displayHomeAsUp = true;
      actionBar.title = "TinderBox";
      actionBar.onHomeIconItemSelected = function() {
        Alloy.Globals.drawer.toggleLeftWindow();
      };
    }
  };
  
  init();

  return true;
}

/**
 * callback for Android back button
 */
function onBack(){
  Alloy.Globals.back();
}

/**
 * callback for drawer open / close event
 * @param {Object} event
 */
function onDrawerChange(e) {
  $.homeWin.getActivity().invalidateOptionsMenu();
}

/**
 * initializes the Controller
 */
function init() {
  Alloy.Globals.menu.select(0);
  OS_ANDROID && $.homeWin.getActivity().invalidateOptionsMenu();
}