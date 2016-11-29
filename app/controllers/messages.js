// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var collection = Alloy.Collections.messages;
collection.fetch();

function transform(model) {
	
	var fontsize = (Titanium.Platform.displayCaps.platformHeight*2)/100;

	var PcObject = model.toJSON();
	console.log(PcObject);
	
	var label = Ti.UI.createLabel({
  	text: PcObject.topic,
	top: 10,
	backgroundColor: '#8ac6b8',
	color: 'black',
	width: "80%",
	left: "10%",
	right: "10%",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	height: 35,
	font: {
		fontSize: fontsize
	}
	});
	
	var label2 = Ti.UI.createLabel({
  	text: PcObject.content,
	top: 0,
	backgroundColor: 'white',
	color: 'black',
	width: "80%",
	left: "10%",
	right: "10%",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	height: 35,
	font: {
		fontSize: fontsize
	}
	});
	
	$.MessageCon.add(label);
	$.MessageCon.add(label2);

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

