// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var collection = Alloy.Collections.messages;

collection.fetch({
	success: function() {
		_.each(collection.models, function(element, index, list){
			
			element.attributes.sid = element.sid;	
			element.attributes.topic = element.attributes.topic;
			element.attributes.content = element.attributes.content;
			
			
		});
	},
	error : function() {
		Ti.API.error("this is not good");
	}
});



function selectRow(e) {
 var rowId = e.rowData.rowId;
 var rowIheading = e.rowData.rowIheading;
 var rowDescription = e.rowData.rowDescription;
 //alert(rowDescription);
 	var detailController = Alloy.createController("detail", {
		rowIheading : rowIheading,
		rowDescription : rowDescription
	});
	openAsModal(detailController.getView());
}

function openAsModal(_view) {
	if (OS_IOS) {
		var navWindow = Titanium.UI.iOS.createNavigationWindow({
			window : _view
		});

		_view.navWindow = navWindow;
		navWindow.open({
			modal : true
		});
	} else {
		_view.open({
			modal : true
		});
	}
}

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
exports.id = 'messages';
exports.cleanup = cleanup;
exports.init = init;
