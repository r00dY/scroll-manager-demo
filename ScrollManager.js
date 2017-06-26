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

	this.lockScroll = function() {
		if (bodyScrollLocked) { return; }
		bodyScrollLocked = true;

		this.block();

		var lockScrollPosition = $(window).scrollTop();
		$('.page-wrapper').addClass('blocked-scroll').scrollTop(lockScrollPosition);
	}

	this.unlockScroll = function() {
		if (!bodyScrollLocked) { return; }
		bodyScrollLocked = false;

		var scrollTop = $('.page-wrapper').scrollTop();
		$('.page-wrapper').removeClass('blocked-scroll');

		$(window).scrollTop(scrollTop);

		var _this = this;
		setTimeout(function() {
			_this.unblock();
		}, 0);
	}
}

module.exports = new ScrollEventsManager();