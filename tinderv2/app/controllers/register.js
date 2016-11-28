// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function createUser() {
	
	var name = $.fullname.value;
	var phone = $.phone.value;
	var email = $.email.value;
	var password = $.password.value;
	var passwordCheck = $.passwordCheck.value;
	
	var params = {
			"userName": name,
			"userPass": password,
			"phone": phone,
			"email": email
		};
		
	var xhr = Ti.Network.createHTTPClient();
	var url = "http://kostylo.dk/projects/api/createUser";
	xhr.open("POST",url);
	
	alert("clicked");
	
	xhr.onload = function() {
		
		Alloy.createController('home').getView().open();
		
	};
	
	xhr.onerror = function (){

		alert("error");
		
	};
	
	xhr.send(params);

}

function uploadImage(e) {
	
}


function outputState(){
    Ti.API.info('Switch value: ' + $.basicSwitch.value);
}

$.regWin.addEventListener("close", function() {
	$.destroy();
});

$.regWin.addEventListener('open',function(evt){
	if (OS_ANDROID){
		var activity=evt.source.getActivity();
		var actionbar=activity.actionBar;
		actionbar.hide();
		
	}
});
//