window.game = window.game || {};

window.game.three = function() {
	var _three = {
		// Attributes
		domContainer: null,
		cameraSizeConstraint: null,
		camera: null,
		scene: null,
		renderer: null,
		animationFrameLoop: null,
		fov: 40,
		fogDepth: 0.0010,
		fogDepthDefault: 0.0010,
		fogDepthMaximum: 0.0016,
		playerLight: null,

		// Methods
		init: function(options) {
			_three.domContainer = options && options.domContainer || document.createElement("div");
			_three.cameraSizeConstraint = {
				width: options && options.cameraSizeConstraint && options.cameraSizeConstraint.width || 0,
				height: options && options.cameraSizeConstraint && options.cameraSizeConstraint.height || 0
			};

			if (!options || !options.domContainer) {
				document.body.appendChild(_three.domContainer);
			}

			_three.setup();

			_three.camera = new THREE.PerspectiveCamera(_three.fov, (window.innerWidth - _three.cameraSizeConstraint.width) / (window.innerHeight - _three.cameraSizeConstraint.height), 1, 15000);
			_three.camera.up.set(0, 0, 1);

			_three.renderer = new THREE.WebGLRenderer({ antialias: true });
			_three.renderer.setClearColor(window.game.static.colors.darkGreen, 1);

			_three.onWindowResize();
			window.addEventListener("resize", _three.onWindowResize, false);

			_three.domContainer.appendChild(_three.renderer.domElement);
		},
		destroy: function() {
			_three.fogDepth = _three.fogDepthDefault;
		},
		setup: function () {
			_three.scene = new THREE.Scene();
			_three.scene.fog = new THREE.FogExp2(window.game.static.colors.darkGreen, _three.fogDepth);

			_three.setupLights();
		},
		setupLights: function() {
			var ambientLight = new THREE.AmbientLight(window.game.static.colors.darkGreen);
			_three.scene.add(ambientLight);

			var hemiLight = new THREE.HemisphereLight(window.game.static.colors.midBrightGreen, window.game.static.colors.darkGreen, 3.2);
			hemiLight.position.set(0, 0, -100);
			_three.scene.add(hemiLight);

			_three.playerLight = new THREE.PointLight(window.game.static.colors.brightGreen, 1.4);
			_three.scene.add(_three.playerLight);
		},
		render: function() {
			_three.renderer.render(_three.scene, _three.camera);
		},
		onWindowResize: function() {
			_three.camera.aspect = (window.innerWidth - _three.cameraSizeConstraint.width) / (window.innerHeight - _three.cameraSizeConstraint.height);
			_three.camera.updateProjectionMatrix();
			_three.renderer.setSize((window.innerWidth - _three.cameraSizeConstraint.width), (window.innerHeight - _three.cameraSizeConstraint.height));
		},
		createModel: function(jsonData, scale, material) {
			var loader = new THREE.JSONLoader();
			var jsonModel = loader.parse(JSON.parse(JSON.stringify(jsonData)));
			var model = {};

			_three.createCannonGeometry(jsonModel.geometry, scale);

			model.mesh = new THREE.Mesh(jsonModel.geometry, material);
			model.halfExtents = _three.createCannonHalfExtents(jsonModel.geometry);

			return model;
		},
		createCannonGeometry: function(geometry, scale) {
			var translateX;
			var translateY;
			var translateZ;

			geometry.computeBoundingBox();

			translateX = -((geometry.boundingBox.size().x / 2) + geometry.boundingBox.min.x);
			translateY = -((geometry.boundingBox.size().y / 2) + geometry.boundingBox.min.y);
			translateZ = -((geometry.boundingBox.size().z / 2) + geometry.boundingBox.min.z);

			geometry.applyMatrix(new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2));
			geometry.applyMatrix(new THREE.Matrix4().makeTranslation(translateX, translateY, translateZ));
			geometry.applyMatrix(new THREE.Matrix4().makeScale(scale, scale, scale));
		},
		createCannonHalfExtents: function(geometry) {
			geometry.computeBoundingBox();

			return new CANNON.Vec3(
					(geometry.boundingBox.max.x - geometry.boundingBox.min.x) * 0.5,
					(geometry.boundingBox.max.y - geometry.boundingBox.min.y) * 0.5,
					(geometry.boundingBox.max.z - geometry.boundingBox.min.z) * 0.5
			);
		}
	};

	return _three;
};