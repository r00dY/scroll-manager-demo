var $ = require("jquery");

var ScrollManager = require("./ScrollManager");

$(document).ready(function() {

	$('.open-overlay').click(function(e) {
		e.preventDefault();
		$('.overlay').show();
		ScrollManager.lockScroll();
	})

	$('.hide-overlay').click(function(e) {
		e.preventDefault();
		$('.overlay').hide();
		ScrollManager.unlockScroll();
	})

	/* To make website work properly, all scroll events should be registered by ScrollManager.register method */
	ScrollManager.register(function() {
		console.log('ScrollManager scroll event: ', $(window).scrollTop());
	})

	/* Native scroll registering shouldn't be used! This is only for example */
	$(window).scroll(function() {
		console.log('native scroll event: ', $(window).scrollTop());
		ScrollManager.call();
	})

});
