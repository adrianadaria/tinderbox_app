var args = $.args;

var collection = Alloy.Collections.tasks;
collection.fetch();

function filter(collection) {
	return collection.where({ 
		vid : String(Alloy.Globals.transferId)
	});
}

function transform(model) {
	
	var fontsize = (Titanium.Platform.displayCaps.platformHeight*2)/100;


	
	var PcObject = model.toJSON();
	//console.log(PcObject);
		
	var holder = Ti.UI.createView({
	borderRadius: "10dp",
	borderColor: "black",
	width:"80%",
	top:10,
	backgroundColor:"white",
	layout: "vertical"
	});
	
	var holderSection = Ti.UI.createView({
	left:"10%",
	right:"10%",
	width: "80%",
	height: Ti.UI.SIZE,
	top: "50",
	layout: "horizontal"
	});
	
	var holderSection2 = Ti.UI.createView({
	left:"10%",
	right:"10%",
	width: "80%",
	height: Ti.UI.SIZE,
	top: "10",
	layout: "horizontal"
	});
	
	var holderSection3 = Ti.UI.createView({
	left:"10%",
	right:"10%",
	width: "80%",
	height: Ti.UI.SIZE,
	top: "10",
	layout: "horizontal"
	});
	
	var holderSection4 = Ti.UI.createView({
	left:"10%",
	right:"10%",
	width: "80%",
	height: Ti.UI.SIZE,
	top: "10",
	layout: "horizontal"
	});
	
	var holderSection5 = Ti.UI.createView({
	left:"10%",
	right:"10%",
	width: "80%",
	top: "30",
	bottom: "50",
	height:'35dp',
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	borderRadius: '10dp',
	borderColor: '#CBCAC9',
	backgroundColor: "white",

	});
	
	var holderSectionTaskLabel = Ti.UI.createLabel({
  	text: "Task:",
  	color: "black",
	font: {
		fontSize: fontsize,
		fontFamily: 'brown-regular',
	}
	});
	
	var holderSectionTaskContent = Ti.UI.createLabel({
  	text: PcObject.title,
  	className: 'task',
  	color: "black",
	font: {
		fontSize: fontsize,
		fontFamily: 'eveleth-regular',
	},
	left:"10dp"
	});
	
	var holderSectionTimeLabel = Ti.UI.createLabel({
  	text: "Time:",
  	color: "black",
	font: {
		fontSize: fontsize,
		fontFamily: 'brown-regular',
	}
	});
	
	var holderSectionTimeContent = Ti.UI.createLabel({
  	text: PcObject.startd + ' - ' + PcObject.endd,
  	className: 'time',
  	color: "black",
	font: {
		fontSize: fontsize,
		fontFamily: 'eveleth-regular',
	},
	left:"10dp"
	});
	
	var holderSectionDateLabel = Ti.UI.createLabel({
  	text: "Date:",
  	color: "black",
	font: {
		fontSize: fontsize,
		fontFamily: 'brown-regular',
	}
	});
	
	var holderSectionDateContent = Ti.UI.createLabel({
  	text: PcObject.tdate,
  	className: 'time',
  	color: "black",
	font: {
		fontSize: fontsize,
		fontFamily: 'eveleth-regular',
	},
	left:"10dp"
	});
	
	var holderSectionAreaLabel = Ti.UI.createLabel({
  	text: "Area:",
  	color: "black",
	font: {
		fontSize: fontsize,
		fontFamily: 'brown-regular',
	}
	});
	
	var holderSectionAreaContent = Ti.UI.createLabel({
  	text: PcObject.aname,
  	className: 'time',
  	color: "black",
	font: {
		fontSize: fontsize,
		fontFamily: 'eveleth-regular',
	},
	left:"10dp"
	});
	
var fbimage = Ti.UI.createImageView({
	id: PcObject.email,
	className: 'facebook',
	image:'/images/fb.png',
	height:'100%',
	left:'0dp'
});

var mailimage = Ti.UI.createImageView({
	id: PcObject.email,
	className: 'mail',
	image:'/images/mail.png',
	height:'100%',
	left:'0dp'
});

var label = Ti.UI.createLabel({
  	text: PcObject.lname,
  	className: 'manager',
	color: "black",
	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
	font: {
		fontSize: fontsize,
	}
});

var phoneimage = Ti.UI.createImageView({
	id: PcObject.phone,
	className: 'call',
	image:'/images/phone.png',
	height:'100%',
	right:'0dp'
});

var Headlabel = Ti.UI.createLabel({
  	text: "Your schedule",
	color: "black",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	font: {
		fontSize: fontsize,
	}
});
		 
	$.TASKcontainer.add(Headlabel);
	$.TASKcontainer.add(holder);
	holder.add(holderSection);
	holderSection.add(holderSectionTaskLabel);
	holderSection.add(holderSectionTaskContent);
	holder.add(holderSection2);
	holderSection2.add(holderSectionTimeLabel);
	holderSection2.add(holderSectionTimeContent);
	holder.add(holderSection3);
	holderSection3.add(holderSectionDateLabel);
	holderSection3.add(holderSectionDateContent);
	holder.add(holderSection4);
	holderSection4.add(holderSectionAreaLabel);
	holderSection4.add(holderSectionAreaContent);
	holder.add(holderSection5);
	holderSection5.add(mailimage);
	holderSection5.add(label);
	holderSection5.add(phoneimage);

	
	holder.addEventListener('click',function(e){
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
		    console.log("Something went wrong!");
		}
    });
}
