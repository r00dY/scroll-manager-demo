var $ = require("jquery");

var ScrollEventsManager = function() {

	var _scroll_events = [];
	var _scroll_events_blocked = false;

	this.register = function(fun) {
		_scroll_events.push(fun);
	}

	this.unregister = function(fun) {
		var index = _scroll_events.indexOf(fun);
		if (index > -1) {
			_scroll_events.splice(index, 1);
		}
	}

	this.block = function() {
		_scroll_events_blocked = true;
	}

	this.unblock = function() {
		_scroll_events_blocked = false;
	}

	this.call = function() {
		if (_scroll_events_blocked) { return; }

		for(var i = 0; i < _scroll_events.length; i++) {
			(_scroll_events[i])();
		}
	}

	var bodyScrollLocked = false;

	var heightBlock = $('<div class="__scroll-events-manager"></div>');
	heightBlock.css({
		position: "absolute",
		top: 0,
		left: 0,
		width: 1,
		"pointer-events": "none"
	});


	var heightBlockOnResize = function() {
		heightBlock.css('height', window.innerHeight);
	}

	/* Try with settings scroll to 1 / height - 1, when end of scrolling. This will always focus scroll on the component, never on body behind!!! */

	this.lockScroll = function() {
		if (bodyScrollLocked) { return; }
		bodyScrollLocked = true;

		/* Lock body scroll blocks all scroll events registered by register method! */
		this.block();

		$('body').append(heightBlock);
		heightBlockOnResize();
		$(window).resize(heightBlockOnResize);

		var lockScrollPosition = $(window).scrollTop();
		$('.page-wrapper').addClass('blocked-scroll').scrollTop(lockScrollPosition);
	}

	this.unlockScroll = function() {
		if (!bodyScrollLocked) { return; }
		bodyScrollLocked = false;

		var scrollTop = $('.page-wrapper').scrollTop();
		$('.page-wrapper').removeClass('blocked-scroll');
		$(window).scrollTop(scrollTop);

		$(window).off('resize', heightBlockOnResize);
		heightBlock.remove();

		var _this = this;
		setTimeout(function() {
			_this.unblock();
		}, 0);
	}
}

module.exports = new ScrollEventsManager();