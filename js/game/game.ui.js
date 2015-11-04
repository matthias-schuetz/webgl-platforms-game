window.game = window.game || {};

window.game.ui = function() {
	var _ui = {
		// Attributes
		elements: {
			height: null,
			airboosts: null,
			airboostsProgress: null,
			slowmotion: null,
			infoboxKeyboard: null,
			infoboxGameover: null,
			infoboxHelp: null,
			btnToggleSound: null,
			btnCloseInfoboxKeyboard: null,
			btnCloseInfoboxGameover: null,
			btnCloseInfoboxHelp: null,
			btnShowInfoboxHelp: null,
			btnShowInfoboxKeyboard: null,
			gameoverScore: null,
			gameoverHighestScore: null
		},

		// Methods
		init: function () {
			_ui.getElements();
			_ui.bindEvents();
		},
		destroy: function () {
			_ui.toggleElement("slowmotion", false);
		},
		getElements: function () {
			_ui.elements.height = document.querySelector("#game-ui-height");
			_ui.elements.airboosts = document.querySelector("#game-ui-airboosts");
			_ui.elements.airboostsProgress = document.querySelector("#game-ui-airboosts-progress");
			_ui.elements.slowmotion = document.querySelector("#game-ui-slowmotion");
			_ui.elements.infoboxKeyboard = document.querySelector("#game-ui-infobox-keyboard");
			_ui.elements.infoboxGameover = document.querySelector("#game-ui-infobox-gameover");
			_ui.elements.infoboxHelp = document.querySelector("#game-ui-infobox-help");
			_ui.elements.btnToggleSound = document.querySelector("#game-ui-btn-toggle-sound");
			_ui.elements.btnCloseInfoboxKeyboard = document.querySelector("#game-ui-btn-close-infobox-keyboard");
			_ui.elements.btnCloseInfoboxGameover = document.querySelector("#game-ui-btn-close-infobox-gameover");
			_ui.elements.btnCloseInfoboxHelp = document.querySelector("#game-ui-btn-close-infobox-help");
			_ui.elements.btnShowInfoboxHelp = document.querySelector("#game-ui-btn-show-help");
			_ui.elements.btnShowInfoboxKeyboard = document.querySelector("#game-ui-btn-show-keyboard");
			_ui.elements.gameoverScore = document.querySelector("#game-ui-gameover-score");
			_ui.elements.gameoverHighestScore = document.querySelector("#game-ui-gameover-highestscore");
		},
		bindEvents: function () {
			setTimeout(function () {
				_ui.addClass("infoboxKeyboard", "infobox-scale-height");
			}, 800);

			_ui.elements.infoboxHelp.setAttribute("data-classname", _ui.elements.infoboxHelp.className.replace(/\s\bhidden\b/gi, ""));
			_ui.elements.infoboxGameover.setAttribute("data-classname", _ui.elements.infoboxGameover.className.replace(/\s\bhidden\b/gi, ""));
			_ui.elements.infoboxKeyboard.setAttribute("data-classname", _ui.elements.infoboxKeyboard.className.replace(/\s\bno-height\b/gi, ""));

			_ui.elements.btnCloseInfoboxKeyboard.addEventListener("click", function (event) {
				_ui.fadeOutElement("infoboxKeyboard", event);
			});

			_ui.elements.btnCloseInfoboxGameover.addEventListener("click", function (event) {
				_ui.fadeOutElement("infoboxGameover", event);
			});

			_ui.elements.btnCloseInfoboxHelp.addEventListener("click", function (event) {
				_ui.fadeOutElement("infoboxHelp", event);
			});

			_ui.elements.btnShowInfoboxHelp.addEventListener("click", function (event) {
				if (!_ui.hasClass("infoboxHelp", "visible") && !_ui.hasClass("infoboxHelp", "infobox-scale-height") && !_ui.hasClass("infoboxHelp", "no-height") && !_ui.hasClass("infoboxHelp", "fade-out") && !_ui.hasClass("infoboxHelp", "fade-out-slow")) {
					_ui.removeClass("infoboxHelp", "hidden");
					_ui.addClass("infoboxHelp", "no-height");

					setTimeout(function () {
						_ui.addClass("infoboxHelp", "infobox-scale-height");
					}, 100);

					setTimeout(function () {
						_ui.addClass("btnShowInfoboxKeyboard", "fade-in");
						_ui.addClass("btnCloseInfoboxHelp", "fade-in");
					}, 200);
				}

				event.preventDefault();
			});

			_ui.elements.btnShowInfoboxKeyboard.addEventListener("click", function (event) {
				if (!_ui.hasClass("infoboxKeyboard", "visible") && !_ui.hasClass("infoboxKeyboard", "infobox-scale-height")) {
					_ui.addClass("infoboxKeyboard", "visible", true);
				}

				_ui.fadeOutElement("infoboxHelp", event);

				event.preventDefault();
			});

			_ui.bindVendorEvent("infoboxKeyboard", "transitionend webkitTransitionEnd oTransitionEnd", function (event) {
				if (event.propertyName === "height") {
					_ui.removeClass("infoboxKeyboard", "no-height");
					_ui.removeClass("infoboxKeyboard", "infobox-scale-height");
					_ui.addClass("infoboxKeyboard", "visible");
				}

				if (event.propertyName === "opacity") {
					_ui.addClass("infoboxKeyboard", "hidden", true);
				}
			});

			_ui.bindVendorEvent("infoboxHelp", "transitionend webkitTransitionEnd oTransitionEnd", function (event) {
				if (event.propertyName === "height") {
					_ui.removeClass("infoboxHelp", "no-height");
					_ui.removeClass("infoboxHelp", "infobox-scale-height");
					_ui.addClass("infoboxHelp", "visible", true);
				}

				if (event.propertyName === "opacity" && event.target.nodeName.toLowerCase() !== "a") {
					_ui.addClass("infoboxHelp", "hidden", true);

					_ui.removeClass("btnShowInfoboxKeyboard", "fade-in");
					_ui.removeClass("btnCloseInfoboxHelp", "fade-in");
				}
			});

			_ui.bindVendorEvent("infoboxGameover", "transitionend webkitTransitionEnd oTransitionEnd", function (event) {
				if (event.propertyName === "opacity") {
					_ui.addClass("infoboxGameover", "hidden", true);
				}
			});
		},
		bindVendorEvent: function (element, eventTypeList, callback) {
			var eventTypes = eventTypeList.split(" ");

			eventTypes.forEach(function (eventType) {
				_ui.elements[element].addEventListener(eventType, function (event) {
					callback(event);
				}, false);
			});
		},
		fadeOutElement: function (element, event) {
			if (!_ui.hasClass(element, "fade-out")) {
				_ui.addClass(element, "fade-out");
			}

			event.preventDefault();
		},
		setElementValue: function (element, value) {
			_ui.elements[element].innerHTML = value;
		},
		getElementAttribute: function (element, attribute) {
			return _ui.elements[element].getAttribute(attribute);
		},
		setElementAttribute: function (element, attribute, value) {
			_ui.elements[element].setAttribute(attribute, value);
		},
		toggleElement: function (element, visible) {
			_ui.elements[element].style.display = visible ? "block" : "none";
		},
		addClass: function (element, className, resetClassName) {
			if (resetClassName && _ui.elements[element].getAttribute("data-classname")) {
				_ui.elements[element].className = resetClassName && _ui.elements[element].getAttribute("data-classname");
			}

			_ui.elements[element].className = _ui.elements[element].className + " " + className;
		},
		removeClass: function (element, className) {
			var classNameRegEx = new RegExp("\\s\\b" + className + "\\b", "gi");
			_ui.elements[element].className = _ui.elements[element].className.replace(classNameRegEx, "");
		},
		hasClass: function (element, className) {
			return _ui.elements[element].className.match(className);
		}
	};

	return _ui;
};