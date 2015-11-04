window.game = window.game || {};

window.game.helpers = {
	polarToCartesian: function(vectorLength, vectorDirection) {
		return {
			x: vectorLength * Math.cos(vectorDirection),
			y: vectorLength * Math.sin(vectorDirection)
		};
	},
	radToDeg: function(radians) {
		return radians * (180 / Math.PI);
	},
	degToRad: function(degrees) {
		return degrees * Math.PI / 180;
	},
	random: function(min, max, round) {
		return round ? (Math.floor(Math.random() * (max + 1)) + min) : (Math.random() * max) + min;
	},
	plusMinus: function() {
		return Math.floor(Math.random() * 2) === 1 ? 1 : -1;
	},
	cloneObject: function(obj) {
		var copy;

		if (obj === null || typeof obj !== "object") {
			return obj;
		}

		if (obj instanceof Date) {
			copy = new Date();

			copy.setTime(obj.getTime());

			return copy;
		}

		if (obj instanceof Array) {
			copy = [];

			for (var i = 0, len = obj.length; i < len; i++) {
				copy[i] = window.game.helpers.cloneObject(obj[i]);
			}

			return copy;
		}

		if (obj instanceof Object) {
			copy = {};

			for (var attr in obj) {
				if (obj.hasOwnProperty(attr)) {
					copy[attr] = window.game.helpers.cloneObject(obj[attr]);
				}
			}

			return copy;
		}
	},
	createGradientGrid: function (size, step, innerColor, outerColor) {
		var grid = {};

		grid.create = function () {
			var geometry = new THREE.Geometry();
			var material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors, fog: false });

			var colorSteps = Math.ceil(size / step) + (size % step === 0 ? 1 : 0);
			var colorArray = window.game.helpers.generateColorBlendingSteps(innerColor, outerColor, colorSteps);
			var colorIndex = colorSteps - 1;
			var colorIndexTemp = colorIndex;
			var colorIndexIncrementor = -1;
			var brightColor;

			for (var i = -size; i <= size; i += step) {
				brightColor = colorArray[colorIndex];
				colorIndex += colorIndexIncrementor;
				colorIndexTemp--;

				if (colorIndex === 0 && colorIndexTemp === 0 && size % step !== 0 ) {
					colorIndexIncrementor = 0;
				} else if (colorIndex <= 0) {
					colorIndexIncrementor = 1;
				}

				geometry.vertices.push(
					new THREE.Vector3(-size, 0, i), new THREE.Vector3(0, 0, i),
					new THREE.Vector3(0, 0, i), new THREE.Vector3(size, 0, i),

					new THREE.Vector3(i, 0, -size), new THREE.Vector3(i, 0, 0),
					new THREE.Vector3(i, 0, 0), new THREE.Vector3(i, 0, size)
				);

				geometry.colors.push(
					new THREE.Color(outerColor), new THREE.Color(brightColor),
					new THREE.Color(brightColor), new THREE.Color(outerColor),

					new THREE.Color(outerColor), new THREE.Color(brightColor),
					new THREE.Color(brightColor), new THREE.Color(outerColor)
				);
			}

			THREE.Line.call(this, geometry, material, THREE.LinePieces);
		};

		grid.create.prototype = Object.create(THREE.Line.prototype);

		return new grid.create();
	},
	generateColorBlendingSteps: function(startColor, endColor, steps) {
		var colorHelpers = {
			hexToRgb: function(hex) {
				hex = hex.toString(16);

				while (hex.length < 6) {
					hex = "0" + hex;
				}

				return [
					parseInt(hex.substr(0, 2), 16),
					parseInt(hex.substr(2, 2), 16),
					parseInt(hex.substr(4, 2), 16)
				];
			},
			rgbToHex: function(color) {
				color[0] = (color[0] > 255) ? 255 : (color[0] < 0) ? 0 : color[0];
				color[1] = (color[1] > 255) ? 255 : (color[1] < 0) ? 0 : color[1];
				color[2] = (color[2] > 255) ? 255 : (color[2] < 0) ? 0 : color[2];

				return ("0" + color[0].toString(16)).slice(-2) + ("0" + color[1].toString(16)).slice(-2) + ("0" + color[2].toString(16)).slice(-2);
			},
			generateSteps: function(startColor, endColor, steps) {
				var r;
				var g;
				var b;
				var stepR;
				var stepG;
				var stepB;
				var colorStepsArray = [];

				startColor = colorHelpers.hexToRgb(startColor);
				endColor = colorHelpers.hexToRgb(endColor);
				steps -= 1;

				r = startColor[0];
				g = startColor[1];
				b = startColor[2];

				stepR = (Math.max(startColor[0], endColor[0]) - Math.min(startColor[0], endColor[0])) / steps;
				stepG = (Math.max(startColor[1], endColor[1]) - Math.min(startColor[1], endColor[1])) / steps;
				stepB = (Math.max(startColor[2], endColor[2]) - Math.min(startColor[2], endColor[2])) / steps;

				colorStepsArray.push(startColor);

				for (var i = 0; i < (steps - 1); i++) {
					r = r + (Math.round(stepR) * (startColor[0] < endColor[0] ? 1 : -1));
					g = g + (Math.round(stepG) * (startColor[1] < endColor[1] ? 1 : -1));
					b = b + (Math.round(stepB) * (startColor[2] < endColor[2] ? 1 : -1));

					colorStepsArray.push([r, g, b]);
				}

				colorStepsArray.push(endColor);

				colorStepsArray.forEach(function (rgbArray, idx) {
					colorStepsArray[idx] = "#" + colorHelpers.rgbToHex(rgbArray);
				});

				return colorStepsArray;
			}
		};

		return colorHelpers.generateSteps(startColor, endColor, steps);
	}
};