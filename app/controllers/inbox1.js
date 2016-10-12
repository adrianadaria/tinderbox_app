// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.closeBtn.addEventListener("click", function(){
	$.getView().close();
});

$.inbox1win.addEventListener("close",function(){
	$.destroy();
});