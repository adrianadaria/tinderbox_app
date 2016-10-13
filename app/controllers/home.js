var args = $.args;

now();

function now(){
	
	// Keep a global reference of the available pages
	var numberOfPages = $.messagesMenu.getViews().length;
	var numberOfPages2 = $.messageMenu2.getViews().length;
	
	var pages = []; // without this, the current page won't work on future references of the module
	var pages2 = [];
		// Store a reference to this view
	pages.push($.pView1, $.pView2, $.pView3);
	pages2.push($.p2View1, $.p2View2, $.p2View3, $.p2View4);
	
	// Mark the initial selected page
	pages[$.messagesMenu.getCurrentPage()].setOpacity(1);
	pages[$.messageMenu2.getCurrentPage()].setOpacity(1);
	
	// Callbacks
	onScroll = function(event){
		// Go through each and reset it's opacity
		for (var i = 0; i < numberOfPages; i++) {
			pages[i].setOpacity(0.5);
		}
	var m1 = $.messagesMenu.currentPage;
		pages[m1].setOpacity(1);
		
	};
	
	onScroll2 = function(event){
		// Go through each and reset it's opacity
		for (var i = 0; i < numberOfPages2; i++) {
			pages2[i].setOpacity(0.5);
		}
		var m2 = $.messageMenu2.currentPage;
		pages2[m2].setOpacity(1);
		
	};
	
	onPostLayout = function(event) {
	// Go through each and reset it's opacity
	for(var i = 0; i < numberOfPages; i++) {
		pages[i].setOpacity(0.5);
	}
	// Bump the opacity of the new current page
	pages[$.messagesMenu.currentPage].setOpacity(1);
	
};

	onPostLayout2 = function(event) {
	// Go through each and reset it's opacity
	for(var i = 0; i < numberOfPages2; i++) {
		pages2[i].setOpacity(0.5);
	}
	// Bump the opacity of the new current page
	pages2[$.messageMenu2.currentPage].setOpacity(1);
	
};
	
	// Attach the scroll event to this scrollableView, so we know when to update things
	$.messagesMenu.addEventListener("scroll", onScroll);
	$.messagesMenu.addEventListener("postlayout", onPostLayout);
	$.messageMenu2.addEventListener("scroll", onScroll2);
	$.messageMenu2.addEventListener("postlayout", onPostLayout2);
};







