
$.faqTable.addEventListener('click', selectRow);

function selectRow(e) {
 var rowQuestion = e.rowData.rowQuestion;
 var rowAnswer = e.rowData.rowAnswer;
 //alert(rowDescription);
 	var detailController = Alloy.createController("faq", {
		rowQuestion : rowQuestion,
		rowAnswer : rowAnswer
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
