var logWin = $.logWin;

logWin.addEventListener('open',function(evt){
	if (OS_ANDROID){
		var activity=evt.source.getActivity();
		var actionbar=activity.actionBar;
		
		actionbar.title=" ";
		
	}
});

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


var win = Ti.UI.createWindow({
    title: "Old Title",
    navBarHidden: false
});
var actionBar;

win.addEventListener("open", function() {
    if (Ti.Platform.osname === "android") {
        if (! win.activity) {
            Ti.API.error("Can't access action bar on a lightweight window.");
        } else {
            actionBar = win.activity.actionBar;
            if (actionBar) {
                //actionBar.backgroundImage = "/images/logo.png";
                //actionBar.title = "New Title";
                //actionBar.onHomeIconItemSelected = function() 
                {
                    
                };
            }
        }
    }
});
