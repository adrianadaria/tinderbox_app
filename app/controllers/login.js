var logWin = $.logWin;



var logView = $.logView;
var regView = Alloy.createController('register').getView();

boolean: k = false;

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
