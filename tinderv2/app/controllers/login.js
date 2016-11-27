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
	
	var username = $.username;
	var password = $.password;
	var sendData = JSON.stringify({
		
		"userName": username,
		"userPass": password
		
	});
	var url = "http://kostylo.dk/projects/api/login";
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(){
		
		var resp = JSON.stringify(this.responseData);
		console.log(resp);
		if(resp){
			Alloy.createController('home').getView().open();
			
		}
		else{
			alert("try again");
		}
	};
	xhr.open("POST",url);
	xhr.send(sendData);
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
