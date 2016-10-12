// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.table.addEventListener('click', function(e){
	
	var inboxController = Alloy.createController(e.rowData.rowId).getView().open({modal:true});
	 
});