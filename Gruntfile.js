module.exports = function(grunt) {
	grunt.initConfig({
		uglify: {
			game: {
				files: {
					"js/dist/game.min.js": [
						"js/game/game.static.js",
						"js/game/game.three.js",
						"js/game/game.cannon.js",
						"js/game/game.events.js",
						"js/game/game.helpers.js",
						"js/game/game.ui.js",
						"js/game/game.core.js",
						"js/game/init.js"
					]
				},
				options: {
					banner: "/*" + grunt.util.linefeed +
						" * THREE.BasicThirdPersonGame" + grunt.util.linefeed +
						" * https://github.com/matthias-schuetz/THREE-BasicThirdPersonGame" + grunt.util.linefeed +
						" *" + grunt.util.linefeed +
						" * Copyright (c) 2014 Matthias Schuetz" + grunt.util.linefeed +
						" * MIT License" + grunt.util.linefeed +
						" */" + grunt.util.linefeed,
					preserveComments: false
				}
			}
		},
		concat: {
			options: {
				separator: grunt.util.linefeed + grunt.util.linefeed + grunt.util.linefeed
			},
			dist: {
				src: [
					"js/libs/detector.min.js",
					"js/libs/three.min.js",
					"js/libs/cannon.min.js",
					"js/dist/game.min.js"
				],
				dest: "js/dist/game.js"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.registerTask("default", ["uglify:game", "concat"]);
};