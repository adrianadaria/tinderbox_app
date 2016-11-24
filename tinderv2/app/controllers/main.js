var args = arguments[0] || {};

now();

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

function now(){
	
	// Keep a global reference of the available pages
	var numberOfPages = $.menuBar.getViews().length;
	
	var pages = []; // without this, the current page won't work on future references of the module
					// Store a reference to this view
	pages.push($.pView1, $.pView2, $.pView3);
	
	// Mark the initial selected page
	pages[$.menuBar.getCurrentPage()].setOpacity(1);
	
	// Callbacks
	onScroll = function(event){
		// Go through each and reset it's opacity
		for (var i = 0; i < numberOfPages; i++) {
			pages[i].setOpacity(0.5);
		}
		
		var m1 = $.menuBar.currentPage;
		pages[m1].setOpacity(1);
		
	};
	
	onPostLayout = function(event) {
	// Go through each and reset it's opacity
	for(var i = 0; i < numberOfPages; i++) {
		pages[i].setOpacity(0.5);
	}
	// Bump the opacity of the new current page
	pages[$.menuBar.currentPage].setOpacity(1);
	
};
	
	// Attach the scroll event to this scrollableView, so we know when to update things
	$.menuBar.addEventListener("scroll", onScroll);
	$.menuBar.addEventListener("postlayout", onPostLayout);
};

// PUBLIC
exports.id = 'main';
exports.cleanup = cleanup;
exports.init = init;