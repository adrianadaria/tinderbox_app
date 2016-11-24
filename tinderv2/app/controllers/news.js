// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var collection = Alloy.Collections.news;

collection.fetch({
	success: function() {
		_.each(collection.models, function(element, index, list){
			
			element.attributes.id = element.nid;	
			element.attributes.aut = element.attributes.author;
			element.attributes.tit = element.attributes.title;
			element.attributes.des = element.attributes.description;
			element.attributes.pic = element.attributes.picture;
			
		});
	},
	error : function() {
		Ti.API.error("this is not good");
	}
});

$.newsTable.addEventListener('click', selectRow);

function selectRow(e) {
 var rowId = e.rowData.rowId;
 var rowImg = e.rowData.rowImg;
 var rowIheading = e.rowData.rowIheading;
 var rowDescription = e.rowData.rowDescription;
 //alert(rowDescription);
 	var detailController = Alloy.createController("detail", {
		rowIheading : rowIheading,
		rowImg : rowImg,
		rowDescription : rowDescription
	});
	openAsModal(detailController.getView());
}

function openAsModal(_view) {
	if (OS_IOS) {
		var navWindow = Titanium.UI.iOS.createNavigationWindow({
			window : _view
		});

		_view.navWindow = navWindow;
		navWindow.open({
			modal : true
		});
	} else {
		_view.open({
			modal : true
		});
	}
}
