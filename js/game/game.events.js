window.game = window.game || {};

window.game.events = function() {
	var _events = {
		// Attributes
		keyboard: {
			// Attributes
			keyCodes: {
				32: "space",
				65: "a",
				68: "d",
				69: "e",
				83: "s",
				87: "w"
			},
			pressed: {
				// Pressed key states
			},

			// Methods
			onKeyDown: function(event) {
				_events.keyboard.pressed[_events.keyboard.keyCodes[event.keyCode]] = true;
				_events.onKeyDown();
			},
			onKeyUp: function(event) {
				_events.keyboard.pressed[_events.keyboard.keyCodes[event.keyCode]] = false;
			}
		},

		// Methods
		init: function() {
			document.addEventListener("keydown", _events.keyboard.onKeyDown, false);
			document.addEventListener("keyup", _events.keyboard.onKeyUp, false);
		},
		onKeyDown: function() {

		}
	};

	return _events;
};