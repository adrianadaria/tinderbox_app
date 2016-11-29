// Arguments passed into this controller can be accessed via the `$.args` object directly ors:
var rowDescription = $.args.rowDescription;
var rowImg = $.args.rowImg;
var rowIheading = $.args.rowIheading;

//$.car.set(args.rowDescription);

console.log(rowIheading);
console.log(rowImg);
console.log(rowDescription);

var heading = Ti.UI.createLabel({
textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  color: 'black',
  text: rowIheading,
   width: "80%",
  top: 20,
  width: Ti.UI.SIZE, height: Ti.UI.SIZE,
  	font: {
		fontSize: 12,
		fontWeight: 'bold'
	}
});

var description = Ti.UI.createLabel({
textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  color: 'black',
  width: "60%",
  left: "20%",
  right: "20%",
  text: rowDescription,
  top: 10,
  width: Ti.UI.SIZE, height: Ti.UI.SIZE,
  font: {
		fontSize: 12
	}
});

var image = Ti.UI.createImageView({
	top: 10,
  image: rowImg,
  width: "40%",
  left: "30%",
  right: "30%"
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

$.descView.add(heading);
$.descView.add(image);
$.descView.add(description);
$.descView.add(button);

button.addEventListener("click", function(){
	$.getView().navWindow ? $.getView().navWindow.close() : $.getView().close();
});

$.detailWindow.addEventListener("close",function(){
	$.destroy();
});

$.detailWindow.addEventListener('open',function(evt){
	if (OS_ANDROID){
		var activity=evt.source.getActivity();
		var actionbar=activity.actionBar;
		actionbar.hide();
		
	}
});
