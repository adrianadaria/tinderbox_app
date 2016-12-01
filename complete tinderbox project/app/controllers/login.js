Alloy.Collections.instance("news");
Alloy.Collections.instance("tasks");
Alloy.Collections.instance("group");
Alloy.Collections.instance("faq");
Alloy.Collections.instance("messages");
// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var logWin = $.logWin;
var logView = $.logView;

function login(e) {
	
	var username = $.username.value;
	var password = $.password.value;
	var sendData = {
		
		"uname": username,
		"upass": password
		
	};
	var url = "http://kostylo.dk/projects/api/login";
	var xhr = Ti.Network.createHTTPClient();
	xhr.onload = function(){
		
		console.log(this.responseText);
		var myObj = JSON.parse(this.responseText);
		
		console.log(myObj.data);
		
			Alloy.createController('home').getView().open();
			
		Alloy.Globals.transferId=myObj.data.userId;
		Alloy.Globals.groupId = myObj.data.tid;

	};
	xhr.onerror = function (){
	
		alert("error");
		
	};
	xhr.open('POST',url);
	xhr.send(sendData);
}


function register(e) {
   
    Alloy.createController('register').getView().open();
}

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
