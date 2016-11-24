// Arguments passed into this controller can be accessed via the `$.args` object directly ors:
var rowQuestion = $.args.rowQuestion;
var rowAnswer = $.args.rowAnswer;

//$.car.set(args.rowDescription);

//console.log(rowQuestion);

var question = Ti.UI.createLabel({
	text: rowQuestion,
	top: 10,
	backgroundColor: '#8ac6b8',
	color: 'black',
	width: "80%",
	left: "10%",
	right: "10%",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	height: 35,
	 font: {
		fontSize: 12,
		fontFamily: 'eveleth-thin',
	}

});

var answer = Ti.UI.createLabel({
	text: rowAnswer,
	color: '#043540',
	width: "80%",
	left: "10%",
	right: "10%",
	top: 10,
	bottom: 10,
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  font: {
			fontSize: 14,
			fontFamily: 'brown-regular',
	}
});

var button = Titanium.UI.createButton({
   title: 'Back',
   top: 10,
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	borderRadius: '10dp',
	backgroundColor: "#FEDC70",
	color: "#F18A78",
	width: '40%'
});

var leview = Titanium.UI.createView({
		backgroundColor: 'white',
	borderWidth: 1,
	borderColor: '#043540',
   	width: "80%",
	left: "10%",
	right: "10%",
	height: Ti.UI.SIZE
});

$.faqView.add(question);
$.faqView.add(leview);
leview.add(answer);
$.faqView.add(button);

button.addEventListener("click", function(){
	$.getView().navWindow ? $.getView().navWindow.close() : $.getView().close();
});

$.faqWindow.addEventListener("close",function(){
	$.destroy();
});

$.faqWindow.addEventListener('open',function(evt){
	if (OS_ANDROID){
		var activity=evt.source.getActivity();
		var actionbar=activity.actionBar;
		actionbar.hide();
		
	}
});