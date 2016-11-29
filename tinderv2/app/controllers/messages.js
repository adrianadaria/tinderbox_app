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
