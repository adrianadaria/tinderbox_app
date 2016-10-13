

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

//



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
