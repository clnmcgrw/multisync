/*
 * grunt-multisync utils
 * https://github.com/jaetask/multisync
 *
 * Copyright (c) 2013 Jae Task
 * Licensed under the MIT license.
 */

var fs = require('fs');

'use strict';

module.exports = {

	jsonify: function(object) {
		return JSON.stringify(object,null,"   ");
	},

	expandDrivePaths: function(grunt, data) {

		for (var drive in data.drives) {
			data.drives[drive] = this.convertPathToCwd(data.drives[drive]);
		}
	},

	convertPathToCwd: function(path) {
		return path === "~" ? process.cwd() : path;
	},

	driveMounted: function(grunt, name, mountPoint) {
		if (this.folderExists(mountPoint) === false) {
			grunt.log.error(name+' not mounted: '+mountPoint);
			grunt.fail.warn("Drive not mounted.. Please check your system");
		}
	},

	folderExists: function(folder) {
		try {
			return fs.lstatSync(folder).isDirectory();
		}
		catch (e) {}
		return false
	}

};
