var args = $.args;

var collection = Alloy.Collections.faq;
collection.fetch();

function transform(model) {

	var PcObject = model.toJSON();
	//console.log(PcObject);
	
	var label = Ti.UI.createLabel({
  	text: PcObject.question,
  	id : PcObject.answer,
  	className: 'question',
	top: 10,
	backgroundColor: '#8ac6b8',
	color: 'black',
	width: "80%",
	left: "10%",
	right: "10%",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	height: 35,
	font: {
		fontSize: 12
	}
	});
	
	$.FAQcontainer.add(label);

	label.addEventListener('click',function(e){
       console.log(e.source.id);
       var detailController = Alloy.createController("faqdetail", {
		rowQuestion : e.source.text,
		rowAnswer : e.source.id,
	});
	
	openAsModal(detailController.getView());
    });
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
exports.id = 'faq';
exports.cleanup = cleanup;
exports.init = init;
