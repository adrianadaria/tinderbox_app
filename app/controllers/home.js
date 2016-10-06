// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;
var homeWin = $.homeWin;
var scrView = $.scrView;

var pageColor = "#c99ed5";

var con = paggingControl();
//homeWin.add(con);

function paggingControl(){
	//var container = Titanium.UI.createView({
	//	height: '10%',
	//	width: Ti.UI.SIZE,
	//	backgroundColor: 'black'
	//});
	//var container = $.pagging;
	// Keep a global reference of the available pages
	var numberOfPages = scrView.getViews().length;
	
	var pages = []; // without this, the current page won't work on future references of the module
	
	// Go through each of the current pages available in the scrollableView
	/*for (var i = 0; i < numberOfPages; i++) {
		var page = Titanium.UI.createView({
			borderRadius: 4,
			width: '25%',
			height: Ti.UI.FILL,
			//left: 15 * i,
			backgroundColor: pageColor,
			opacity: 0.5
		});
		// Store a reference to this view
		pages.push(page);
		// Add it to the container
		container.add(page);
	}*/
	
	var page1 = $.p1;
	var page2 = $.p2;
	var page3 = $.p3;
	var page4 = $.p4;
	
	pages.push(page1, page2, page3, page4);
	//container.add(page1, page2, page3, page3);
	
	// Mark the initial selected page
	pages[scrView.getCurrentPage()].setOpacity(1);
	
	
	// Callbacks
	onScroll = function(event){
		// Go through each and reset it's opacity
		for (var i = 0; i < numberOfPages; i++) {
			pages[i].setOpacity(0.5);
		}
		// Bump the opacity of the new current page
		pages[event.currentPage].setOpacity(1);
		
	};
	
	onPostLayout = function(event) {
	// Go through each and reset it's opacity
	for(var i = 0; i < numberOfPages; i++) {
		pages[i].setOpacity(0.5);
	}
	// Bump the opacity of the new current page
	pages[scrView.currentPage].setOpacity(1);

};
	
	// Attach the scroll event to this scrollableView, so we know when to update things
	scrView.addEventListener("scroll", onScroll);
	
	// Reset page control to default page when scollableView refresh
	scrView.addEventListener("postlayout", onPostLayout);

	
	//return container;
};

//module.exports = PagingControl;

homeWin.addEventListener("close", function() {
	$.destroy();
});