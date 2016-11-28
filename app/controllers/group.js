// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

var collection = Alloy.Collections.group;
collection.fetch();

function filter(collection) {
	return collection.where({ 
		tname : "TeamA"
	});
}


function transform(model) {
	
	var fontsize = (Titanium.Platform.displayCaps.platformHeight*2)/100;
	//convert the model to a JSON object
	var PcObject = model.toJSON();
	//console.log(PcObject);

	
	//return output;


var holder = Ti.UI.createView({
	top: '10dp',
	width:'70%',
	height:'35dp',
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	borderRadius: '10dp',
	borderColor: '#CBCAC9',
	backgroundColor: "white",
	bottom:'15dp'
});

var mailimage = Ti.UI.createImageView({
	id: PcObject.email,
	className: 'mail',
	image:'/images/mail.png',
	height:'100%',
	left:'0dp'
});

var label = Ti.UI.createLabel({
  	text: PcObject.vname,
  	className: 'user',
	color: "black",
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	font: {
		fontSize: fontsize
	}
});

var phoneimage = Ti.UI.createImageView({
	id: PcObject.email,
	className: 'call',
	image:'/images/phone.png',
	height:'100%',
	right:'0dp'
});

var fbimage = Ti.UI.createImageView({
	id: PcObject.email,
	className: 'facebook',
	image:'/images/fb.png',
	height:'100%',
	left:'0dp'
});

var Headlabel = Ti.UI.createLabel({
  	text: "Your Group",
	color: "black",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	font: {
		fontSize: fontsize
	}
});


$.container.add(Headlabel);
$.container.add(holder);
holder.add(fbimage);
holder.add(label);
holder.add(phoneimage);

holder.addEventListener('click',function(e){
       console.log(e.source.className);
       console.log(e.source.id);
       if (e.source.className == 'facebook') {
       		
       		var mail = e.source.id;
       		var platform = "https://www.facebook.com/search/top/?q=";
       		var target = platform.concat(mail); 
       		Ti.Platform.openURL(target);
       		
       } else if (e.source.className == 'call') {
       	
       	    var phone = e.source.id;
       		var platform = "tel:";
       		var target = platform.concat(phone); 
       		Ti.Platform.openURL(target);

		} else if (e.source.className == 'mail') {
       	
       	    var mail = e.source.id;
       		var platform = "mailto:";
       		var target = platform.concat(mail); 
       		console.log(Ti.Platform.openURL(target));
       		console.log(target);
       		Ti.Platform.openURL(target);

		} else if (e.source.className == 'undefined') {

		} else {
		    console.log("Something went wrong!!");
		}
		});			
    }


