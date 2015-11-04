if (!Detector.webgl) {
	Detector.addGetWebGLMessage();
	document.querySelector("#game-ui").className = "hidden";
} else {
	window.gameInstance = window.game.core();
	window.gameInstance.init({
		domContainer: document.querySelector("#game"),
		cameraSizeConstraint: {
			height: 110
		}
	});
}