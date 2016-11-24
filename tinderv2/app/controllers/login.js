Alloy.Collections.instance("news");
Alloy.Collections.instance("tasks");
Alloy.Collections.instance("group");
Alloy.Collections.instance("faq");
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var logWin = $.logWin;
var logView = $.logView;
var regView = Alloy.createController('register').getView();

boolean: k = false;
////
function login(e) {
	Alloy.createController('home').getView().open();
}

function register(e) {
    logView.setVisible(false);
    logWin.add(regView);
    k = true;
}

logWin.addEventListener('android:back', function(e){

	if (k == false) {
		logWin.close();
	} else {
		logWin.remove(regView);
		logView.setVisible(true);
		k = false;
	}
});

logWin.addEventListener("close", function() {
	$.destroy();
});

logWin.addEventListener('open',function(evt){
	if (OS_ANDROID){
		var activity=evt.source.getActivity();
		var actionbar=activity.actionBar;
		actionbar.hide();
		
	}
});
